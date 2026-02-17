
import { useState, useEffect } from "react";
import { soldBooksApi } from "@/lib/api";

export function useSoldBook(id: number | string | null) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSoldBook = async () => {
        if (!id) return;
        setIsLoading(true);
        setError(null);
        try {
            const result = await soldBooksApi.getSoldBookById(id);
            setData(result);
        } catch (err: any) {
            setError(err.message || "Failed to fetch book sale details");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchSoldBook();
        } else {
            setData(null);
        }
    }, [id]);

    return { data, isLoading, error, refresh: fetchSoldBook };
}
