"use client";

import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import TicketSalesAnalytics from "./TicketSalesAnalytics";
import UserDistribution from "./UserDistribution";
import RecentTransactions from "./RecentTransactions";
import { useDashboard } from "@/hooks/useDashboard";
import millify from "millify";

const HomePage = () => {
    const { stats: data, isLoading, error } = useDashboard();

    const stats = [
        {
            title: "Total Raised",
            value: data ? `$${millify(data.totals.total)}` : "$0",
            percentage: 0, // Not provided in API yet
            image: "chart",
            tooltip: "Total funds raised all-time",
        },
        {
            title: "Donations Count",
            value: data ? data.stats.donations.toString() : "0",
            percentage: 0,
            image: "calendar",
            tooltip: "Total number of donations",
        },
        {
            title: "Donations Total",
            value: data ? `$${millify(data.totals.donations_amount)}` : "$0",
            percentage: 0,
            image: "coins",
            tooltip: "Total from donations",
        },
        {
            title: "Book Sales Total",
            value: data ? `$${millify(data.totals.book_sales)}` : "$0",
            percentage: 0,
            image: "sale",
            tooltip: "Total from book sales",
        },
    ];

    if (isLoading) {
        return (
            <Layout title="Dashboard">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout title="Dashboard">
                <div className="p-8 text-center bg-red-50 text-red-600 rounded-2xl border border-red-100">
                    <p className="font-semibold">Failed to load dashboard data</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Dashboard">
            <Breadcrumbs items={["Home", "Dashboard"]}>
                <Button className="max-md:w-full" isSecondary isMedium>
                    Generate Reports
                </Button>
            </Breadcrumbs>
            <Cards items={stats} />
            <div className="flex gap-6 mt-6 max-lg:flex-col">
                <TicketSalesAnalytics
                    data={data?.daily_breakdown || []}
                    total={data?.totals?.total || 0}
                />
                <UserDistribution
                    data={data?.analytics?.donations?.by_purpose || []}
                />
            </div>
            <RecentTransactions transactions={data?.recent?.last_10_donations || []} />
        </Layout>
    );
};

export default HomePage;
