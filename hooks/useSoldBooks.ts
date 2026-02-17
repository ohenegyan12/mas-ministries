
import { useState, useEffect } from "react";
import { soldBooksApi } from "@/lib/api";

export function useSoldBooks(page: number = 1) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSoldBooks = async (pageNumber: number) => {
        setIsLoading(true);
        try {
            const result = await soldBooksApi.getSoldBooks(pageNumber);
            setData(result);
        } catch (err: any) {
            setError(err.message || "Failed to fetch sold books");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSoldBooks(page);
    }, [page]);

    return { data, isLoading, error, refresh: () => fetchSoldBooks(page) };
}
