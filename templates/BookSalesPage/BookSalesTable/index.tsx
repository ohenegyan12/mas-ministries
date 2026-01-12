import { useState } from "react";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import Icon from "@/components/Icon";

import { tableContent } from "./content";

const BookSalesTable = ({ }) => {
    const [search, setSearch] = useState("");

    return (
        <Table
            className="mt-6"
            title="Book Sales Records"
            search={search}
            setSearch={(e) => setSearch(e.target.value)}
            cellsThead={[
                "Date",
                "Buyer Name",
                "Email",
                "Book Title",
                "Qty",
                "Amount",
                "Method",
                "Reference",
                "Entered By",
            ]}
        >
            {tableContent.map((item) => (
                <TableRow key={item.id}>
                    <td className="whitespace-nowrap">{item.date}</td>
                    <td className="font-semibold">{item.buyerName}</td>
                    <td className="text-gray-500">{item.email}</td>
                    <td>
                        <div className="font-medium text-primary-600">{item.bookTitle}</div>
                    </td>
                    <td className="text-center">{item.quantity}</td>
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
                </TableRow>
            ))}
        </Table>
    );
};

export default BookSalesTable;
