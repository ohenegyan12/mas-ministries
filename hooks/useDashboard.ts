
import { useState, useEffect } from "react";
import { dashboardApi } from "@/lib/api";

export function useDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        setIsLoading(true);
        try {
            const data = await dashboardApi.getStatistics();
            setStats(data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch dashboard statistics");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return { stats, isLoading, error, refresh: fetchStats };
}
