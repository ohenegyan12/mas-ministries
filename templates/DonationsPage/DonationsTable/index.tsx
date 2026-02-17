import { useState } from "react";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import Icon from "@/components/Icon";

type Props = {
    data: any[];
    isLoading: boolean;
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
    onViewDetails: (id: number | string) => void;
    error?: string | null;
};

const DonationsTable = ({ data, isLoading, currentPage, lastPage, onPageChange, onViewDetails, error }: Props) => {
    const [search, setSearch] = useState("");

    const filteredData = data.filter((item) =>
        item.donor_name.toLowerCase().includes(search.toLowerCase()) ||
        item.donor_email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative">
            <Table
                className="mt-6"
                title="All Donations"
                search={search}
                setSearch={(e: any) => setSearch(e.target.value)}
                cellsThead={[
                    "Date",
                    "Donor Name",
                    "Amount",
                    "Method",
                    "Purpose",
                    "Notes",
                    "Status",
                ]}
            >
                {isLoading ? (
                    <tr>
                        <td colSpan={7} className="py-20 text-center">
                            <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        </td>
                    </tr>
                ) : filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <TableRow
                            key={item.id}
                            className="cursor-pointer hover:bg-gray-25/50 transition-colors"
                            onClick={() => onViewDetails(item.id)}
                        >
                            <td className="whitespace-nowrap">
                                {new Date(item.created_at).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </td>
                            <td>
                                <div className="font-semibold text-gray-900">{item.donor_name}</div>
                                <div className="text-body-sm text-gray-500">{item.donor_email}</div>
                            </td>
                            <td className="font-bold text-gray-900">
                                ${parseFloat(item.amount).toLocaleString()}
                            </td>
                            <td>
                                <div className="flex items-center gap-2 capitalize">
                                    <Icon
                                        className="!size-4 fill-gray-400"
                                        name={item.payment_method.includes('card') ? 'card' : 'wallet'}
                                    />
                                    {item.payment_method.replace('_', ' ')}
                                </div>
                            </td>
                            <td>
                                <div className="inline-flex items-center gap-1.5 font-medium text-primary-600">
                                    <div className="size-1.5 rounded-full bg-primary-500" />
                                    {item.purpose?.name.replace('_', ' ') || "General"}
                                </div>
                            </td>
                            <td className="max-w-xs truncate text-gray-500">{item.notes || "-"}</td>
                            <td>
                                <div
                                    className={`status ${item.payment_status === "pending"
                                        ? "status-yellow"
                                        : item.payment_status === "failed" || item.payment_status === "rejected"
                                            ? "status-red"
                                            : "status-green"
                                        }`}
                                >
                                    {item.payment_status}
                                </div>
                            </td>
                        </TableRow>
                    ))
                ) : (
                    <tr>
                        <td colSpan={7} className="py-10 text-center text-gray-400">
                            {error ? error : "No donations found"}
                        </td>
                    </tr>
                )}
            </Table>

            {lastPage > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        className="px-4 py-2 border border-gray-100 rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        disabled={currentPage === 1 || isLoading}
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <div className="text-body-sm font-medium">
                        Page <span className="text-primary-600 font-bold">{currentPage}</span> of {lastPage}
                    </div>
                    <button
                        className="px-4 py-2 border border-gray-100 rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        disabled={currentPage === lastPage || isLoading}
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default DonationsTable;
