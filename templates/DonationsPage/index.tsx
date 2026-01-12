"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import Modal from "@/components/Modal";
import DonationsTable from "./DonationsTable";
import AddDonationModal from "./AddDonationModal";

import { stats } from "./stats";

const DonationsPage = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
            <DonationsTable />
            <Modal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                classWrapper="!max-w-160 !max-h-[85vh] overflow-y-auto scrollbar-none"
            >
                <AddDonationModal onClose={() => setIsAddModalOpen(false)} />
            </Modal>
        </Layout>
    );
};

export default DonationsPage;
