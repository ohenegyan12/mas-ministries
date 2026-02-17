
"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import AddMasterModal from "./AddMasterModal";
import EditMasterModal from "./EditMasterModal";
import { useMasters } from "@/hooks/useMasters";
import { mastersApi } from "@/lib/api";

const AdminSettingsPage = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, error, refresh } = useMasters(page);
    const [search, setSearch] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedMasterId, setSelectedMasterId] = useState<number | string | null>(null);
    const [deletingMasterId, setDeletingMasterId] = useState<number | string | null>(null);

    const filteredData = data?.data?.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase())
    ) || [];

    return (
        <Layout title="Admin Settings">
            <Breadcrumbs items={["Home", "Admin Settings"]}>
                <Button
                    className="max-md:w-full"
                    icon="plus"
                    isPrimary
                    isMedium
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add Item
                </Button>
            </Breadcrumbs>

            <div className="mb-2 text-h4">⚙️ Admin Settings</div>
            <div className="mb-8 text-gray-500 font-medium">
                Manage payment methods, statuses, and other system configurations.
            </div>

            <Table
                title="Master Data"
                search={search}
                setSearch={(e: any) => setSearch(e.target.value)}
                cellsThead={[
                    "Type",
                    "Name",
                    "Description",
                    "Status",
                    "Created At",
                    "Actions",
                ]}
            >
                {isLoading ? (
                    <tr>
                        <td colSpan={6} className="py-20 text-center">
                            <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        </td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td colSpan={6} className="py-10 text-center text-red-500 flex flex-col items-center gap-2">
                            <Icon className="fill-red-500 !size-6" name="info" />
                            {error}
                        </td>
                    </tr>
                ) : filteredData.length > 0 ? (
                    filteredData.map((item: any) => (
                        <TableRow key={item.id}>
                            <td>
                                <div className="inline-flex px-2 py-0.5 rounded-full text-xs font-bold uppercase bg-gray-100 text-gray-600">
                                    {item.type.replace('_', ' ')}
                                </div>
                            </td>
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
                                        onClick={() => setSelectedMasterId(item.id)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                                        title="Edit"
                                    >
                                        <Icon className="!size-5 fill-gray-400 group-hover:fill-primary-500" name="edit" />
                                    </button>
                                    <button
                                        onClick={() => setDeletingMasterId(item.id)}
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
                        <td colSpan={6} className="py-10 text-center text-gray-400 font-medium">
                            No settings found.
                        </td>
                    </tr>
                )}
            </Table>

            {data?.last_page > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        className="px-4 py-2 border border-gray-100 rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        disabled={page === 1 || isLoading}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>
                    <div className="text-body-sm font-medium">
                        Page <span className="text-primary-600 font-bold">{page}</span> of {data.last_page}
                    </div>
                    <button
                        className="px-4 py-2 border border-gray-100 rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        disabled={page === data.last_page || isLoading}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}

            <Modal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                classWrapper="!max-w-160 !max-h-[85vh] overflow-y-auto scrollbar-none"
            >
                <AddMasterModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSuccess={() => refresh()}
                />
            </Modal>

            <Modal
                open={!!selectedMasterId}
                onClose={() => setSelectedMasterId(null)}
                classWrapper="!max-w-160 !max-h-[85vh] overflow-y-auto scrollbar-none"
            >
                {selectedMasterId && (
                    <EditMasterModal
                        id={selectedMasterId}
                        onClose={() => setSelectedMasterId(null)}
                        onSuccess={() => refresh()}
                    />
                )}
            </Modal>

            <Modal
                open={!!deletingMasterId}
                onClose={() => setDeletingMasterId(null)}
                classWrapper="!max-w-120 overflow-y-auto scrollbar-none"
            >
                <div className="p-8">
                    <div className="flex items-center gap-3 text-error-100 font-bold mb-4 text-h4">
                        <Icon className="fill-current !size-8" name="info" />
                        Delete Item
                    </div>
                    <p className="text-gray-500 font-medium mb-8">
                        Are you sure you want to delete this configuration item? This action cannot be undone.
                    </p>
                    <div className="flex gap-3 justify-end">
                        <Button
                            isMedium
                            onClick={() => setDeletingMasterId(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="!bg-error-100 !text-white"
                            isMedium
                            onClick={async () => {
                                if (deletingMasterId) {
                                    try {
                                        await mastersApi.deleteMaster(deletingMasterId);
                                        refresh();
                                        setDeletingMasterId(null);
                                    } catch (err: any) {
                                        alert(err.message || "Failed to delete item");
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

export default AdminSettingsPage;
