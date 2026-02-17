
import { useState, useEffect } from "react";
import { mastersApi } from "@/lib/api";

export function useMasters(page: number = 1) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMasters = async (pageNumber: number) => {
        setIsLoading(true);
        try {
            const result = await mastersApi.getMasters(pageNumber);
            setData(result);
        } catch (err: any) {
            setError(err.message || "Failed to fetch administrative settings");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMasters(page);
    }, [page]);

    return { data, isLoading, error, refresh: () => fetchMasters(page) };
}
