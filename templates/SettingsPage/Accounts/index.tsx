import { useState } from "react";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Item from "../Item";

const Accounts = ({ }) => {
    const [paypalEmail, setPaypalEmail] = useState("");
    const [zelleAccount, setZelleAccount] = useState("");

    return (
        <Item
            title="Accounts"
            description="Manage your linked financial accounts for receiving donations and sales."
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <Field
                        label="PayPal Email"
                        placeholder="Enter your PayPal email"
                        type="email"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                    />
                    <Field
                        label="Zelle Email / Phone"
                        placeholder="Enter Zelle email or phone number"
                        type="text"
                        value={zelleAccount}
                        onChange={(e) => setZelleAccount(e.target.value)}
                    />
                </div>
                <div className="pt-4 border-t border-gray-100">
                    <Button className="min-w-40" isPrimary isMedium>
                        Update Accounts
                    </Button>
                </div>
            </div>
        </Item>
    );
};

export default Accounts;
