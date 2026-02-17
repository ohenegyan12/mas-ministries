
import { useState, useEffect } from "react";
import { mastersApi } from "@/lib/api";

export function useMaster(id: number | string | null) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMaster = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await mastersApi.getMasterById(id!);
            setData(result);
        } catch (err: any) {
            setError(err.message || "Failed to fetch setting details");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!id) {
            setData(null);
            return;
        }

        fetchMaster();
    }, [id]);

    return { data, isLoading, error, refresh: fetchMaster };
}
