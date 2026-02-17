
import { useState, useEffect } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useMaster } from "@/hooks/useMaster";
import { mastersApi } from "@/lib/api";
import { SelectOption } from "@/types/select";

type Props = {
    id: number | string;
    onClose: () => void;
    onSuccess: () => void;
};

const typeOptions: SelectOption[] = [
    { id: "payment_method", name: "Payment Method" },
    { id: "payment_status", name: "Payment Status" },
    { id: "purpose", name: "Purpose / Project" },
];

const EditMasterModal = ({ id, onClose, onSuccess }: Props) => {
    const { data: master, isLoading, error, refresh } = useMaster(id);
    const [type, setType] = useState<SelectOption>(typeOptions[0]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (master) {
            const currentType = typeOptions.find(opt => opt.id === master.type) || typeOptions[0];
            setType(currentType);
            setName(master.name);
            setDescription(master.description || "");
            setIsActive(master.is_active);
        }
    }, [master]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setActionError(null);

        try {
            await mastersApi.updateMaster(id, {
                type: type.id as string,
                name: name,
                description: description,
                is_active: isActive,
            });
            onSuccess();
            onClose();
        } catch (err: any) {
            setActionError(err.message || "Failed to update master item");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        setActionError(null);
        try {
            await mastersApi.deleteMaster(id);
            onSuccess();
            onClose();
        } catch (err: any) {
            setActionError(err.message || "Failed to delete master item");
            setIsDeleting(false);
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10 text-center">
                <div className="text-error-100 font-semibold mb-4">{error}</div>
                <Button isMedium onClick={onClose}>Close</Button>
            </div>
        );
    }

    if (!master) return null;

    return (
        <div className="p-8">
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h3 className="text-h4 mb-1">Edit Master Item</h3>
                    <p className="text-gray-500 font-medium font-body-sm">Modify existing system configuration.</p>
                </div>
                {!isDeleting && (
                    <button
                        onClick={() => setIsDeleting(true)}
                        className="p-2 text-gray-400 hover:text-error-100 transition-colors"
                        title="Delete Item"
                    >
                        <Icon className="fill-current" name="trash" />
                    </button>
                )}
            </div>

            {isDeleting ? (
                <div className="p-6 bg-error-0 border border-error-100 rounded-2xl mb-8">
                    <div className="flex items-center gap-3 text-error-100 font-bold mb-2">
                        <Icon className="fill-current !size-5" name="info" />
                        Confirm Deletion
                    </div>
                    <p className="text-error-100 text-body-sm mb-6 font-medium">
                        Are you sure you want to delete <strong>{master.name}</strong>? This will remove this configuration item from the system.
                    </p>
                    <div className="flex gap-3">
                        <Button
                            className="bg-white !text-error-100 border-error-100"
                            isMedium
                            onClick={() => setIsDeleting(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="!bg-error-100 !text-white"
                            isMedium
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            {loading ? "Deleting..." : "Yes, Delete Item"}
                        </Button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleUpdate}>
                    <div className="space-y-6">
                        <Select
                            label="Item Type"
                            value={type}
                            onChange={setType}
                            options={typeOptions}
                            required
                        />

                        <Field
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter item name"
                            required
                        />

                        <Field
                            label="Description"
                            textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Provide a brief description..."
                        />

                        <Checkbox
                            label="Active Status"
                            checked={isActive}
                            onChange={setIsActive}
                            isLarge
                        />

                        {actionError && (
                            <div className="p-4 bg-error-0 border border-error-100 rounded-xl text-error-100 text-body-sm font-medium">
                                {actionError}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-gray-100">
                        <Button
                            type="button"
                            className="!px-8"
                            isMedium
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="!px-8"
                            isPrimary
                            isMedium
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditMasterModal;
