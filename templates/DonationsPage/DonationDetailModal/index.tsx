
import { useState, useEffect } from "react";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Select from "@/components/Select";
import { useDonation } from "@/hooks/useDonation";
import { donationsApi } from "@/lib/api";
import { SelectOption } from "@/types/select";

type Props = {
    id: number | string;
    onClose: () => void;
    onUpdate?: () => void;
};

const statusOptions: SelectOption[] = [
    { id: "pending", name: "Pending" },
    { id: "completed", name: "Completed" },
    { id: "failed", name: "Failed" },
    { id: "rejected", name: "Rejected" },
];

const DonationDetailModal = ({ id, onClose, onUpdate }: Props) => {
    const { data: donation, isLoading, error, refresh } = useDonation(id);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [status, setStatus] = useState<SelectOption | undefined>(undefined);
    const [notes, setNotes] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    useEffect(() => {
        if (donation) {
            const currentStatus = statusOptions.find(opt => opt.id === donation.payment_status);
            setStatus(currentStatus);
            setNotes(donation.notes || "");
        }
    }, [donation]);

    const handleUpdate = async () => {
        if (!status) return;
        setIsUpdating(true);
        setUpdateError(null);
        try {
            await donationsApi.updateDonation(id, {
                payment_status: status.id as string,
                notes: notes,
            });
            setIsEditing(false);
            refresh && refresh();
            onUpdate && onUpdate();
        } catch (err: any) {
            setUpdateError(err.message || "Failed to update donation");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        setIsUpdating(true);
        setUpdateError(null);
        try {
            await donationsApi.deleteDonation(id);
            onUpdate && onUpdate();
            onClose();
        } catch (err: any) {
            setUpdateError(err.message || "Failed to delete donation");
            setIsUpdating(false);
            setIsDeleting(false);
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
                <div className="text-red-500 font-semibold mb-4">{error}</div>
                <button
                    onClick={onClose}
                    className="text-primary-600 font-bold"
                >
                    Close
                </button>
            </div>
        );
    }

    if (!donation) return null;

    return (
        <div className="p-8">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-h4 mb-1">Donation Details</h2>
                    <p className="text-gray-500 font-medium">Reference ID: #{donation.id}</p>
                </div>
                {!isEditing && !isDeleting && (
                    <div className={`status ${donation.payment_status === "pending"
                        ? "status-yellow"
                        : donation.payment_status === "failed" || donation.payment_status === "rejected"
                            ? "status-red"
                            : "status-green"
                        }`}>
                        {donation.payment_status}
                    </div>
                )}
            </div>

            {isDeleting ? (
                <div className="p-6 bg-red-50 rounded-2xl border border-red-100 mb-8">
                    <div className="flex items-center gap-3 text-red-600 font-bold mb-2">
                        <Icon className="!size-5 fill-red-600" name="info" />
                        Confirm Deletion
                    </div>
                    <p className="text-red-600 text-body-sm mb-6">
                        Are you sure you want to delete this donation from <strong>{donation.donor_name}</strong>? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsDeleting(false)}
                            className="h-11 px-6 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors"
                            disabled={isUpdating}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="h-11 px-6 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
                            disabled={isUpdating}
                        >
                            {isUpdating ? "Deleting..." : "Yes, Delete Donation"}
                        </button>
                    </div>
                    {updateError && <div className="mt-4 text-red-600 text-body-xs font-semibold">{updateError}</div>}
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-8 mb-8 max-md:grid-cols-1">
                    <div className="p-5 bg-gray-25 rounded-2xl">
                        <div className="text-gray-400 text-body-xs uppercase font-bold mb-3">Donor Information</div>
                        <div className="space-y-4">
                            <div>
                                <div className="text-body-sm text-gray-500">Full Name</div>
                                <div className="font-semibold text-gray-900">{donation.donor_name}</div>
                            </div>
                            <div>
                                <div className="text-body-sm text-gray-500">Email Address</div>
                                <div className="font-semibold text-gray-900">{donation.donor_email}</div>
                            </div>
                            <div>
                                <div className="text-body-sm text-gray-500">Phone Number</div>
                                <div className="font-semibold text-gray-900">{donation.donor_phone || "N/A"}</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 bg-gray-25 rounded-2xl">
                        <div className="text-gray-400 text-body-xs uppercase font-bold mb-3">Transaction Details</div>
                        <div className="space-y-4">
                            <div>
                                <div className="text-body-sm text-gray-500">Amount</div>
                                <div className="text-h4 text-primary-600 font-bold">${parseFloat(donation.amount).toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-body-sm text-gray-500">Payment Method</div>
                                <div className="font-semibold text-gray-900 capitalize">{donation.payment_method.replace('_', ' ')}</div>
                            </div>
                            <div>
                                <div className="text-body-sm text-gray-500">Purpose / Project</div>
                                <div className="font-semibold text-gray-900">{donation.purpose?.name.replace('_', ' ') || "General"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!isDeleting && (
                <div className="mb-8 space-y-6">
                    {isEditing ? (
                        <>
                            <Select
                                label="Payment Status"
                                value={status}
                                onChange={setStatus}
                                options={statusOptions}
                                required
                            />
                            <Field
                                label="Notes"
                                textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add or update notes..."
                            />
                            {updateError && <div className="text-error-100 text-body-sm">{updateError}</div>}
                        </>
                    ) : (
                        donation.notes && (
                            <div>
                                <div className="text-gray-400 text-body-xs uppercase font-bold mb-2">Notes</div>
                                <div className="p-4 border border-gray-100 rounded-xl text-gray-700 italic">
                                    "{donation.notes}"
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                {!isEditing && !isDeleting && (
                    <button
                        onClick={() => setIsDeleting(true)}
                        className="flex items-center gap-2 text-red-500 font-bold hover:text-red-600 transition-colors"
                    >
                        <Icon className="!size-4 fill-red-500" name="trash" />
                        Delete Donation
                    </button>
                )}
                <div className="flex gap-3 ml-auto">
                    {isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="h-12 px-8 border border-gray-100 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                                disabled={isUpdating}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="h-12 px-8 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50"
                                disabled={isUpdating}
                            >
                                {isUpdating ? "Saving..." : "Save Changes"}
                            </button>
                        </>
                    ) : !isDeleting && (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="h-12 px-8 border border-gray-100 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Edit
                            </button>
                            <button
                                onClick={onClose}
                                className="h-12 px-8 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
                            >
                                Close Details
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DonationDetailModal;
