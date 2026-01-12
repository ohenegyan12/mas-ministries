import { useState } from "react";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Item from "../Item";

const MinistryConfig = () => {
    const [paymentMethods, setPaymentMethods] = useState(["Zelle", "Cash", "PayPal"]);
    const [purposes, setPurposes] = useState([
        "General Fund",
        "Tithes & Offerings",
        "Missions",
        "Building Fund",
        "Youth Ministry",
        "Outreach & Community",
        "Benevolence",
    ]);
    const [books, setBooks] = useState([
        { id: 1, name: "The Blessed Life", price: 20 },
        { id: 2, name: "Walking in Faith", price: 15 },
    ]);

    const [newPaymentMethod, setNewPaymentMethod] = useState("");
    const [newPurpose, setNewPurpose] = useState("");
    const [newBookName, setNewBookName] = useState("");
    const [newBookPrice, setNewBookPrice] = useState("");

    const addPaymentMethod = () => {
        if (newPaymentMethod && !paymentMethods.includes(newPaymentMethod)) {
            setPaymentMethods([...paymentMethods, newPaymentMethod]);
            setNewPaymentMethod("");
        }
    };

    const addPurpose = () => {
        if (newPurpose && !purposes.includes(newPurpose)) {
            setPurposes([...purposes, newPurpose]);
            setNewPurpose("");
        }
    };

    const addBook = () => {
        if (newBookName && newBookPrice) {
            setBooks([...books, { id: Date.now(), name: newBookName, price: parseFloat(newBookPrice) }]);
            setNewBookName("");
            setNewBookPrice("");
        }
    };

    const removeItem = (list: string[], setList: (list: string[]) => void, item: string) => {
        setList(list.filter((i) => i !== item));
    };

    const removeBook = (id: number) => {
        setBooks(books.filter((b) => b.id !== id));
    };

    return (
        <>
            <Item
                title="Payment Methods"
                description="Manage acceptable payment methods for donations and book sales."
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                        {paymentMethods.map((method) => (
                            <div key={method} className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-body-sm font-medium">
                                {method}
                                <button onClick={() => removeItem(paymentMethods, setPaymentMethods, method)} className="text-gray-400 hover:text-error-100 transition-colors">
                                    <Icon name="close" className="!size-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Field
                            className="flex-1"
                            placeholder="Add new method (e.g. Stripe)"
                            value={newPaymentMethod}
                            onChange={(e: any) => setNewPaymentMethod(e.target.value)}
                        />
                        <Button isSecondary onClick={addPaymentMethod}>Add</Button>
                    </div>
                </div>
            </Item>

            <Item
                title="Donation Purposes"
                description="Define the various projects and funds donors can contribute to."
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                        {purposes.map((purpose) => (
                            <div key={purpose} className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-body-sm font-medium">
                                {purpose}
                                <button onClick={() => removeItem(purposes, setPurposes, purpose)} className="text-gray-400 hover:text-error-100 transition-colors">
                                    <Icon name="close" className="!size-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Field
                            className="flex-1"
                            placeholder="Add new purpose (e.g. Scholarship)"
                            value={newPurpose}
                            onChange={(e: any) => setNewPurpose(e.target.value)}
                        />
                        <Button isSecondary onClick={addPurpose}>Add</Button>
                    </div>
                </div>
            </Item>

            <Item
                title="Books & Inventory"
                description="Manage ministry books and their respective prices."
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        {books.map((book) => (
                            <div key={book.id} className="flex justify-between items-center p-3 bg-gray-50 border border-gray-100 rounded-xl">
                                <div>
                                    <div className="font-semibold">{book.name}</div>
                                    <div className="text-gray-500 text-body-sm px-2 py-0.5 bg-white border border-gray-100 rounded-lg inline-block mt-1">${book.price.toFixed(2)}</div>
                                </div>
                                <button onClick={() => removeBook(book.id)} className="text-gray-400 hover:text-error-100 transition-colors">
                                    <Icon name="close" className="!size-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border border-dashed border-gray-200 rounded-xl bg-gray-25/50">
                        <div className="mb-4 font-semibold">Add New Book</div>
                        <div className="flex flex-col gap-3">
                            <Field
                                label="Book Title"
                                placeholder="Enter title"
                                value={newBookName}
                                onChange={(e: any) => setNewBookName(e.target.value)}
                            />
                            <Field
                                label="Price ($)"
                                placeholder="0.00"
                                type="number"
                                value={newBookPrice}
                                onChange={(e: any) => setNewBookPrice(e.target.value)}
                            />
                            <Button className="w-full" isPrimary isSmall onClick={addBook}>Add Book</Button>
                        </div>
                    </div>
                </div>
            </Item>
        </>
    );
};

export default MinistryConfig;
