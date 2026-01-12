"use client";

import { useState } from "react";
import Link from "next/link";
import Login from "@/components/Login";
import Field from "@/components/Field";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    return (
        <Login
            title="Welcome Back"
            description="Glad to see you again. Log in to your account."
            image="/images/icons/profile.svg"
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setAttemptedSubmit(true);
                    if (!email || !password) {
                        return;
                    }
                    window.location.href = "/dashboard";
                }}
                className="flex flex-col gap-4 max-md:gap-3"
            >
                <Field
                    label="Email Address"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    error={attemptedSubmit && !email}
                />
                <Field
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    error={attemptedSubmit && !password}
                />
                <div className="flex justify-between items-center">
                    <Checkbox
                        label="Keep me login"
                        checked={remember}
                        onChange={(value) => setRemember(value)}
                    />
                    <Link
                        className="text-body-md font-medium text-primary-400 transition-colors hover:text-primary-600"
                        href="/forgot-password"
                    >
                        Forgot Password?
                    </Link>
                </div>
                <Button
                    className="w-full mt-4 max-md:mt-2"
                    isPrimary
                    type="submit"
                >
                    Login
                </Button>
            </form>

        </Login>
    );
};

export default SignInPage;
