
import { useState, useEffect } from "react";
import { galleriesApi } from "@/lib/api";

export function useGalleries(page: number = 1) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGalleries = async (pageNumber: number) => {
        setIsLoading(true);
        try {
            const result = await galleriesApi.getGalleries(pageNumber);
            setData(result);
        } catch (err: any) {
            setError(err.message || "Failed to fetch gallery items");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGalleries(page);
    }, [page]);

    return { data, isLoading, error, refresh: () => fetchGalleries(page) };
}
