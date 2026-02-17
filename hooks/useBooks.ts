
import { useState, useEffect } from "react";
import { booksApi } from "@/lib/api";

export function useBooks(page: number = 1) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = async (pageNumber: number) => {
        setIsLoading(true);
        try {
            const result = await booksApi.getBooks(pageNumber);
            setData(result);
        } catch (err: any) {
            setError(err.message || "Failed to fetch books");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks(page);
    }, [page]);

    return { data, isLoading, error, refresh: () => fetchBooks(page) };
}
