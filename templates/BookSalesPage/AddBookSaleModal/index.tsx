import { useState, useEffect } from "react";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Select from "@/components/Select";

type Props = {
    onClose: () => void;
};

const paymentOptions = [
    { id: 0, name: "Zelle" },
    { id: 1, name: "Cash" },
    { id: 2, name: "PayPal" },
];

const bookOptions = [
    { id: 1, name: "The Blessed Life", price: 20 },
    { id: 2, name: "Walking in Faith", price: 15 },
    { id: 3, name: "Ministry Leadership", price: 25 },
];

const AddBookSaleModal = ({ onClose }: Props) => {
    const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0]);
    const [selectedBook, setSelectedBook] = useState(bookOptions[0]);
    const [quantity, setQuantity] = useState(1);
    const [amount, setAmount] = useState(bookOptions[0].price);

    useEffect(() => {
        setAmount(selectedBook.price * quantity);
    }, [selectedBook, quantity]);

    return (
        <form className="p-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="mb-8 text-h4">Add Book Sale</div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 max-md:flex-col">
                    <Field
                        className="flex-1"
                        label="Buyer name"
                        placeholder="Enter full name"
                        required
                    />
                    <Field
                        className="flex-1"
                        label="Buyer email"
                        placeholder="Enter email address"
                        type="email"
                        required
                    />
                </div>
                <div className="flex gap-4 max-md:flex-col">
                    <Select
                        className="flex-2"
                        label="Book title"
                        value={selectedBook as any}
                        onChange={setSelectedBook as any}
                        options={bookOptions as any}
                        required
                    />
                    <Field
                        className="flex-1"
                        label="Quantity"
                        placeholder="1"
                        type="number"
                        value={quantity}
                        onChange={(e: any) => setQuantity(parseInt(e.target.value) || 0)}
                        required
                    />
                </div>
                <div className="flex gap-4 max-md:flex-col">
                    <Field
                        className="flex-1"
                        label="Total Amount ($)"
                        placeholder="0.00"
                        type="number"
                        value={amount}
                        onChange={(e: any) => setAmount(parseFloat(e.target.value) || 0)}
                        required
                    />
                    <Field
                        className="flex-1"
                        label="Date received"
                        type="date"
                        required
                    />
                </div>
                <div className="flex gap-4 max-md:flex-col">
                    <Select
                        className="flex-1"
                        label="Payment method"
                        value={paymentMethod}
                        onChange={(val: any) => setPaymentMethod(val)}
                        options={paymentOptions}
                        required
                    />
                    <Field
                        className="flex-1"
                        label={`${paymentMethod.name} reference / screenshot`}
                        placeholder="ID or link"
                    />
                </div>
                <Field
                    label="Notes"
                    placeholder="Additional context about this sale..."
                    textarea
                />
            </div>
            <div className="flex gap-3 mt-10">
                <Button className="flex-1" onClick={onClose} isSecondary isLarge>
                    Cancel
                </Button>
                <Button className="flex-1" type="submit" isPrimary isLarge>
                    Record Sale
                </Button>
            </div>
        </form>
    );
};

export default AddBookSaleModal;

