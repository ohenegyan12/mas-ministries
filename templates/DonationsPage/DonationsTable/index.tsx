import { useState } from "react";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import Icon from "@/components/Icon";

import { tableContent } from "./content";

const DonationsTable = ({ }) => {
    const [search, setSearch] = useState("");

    return (
        <Table
            className="mt-6"
            title="All Donations"
            search={search}
            setSearch={(e) => setSearch(e.target.value)}
            cellsThead={[
                "Date",
                "Donor Name",
                "Email",
                "Amount",
                "Method",
                "Reference",
                "Entered By",
                "Status",
            ]}
        >
            {tableContent.map((item) => (
                <TableRow key={item.id}>
                    <td className="whitespace-nowrap">{item.date}</td>
                    <td className="font-semibold">{item.donorName}</td>
                    <td className="text-gray-500">{item.email}</td>
                    <td className="font-bold text-gray-900">{item.amount}</td>
                    <td>
                        <div className="flex items-center gap-2">
                            <Icon
                                className={`!size-4 ${item.method === 'PayPal' ? 'fill-blue-500' : 'fill-purple-500'}`}
                                name={item.method === 'PayPal' ? 'wallet' : 'bank'}
                            />
                            {item.method}
                        </div>
                    </td>
                    <td className="text-gray-400 font-mono text-xs">{item.reference}</td>
                    <td>
                        <div className={`inline-flex items-center gap-1.5 ${item.enteredBy === 'System' ? 'text-blue-600' : 'text-orange-600'}`}>
                            <div className={`size-1.5 rounded-full ${item.enteredBy === 'System' ? 'bg-blue-600' : 'bg-orange-600'}`} />
                            {item.enteredBy}
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

export default DonationsTable;
