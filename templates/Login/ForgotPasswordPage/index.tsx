"use client";

import { useState } from "react";
import Login from "@/components/Login";
import Field from "@/components/Field";
import Button from "@/components/Button";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");

    return (
        <Login
            title="Forgot Password"
            description="Enter your email address and we’ll send you password reset instructions."
            image="/images/icons/lock.svg"
        >
            <Field
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Button
                className="w-full mt-5"
                isPrimary
                as="link"
                href="/create-new-password"
            >
                Forgot Password
            </Button>

        </Login>
    );
};

export default ForgotPasswordPage;
