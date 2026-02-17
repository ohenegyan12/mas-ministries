
import { useState, useEffect } from "react";
import { purposesApi } from "@/lib/api";

export function usePurposes() {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPurposes = async () => {
        setIsLoading(true);
        try {
            const result = await purposesApi.getPurposes();
            setData(result || []);
        } catch (err: any) {
            setError(err.message || "Failed to fetch purposes");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPurposes();
    }, []);

    return { data, isLoading, error, refresh: fetchPurposes };
}
