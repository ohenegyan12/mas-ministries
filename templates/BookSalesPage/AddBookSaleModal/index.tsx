import Field from "@/components/Field";
import Button from "@/components/Button";

type Props = {
    onClose: () => void;
};

const AddBookSaleModal = ({ onClose }: Props) => {
    return (
        <form className="p-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="mb-8 text-h4">Add Zelle Book Sale</div>
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
                    <Field
                        className="flex-2"
                        label="Book title"
                        placeholder="Select or enter book title"
                        required
                    />
                    <Field
                        className="flex-1"
                        label="Quantity"
                        placeholder="1"
                        type="number"
                        required
                    />
                </div>
                <div className="flex gap-4 max-md:flex-col">
                    <Field
                        className="flex-1"
                        label="Amount"
                        placeholder="0.00"
                        type="number"
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
                    <Field
                        className="flex-1"
                        label="Payment method"
                        value="Zelle"
                        disabled
                    />
                    <Field
                        className="flex-1"
                        label="Zelle reference / screenshot"
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
