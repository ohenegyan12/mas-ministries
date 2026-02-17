"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import Modal from "@/components/Modal";
import BookSalesTable from "./BookSalesTable";
import AddBookSaleModal from "./AddBookSaleModal";
import BookSaleDetailModal from "./BookSaleDetailModal";
import EditBookSaleModal from "./EditBookSaleModal";

import { useSoldBooks } from "@/hooks/useSoldBooks";

const BookSalesPage = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, error, refresh } = useSoldBooks(page);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedSaleId, setSelectedSaleId] = useState<number | string | null>(null);
    const [editSaleId, setEditSaleId] = useState<number | string | null>(null);

    const dynamicStats = [
        {
            title: "Total Sales Count",
            value: data?.total?.toString() || "0",
            percentage: 0,
            image: "book",
            tooltip: "Total number of book sales recorded",
        },
    ];

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
            <div className="mb-4 text-gray-500 font-medium">
                All book purchases made in support of the ministry. This page tracks product income, not donations.
            </div>
            <div className="max-w-xs mb-8">
                <Cards items={dynamicStats} />
            </div>
            <BookSalesTable
                data={data?.data || []}
                isLoading={isLoading}
                currentPage={data?.current_page || 1}
                lastPage={data?.last_page || 1}
                onPageChange={(p: number) => setPage(p)}
                onViewDetails={(id: number | string) => setSelectedSaleId(id)}
                error={error}
            />
            <Modal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                classWrapper="!max-w-160 !max-h-[85vh] overflow-y-auto scrollbar-none"
            >
                <AddBookSaleModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSuccess={() => refresh()}
                />
            </Modal>
            <Modal
                open={!!selectedSaleId}
                onClose={() => setSelectedSaleId(null)}
                classWrapper="!max-w-200 !max-h-[85vh] overflow-y-auto scrollbar-none"
            >
                {selectedSaleId && (
                    <BookSaleDetailModal
                        id={selectedSaleId}
                        onClose={() => setSelectedSaleId(null)}
                        onEdit={(id) => {
                            setSelectedSaleId(null);
                            setEditSaleId(id);
                        }}
                    />
                )}
            </Modal>
            <Modal
                open={!!editSaleId}
                onClose={() => setEditSaleId(null)}
                classWrapper="!max-w-160 !max-h-[85vh] overflow-y-auto scrollbar-none"
            >
                {editSaleId && (
                    <EditBookSaleModal
                        id={editSaleId}
                        onClose={() => setEditSaleId(null)}
                        onSuccess={() => {
                            refresh();
                            setEditSaleId(null);
                        }}
                    />
                )}
            </Modal>
        </Layout>
    );
};

export default BookSalesPage;
