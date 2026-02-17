
import { useState, useEffect } from "react";
import { donationsApi } from "@/lib/api";

export function useDonation(id: number | string | null) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDonation = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await donationsApi.getDonationById(id!);
            setData(result);
        } catch (err: any) {
            setError(err.message || "Failed to fetch donation details");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!id) {
            setData(null);
            return;
        }

        fetchDonation();
    }, [id]);

    return { data, isLoading, error, refresh: fetchDonation };
}
