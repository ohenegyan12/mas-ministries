"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import Modal from "@/components/Modal";
import DonationsTable from "./DonationsTable";
import AddDonationModal from "./AddDonationModal";
import DonationDetailModal from "./DonationDetailModal";
import { useDonations } from "@/hooks/useDonations";
import millify from "millify";

const DonationsPage = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, error, refresh } = useDonations(page);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedDonationId, setSelectedDonationId] = useState<number | string | null>(null);

    const stats = [
        {
            title: "Total Donations",
            value: data?.total?.toString() || "0",
            percentage: 0,
            image: "coins",
            tooltip: "Total number of donations received",
        },
        {
            title: "Success Rate",
            value: "100%", // Not provided in API yet
            percentage: 0,
            image: "chart",
            tooltip: "Percentage of successful donations",
        },
    ];

    return (
        <Layout title="Donations">
            <Breadcrumbs items={["Home", "Donations"]}>
                <Button
                    className="max-md:w-full"
                    icon="plus"
                    isPrimary
                    isMedium
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add Donation
                </Button>
            </Breadcrumbs>
            <div className="mb-2 text-h4">❤️ Donations</div>
            <div className="mb-6 text-gray-500 font-medium">
                All financial gifts given to support the ministry.
            </div>

            <Cards items={stats} />

            <DonationsTable
                data={data?.data || []}
                isLoading={isLoading}
                currentPage={data?.current_page || 1}
                lastPage={data?.last_page || 1}
                onPageChange={(p: number) => setPage(p)}
                onViewDetails={(id: number | string) => setSelectedDonationId(id)}
                error={error}
            />

            <Modal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                classWrapper="!max-w-160 !max-h-[85vh] overflow-y-auto scrollbar-none"
            >
                <AddDonationModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSuccess={() => refresh()}
                />
            </Modal>

            <Modal
                open={!!selectedDonationId}
                onClose={() => setSelectedDonationId(null)}
                classWrapper="!max-w-200 !max-h-[85vh] overflow-y-auto scrollbar-none"
            >
                {selectedDonationId && (
                    <DonationDetailModal
                        id={selectedDonationId}
                        onClose={() => setSelectedDonationId(null)}
                        onUpdate={() => refresh()}
                    />
                )}
            </Modal>
        </Layout>
    );
};

export default DonationsPage;
