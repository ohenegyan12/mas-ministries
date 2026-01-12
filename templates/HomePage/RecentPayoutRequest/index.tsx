import { useState } from "react";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";

import { tableContent } from "./content";

const RecentTransactions = ({ }) => {
    const [search, setSearch] = useState("");

    return (
        <Table
            className="mt-6"
            title="Recent Transactions"
            search={search}
            setSearch={(e) => setSearch(e.target.value)}
            cellsThead={[
                "Date",
                "Name",
                "Type",
                "Description",
                "Amount",
                "Method",
                "Source",
                "Status",
            ]}
        >
            {tableContent.map((item) => (
                <TableRow
                    key={item.id}
                >
                    <td className="whitespace-nowrap">{item.date}</td>
                    <td className="font-semibold">{item.name}</td>
                    <td>
                        <div
                            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold uppercase ${item.type === "Donation"
                                ? "bg-primary-50 text-primary-600"
                                : "bg-orange-50 text-orange-600"
                                }`}
                        >
                            {item.type}
                        </div>
                    </td>
                    <td>{item.description}</td>
                    <td className="font-bold">{item.amount}</td>
                    <td>{item.method}</td>
                    <td>
                        <div
                            className={`inline-flex items-center gap-1.5 ${item.source === "Auto"
                                ? "text-green-600"
                                : "text-gray-400"
                                }`}
                        >
                            <div className={`size-1.5 rounded-full ${item.source === "Auto" ? "bg-green-600" : "bg-gray-400"
                                }`} />
                            {item.source}
                        </div>
                    </td>
                    <td>
                        <div
                            className={`status ${item.status === "Pending"
                                ? "status-yellow"
                                : item.status === "Rejected"
                                    ? "status-red"
                                    : "status-green"
                                }`}
                        >
                            {item.status}
                        </div>
                    </td>
                </TableRow>
            ))}
        </Table>
    );
};

export default RecentTransactions;
