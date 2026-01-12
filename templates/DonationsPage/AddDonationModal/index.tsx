import Field from "@/components/Field";
import Button from "@/components/Button";

type Props = {
    onClose: () => void;
};

const AddDonationModal = ({ onClose }: Props) => {
    return (
        <form className="p-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="mb-8 text-h4">Add Zelle Donation</div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 max-md:flex-col">
                    <Field
                        className="flex-1"
                        label="Donor name"
                        placeholder="Enter full name"
                        required
                    />
                    <Field
                        className="flex-1"
                        label="Donor email"
                        placeholder="Enter email address"
                        type="email"
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
                        label="Currency"
                        value="USD"
                        disabled
                    />
                </div>
                <div className="flex gap-4 max-md:flex-col">
                    <Field
                        className="flex-1"
                        label="Date received"
                        type="date"
                        required
                    />
                    <Field
                        className="flex-1"
                        label="Payment method"
                        value="Zelle"
                        disabled
                    />
                </div>
                <Field
                    label="Zelle reference / screenshot link"
                    placeholder="Enter Zelle ID or link to screenshot"
                />
                <Field
                    label="Notes"
                    placeholder="Add any additional context..."
                    textarea
                />
            </div>
            <div className="flex gap-3 mt-10">
                <Button className="flex-1" onClick={onClose} isSecondary isLarge>
                    Cancel
                </Button>
                <Button className="flex-1" type="submit" isPrimary isLarge>
                    Save Donation
                </Button>
            </div>
        </form>
    );
};

export default AddDonationModal;
