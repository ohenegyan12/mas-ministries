import { useState } from "react";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";

type Props = {
    transactions: any[];
};

const RecentTransactions = ({ transactions }: Props) => {
    const [search, setSearch] = useState("");

    const filteredTransactions = transactions.filter((item) =>
        item.donor_name.toLowerCase().includes(search.toLowerCase()) ||
        item.donor_email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Table
            className="mt-6"
            title="Recent Transactions"
            search={search}
            setSearch={(e: any) => setSearch(e.target.value)}
            cellsThead={[
                "Date",
                "Name",
                "Type",
                "Description",
                "Amount",
                "Method",
                "Project",
                "Status",
            ]}
        >
            {filteredTransactions.length > 0 ? (
                filteredTransactions.map((item) => (
                    <TableRow key={item.id}>
                        <td className="whitespace-nowrap">
                            {new Date(item.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </td>
                        <td className="font-semibold">{item.donor_name}</td>
                        <td>
                            <div className="inline-flex px-2 py-0.5 rounded-full text-xs font-bold uppercase bg-primary-50 text-primary-600">
                                Donation
                            </div>
                        </td>
                        <td className="max-w-xs truncate">{item.notes || "No notes"}</td>
                        <td className="font-bold">${parseFloat(item.amount).toLocaleString()}</td>
                        <td className="capitalize">{item.payment_method.replace("_", " ")}</td>
                        <td>
                            <div className="inline-flex items-center gap-1.5 text-gray-900 font-medium">
                                <div className="size-1.5 rounded-full bg-primary-500" />
                                {item.purpose?.name || "General"}
                            </div>
                        </td>
                        <td>
                            <div
                                className={`status ${item.payment_status === "pending"
                                    ? "status-yellow"
                                    : item.payment_status === "failed"
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
                    <td colSpan={8} className="py-10 text-center text-gray-400">
                        No transactions found
                    </td>
                </tr>
            )}
        </Table>
    );
};

export default RecentTransactions;
