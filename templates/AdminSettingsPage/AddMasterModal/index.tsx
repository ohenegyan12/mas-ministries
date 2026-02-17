
import { useState } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";
import { mastersApi } from "@/lib/api";
import { SelectOption } from "@/types/select";

type Props = {
    onClose: () => void;
    onSuccess: () => void;
};

const typeOptions: SelectOption[] = [
    { id: "payment_method", name: "Payment Method" },
    { id: "payment_status", name: "Payment Status" },
    { id: "purpose", name: "Purpose / Project" },
];

const AddMasterModal = ({ onClose, onSuccess }: Props) => {
    const [type, setType] = useState<SelectOption>(typeOptions[0]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await mastersApi.createMaster({
                type: type.id as string,
                name: name,
                description: description,
                is_active: isActive,
            });
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || "Failed to create master item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="p-8" onSubmit={handleSubmit}>
            <div className="mb-8">
                <h3 className="text-h4 mb-1">Add Master Item</h3>
                <p className="text-gray-500 font-medium font-body-sm">Create a new system configuration item.</p>
            </div>

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
                    placeholder="Enter item name (e.g. Zelle, Active, Global Project)"
                    required
                />

                <Field
                    label="Description"
                    textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a brief description of what this item represents..."
                />

                <Checkbox
                    label="Mark as Active"
                    checked={isActive}
                    onChange={setIsActive}
                    isLarge
                />

                {error && (
                    <div className="p-4 bg-error-0 border border-error-100 rounded-xl text-error-100 text-body-sm font-medium">
                        {error}
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
                    {loading ? "Creating..." : "Create Item"}
                </Button>
            </div>
        </form>
    );
};

export default AddMasterModal;
