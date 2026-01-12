import { useState } from "react";
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

const purposeOptions = [
    { id: 0, name: "General Fund" },
    { id: 1, name: "Tithes & Offerings" },
    { id: 2, name: "Missions" },
    { id: 3, name: "Building Fund" },
    { id: 4, name: "Youth Ministry" },
    { id: 5, name: "Outreach & Community" },
    { id: 6, name: "Benevolence" },
];

const AddDonationModal = ({ onClose }: Props) => {
    const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0]);
    const [purpose, setPurpose] = useState(purposeOptions[0]);

    return (
        <form className="p-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="mb-8 text-h4">Add Donation</div>
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
                    <Select
                        className="flex-1"
                        label="Payment method"
                        value={paymentMethod}
                        onChange={(val: any) => setPaymentMethod(val)}
                        options={paymentOptions}
                        required
                    />
                </div>
                <Select
                    label="Purpose"
                    value={purpose}
                    onChange={(val: any) => setPurpose(val)}
                    options={purposeOptions}
                    required
                />
                <Field
                    label={`${paymentMethod.name} reference / screenshot link`}
                    placeholder={`Enter ${paymentMethod.name} ID or link to screenshot`}
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

