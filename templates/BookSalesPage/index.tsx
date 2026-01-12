"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import Modal from "@/components/Modal";
import BookSalesTable from "./BookSalesTable";
import AddBookSaleModal from "./AddBookSaleModal";

import { stats } from "./stats";

const BookSalesPage = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <Layout title="Book Sales">
            <Breadcrumbs items={["Home", "Book Sales"]}>
                <Button
                    className="max-md:w-full"
                    icon="plus"
                    isPrimary
                    isMedium
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add Book Sale
                </Button>
            </Breadcrumbs>
            <div className="mb-2 text-h4">📚 Book Sales</div>
            <div className="mb-6 text-gray-500 font-medium">
                All book purchases made in support of the ministry. This page tracks product income, not donations.
            </div>
            <Cards items={stats} />
            <BookSalesTable />
            <Modal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                classWrapper="!max-w-160 !max-h-[85vh] overflow-y-auto scrollbar-none"
            >
                <AddBookSaleModal onClose={() => setIsAddModalOpen(false)} />
            </Modal>
        </Layout>
    );
};

export default BookSalesPage;
