import { useState } from "react";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Item from "../Item";

const Profile = ({ }) => {
    const [fullName, setFullName] = useState("Robert Johnson");
    const [emailAddress, setEmailAddress] = useState("robert.johnson@example.com");

    return (
        <Item
            title="Name / Profile"
            description="Manage your identity settings in the ministry."
        >
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-6">
                    <div className="relative flex justify-center items-center shrink-0 size-24 bg-primary-100 rounded-full border-4 border-white shadow-sm overflow-hidden">
                        <Icon className="!size-12 fill-primary-500" name="user" />
                    </div>
                    <div>
                        <div className="mb-2 text-body-md font-semibold">Profile Picture</div>
                        <div className="flex gap-3">
                            <Button isSecondary isSmall>Upload New</Button>
                            <Button className="text-error-100 !bg-transparent !p-0 border-0 hover:underline" isSmall>Remove</Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Field
                        label="Full Name"
                        placeholder="e.g. Bishop John Doe"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <Field
                        label="Email"
                        placeholder="Enter email address"
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="pt-4 border-t border-gray-100">
                    <Button className="min-w-40" isPrimary isMedium>
                        Update Profile
                    </Button>
                </div>
            </div>
        </Item>
    );
};

export default Profile;
