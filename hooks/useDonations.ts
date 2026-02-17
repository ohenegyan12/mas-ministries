
import { useState, useEffect } from "react";
import { donationsApi } from "@/lib/api";

export function useDonations(page: number = 1) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDonations = async (pageNumber: number) => {
        setIsLoading(true);
        try {
            const result = await donationsApi.getDonations(pageNumber);
            setData(result);
        } catch (err: any) {
            setError(err.message || "Failed to fetch donations");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDonations(page);
    }, [page]);

    return { data, isLoading, error, refresh: () => fetchDonations(page) };
}
