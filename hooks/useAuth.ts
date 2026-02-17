
import { useState, useEffect } from "react";

export interface Admin {
    id: number;
    name: string;
    email: string;
    role: string;
}

export function useAuth() {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedAdmin = localStorage.getItem("admin");

        if (storedToken) setToken(storedToken);
        if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
    }, []);

    return { admin, token };
}
