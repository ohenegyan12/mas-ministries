import { useState } from "react";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Item from "../Item";

const Password = ({ }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <Item
            title="Password Change"
            description="Keep your account secure by using a strong password."
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <Field
                        label="Current Password"
                        placeholder="Enter current password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                    <Field
                        label="New Password"
                        placeholder="Enter new password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <Field
                        label="Confirm New Password"
                        placeholder="Confirm your new password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="pt-4 border-t border-gray-100">
                    <Button className="min-w-40" isPrimary isMedium>
                        Change Password
                    </Button>
                </div>
            </div>
        </Item>
    );
};

export default Password;
