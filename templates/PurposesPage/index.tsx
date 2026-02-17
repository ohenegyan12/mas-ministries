
"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { usePurposes } from "@/hooks/usePurposes";
import { purposesApi } from "@/lib/api";

const PurposesPage = () => {
    const { data, isLoading, error, refresh } = usePurposes();
    const [search, setSearch] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedPurpose, setSelectedPurpose] = useState<any>(null);
    const [deletingId, setDeletingId] = useState<number | string | null>(null);

    const items = Array.isArray(data) ? data : (data as any)?.data || [];

    const filteredData = items.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout title="Purposes">
            <Breadcrumbs items={["Home", "Purposes"]}>
                <Button
                    className="max-md:w-full"
                    icon="plus"
                    isPrimary
                    isMedium
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add Purpose
                </Button>
            </Breadcrumbs>

            <div className="mb-2 text-h4">🎯 Purposes</div>
            <div className="mb-8 text-gray-500 font-medium">
                Manage projects and causes that donors can contribute to.
            </div>

            <Table
                title="Purposes List"
                search={search}
                setSearch={(e: any) => setSearch(e.target.value)}
                cellsThead={[
                    "Name",
                    "Description",
                    "Status",
                    "Created At",
                    "Actions",
                ]}
            >
                {isLoading ? (
                    <tr>
                        <td colSpan={5} className="py-20 text-center">
                            <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        </td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td colSpan={5} className="py-10 text-center text-red-500">
                            <div className="flex flex-col items-center gap-2">
                                <Icon className="fill-red-500 !size-6" name="info" />
                                {error}
                            </div>
                        </td>
                    </tr>
                ) : filteredData.length > 0 ? (
                    filteredData.map((item: any) => (
                        <TableRow key={item.id}>
                            <td className="font-semibold text-gray-900 capitalize">
                                {item.name.replace('_', ' ')}
                            </td>
                            <td className="max-w-xs truncate text-gray-500">
                                {item.description}
                            </td>
                            <td>
                                <div className={`status ${item.is_active ? "status-green" : "status-red"}`}>
                                    {item.is_active ? "Active" : "Inactive"}
                                </div>
                            </td>
                            <td className="text-gray-400">
                                {new Date(item.created_at).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </td>
                            <td>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setSelectedPurpose(item)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                                        title="Edit"
                                    >
                                        <Icon className="!size-5 fill-gray-400 group-hover:fill-primary-500" name="edit" />
                                    </button>
                                    <button
                                        onClick={() => setDeletingId(item.id)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                                        title="Delete"
                                    >
                                        <Icon className="!size-5 fill-gray-400 group-hover:fill-error-100" name="trash" />
                                    </button>
                                </div>
                            </td>
                        </TableRow>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="py-10 text-center text-gray-400 font-medium">
                            No purposes found.
                        </td>
                    </tr>
                )}
            </Table>

            {/* Add Purpose Modal */}
            <Modal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                classWrapper="!max-w-160"
            >
                <PurposeForm
                    onClose={() => setIsAddModalOpen(false)}
                    onSuccess={() => {
                        refresh();
                        setIsAddModalOpen(false);
                    }}
                />
            </Modal>

            {/* Edit Purpose Modal */}
            <Modal
                open={!!selectedPurpose}
                onClose={() => setSelectedPurpose(null)}
                classWrapper="!max-w-160"
            >
                {selectedPurpose && (
                    <PurposeForm
                        purpose={selectedPurpose}
                        onClose={() => setSelectedPurpose(null)}
                        onSuccess={() => {
                            refresh();
                            setSelectedPurpose(null);
                        }}
                    />
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                open={!!deletingId}
                onClose={() => setDeletingId(null)}
                classWrapper="!max-w-120"
            >
                <div className="p-8">
                    <div className="flex items-center gap-3 text-error-100 font-bold mb-4 text-h4">
                        <Icon className="fill-current !size-8" name="info" />
                        Delete Purpose
                    </div>
                    <p className="text-gray-500 font-medium mb-8">
                        Are you sure you want to delete this purpose? This action cannot be undone.
                    </p>
                    <div className="flex gap-3 justify-end">
                        <Button isMedium onClick={() => setDeletingId(null)}>Cancel</Button>
                        <Button
                            className="!bg-error-100 !text-white"
                            isMedium
                            onClick={async () => {
                                if (deletingId) {
                                    try {
                                        await purposesApi.deletePurpose(deletingId);
                                        refresh();
                                        setDeletingId(null);
                                    } catch (err: any) {
                                        alert(err.message || "Failed to delete purpose");
                                    }
                                }
                            }}
                        >
                            Yes, Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
};

import Field from "@/components/Field";
import Checkbox from "@/components/Checkbox";

const PurposeForm = ({ purpose, onClose, onSuccess }: { purpose?: any; onClose: () => void; onSuccess: () => void }) => {
    const [name, setName] = useState(purpose?.name || "");
    const [description, setDescription] = useState(purpose?.description || "");
    const [isActive, setIsActive] = useState(purpose ? purpose.is_active : true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const data = { name, description, is_active: isActive };
            if (purpose) {
                await purposesApi.updatePurpose(purpose.id, data);
            } else {
                await purposesApi.createPurpose(data);
            }
            onSuccess();
        } catch (err: any) {
            setError(err.message || "Failed to save purpose");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="p-8" onSubmit={handleSubmit}>
            <div className="mb-8">
                <h3 className="text-h4 mb-1">{purpose ? "Edit Purpose" : "Add Purpose"}</h3>
                <p className="text-gray-500 font-medium font-body-sm">
                    {purpose ? "Update existing purpose details." : "Create a new purpose for donations."}
                </p>
            </div>
            <div className="space-y-6">
                <Field
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ghana Project"
                    required
                />
                <Field
                    label="Description"
                    textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is this purpose about?"
                />
                <Checkbox
                    label="Active Status"
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
                <Button type="button" isMedium onClick={onClose}>Cancel</Button>
                <Button type="submit" isPrimary isMedium disabled={loading}>
                    {loading ? "Saving..." : "Save Purpose"}
                </Button>
            </div>
        </form>
    );
};

export default PurposesPage;
