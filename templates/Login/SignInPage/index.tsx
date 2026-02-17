"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Login from "@/components/Login";
import Field from "@/components/Field";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";
import { authApi } from "@/lib/api";

const SignInPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAttemptedSubmit(true);
        setError(null);

        if (!email || !password) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await authApi.login({ email, password });

            // Store the token and admin info
            localStorage.setItem("token", response.token);
            localStorage.setItem("admin", JSON.stringify(response.admin));

            // Redirect to dashboard
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Login
            title="Welcome Back"
            description="Glad to see you again. Log in to your account."
            image="/images/icons/profile.svg"
        >
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 max-md:gap-3"
            >
                {error && (
                    <div className="p-3 text-body-sm text-red-500 bg-red-50 border border-red-100 rounded-lg">
                        {error}
                    </div>
                )}
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
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </Button>
            </form>

        </Login>
    );
};

export default SignInPage;
