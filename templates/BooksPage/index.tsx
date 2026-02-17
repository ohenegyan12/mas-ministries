
"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Field from "@/components/Field";
import Checkbox from "@/components/Checkbox";
import { useBooks } from "@/hooks/useBooks";
import { booksApi } from "@/lib/api";

const BooksPage = () => {
    const [page, setPage] = useState(1);
    const { data: result, isLoading, error, refresh } = useBooks(page);
    const [search, setSearch] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<any>(null);
    const [deletingId, setDeletingId] = useState<number | string | null>(null);

    const items = Array.isArray(result) ? result : result?.data || [];
    const filteredData = items.filter((item: any) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const lastPage = result?.last_page || 1;

    const handleDelete = async () => {
        if (!deletingId) return;
        try {
            await booksApi.deleteBook(deletingId);
            refresh();
            setDeletingId(null);
        } catch (err) {
            console.error("Failed to delete book", err);
        }
    };

    return (
        <Layout title="Books">
            <Breadcrumbs items={["Home", "Books"]}>
                <Button
                    className="max-md:w-full"
                    icon="plus"
                    isPrimary
                    isMedium
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add Book
                </Button>
            </Breadcrumbs>

            <div className="mb-2 text-h4">📚 Books</div>
            <div className="mb-8 text-gray-500 font-medium">
                Manage the library of books available for sale.
            </div>

            <Table
                title="Books Catalog"
                search={search}
                setSearch={(e: any) => setSearch(e.target.value)}
                cellsThead={[
                    "Title",
                    "Author",
                    "Price",
                    "Status",
                    "Created At",
                    "Actions",
                ]}
            >
                {isLoading ? (
                    <tr>
                        <td colSpan={6} className="py-20 text-center">
                            <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        </td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td colSpan={6} className="py-10 text-center text-error-100 italic">
                            {error}
                        </td>
                    </tr>
                ) : filteredData.length > 0 ? (
                    filteredData.map((item: any) => (
                        <TableRow key={item.id}>
                            <td className="font-semibold text-gray-900">
                                {item.title}
                            </td>
                            <td className="text-gray-500 font-medium">
                                {item.author || "-"}
                            </td>
                            <td className="font-bold text-gray-900">
                                ${parseFloat(item.price).toLocaleString()}
                            </td>
                            <td>
                                <div className={`status ${item.is_available ? "status-green" : "status-red"}`}>
                                    {item.is_available ? "Available" : "Unavailable"}
                                </div>
                            </td>
                            <td className="text-gray-400">
                                {new Date(item.created_at).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </td>
                            <td>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setSelectedBook(item)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                                        title="Edit"
                                    >
                                        <Icon className="!size-5 fill-gray-400 group-hover:fill-primary-500" name="edit" />
                                    </button>
                                    <button
                                        onClick={() => setDeletingId(item.id)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                                        title="Delete"
                                    >
                                        <Icon className="!size-5 fill-gray-400 group-hover:fill-error-100" name="trash" />
                                    </button>
                                </div>
                            </td>
                        </TableRow>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} className="py-10 text-center text-gray-400">
                            No books found matching your search.
                        </td>
                    </tr>
                )}
            </Table>

            {lastPage > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        className="px-4 py-2 border border-gray-100 rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        disabled={page === 1 || isLoading}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>
                    <div className="text-body-sm font-medium">
                        Page <span className="text-primary-600 font-bold">{page}</span> of {lastPage}
                    </div>
                    <button
                        className="px-4 py-2 border border-gray-100 rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        disabled={page === lastPage || isLoading}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Add Book Modal */}
            <Modal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                classWrapper="!max-w-160"
            >
                <BookForm
                    onClose={() => setIsAddModalOpen(false)}
                    onSuccess={() => {
                        refresh();
                        setIsAddModalOpen(false);
                    }}
                />
            </Modal>

            {/* Edit Book Modal */}
            <Modal
                open={!!selectedBook}
                onClose={() => setSelectedBook(null)}
                classWrapper="!max-w-160"
            >
                {selectedBook && (
                    <BookForm
                        book={selectedBook}
                        onClose={() => setSelectedBook(null)}
                        onSuccess={() => {
                            refresh();
                            setSelectedBook(null);
                        }}
                    />
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                open={!!deletingId}
                onClose={() => setDeletingId(null)}
                classWrapper="!max-w-120"
            >
                <div className="p-8 text-center">
                    <div className="size-16 bg-error-0 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="!size-8 fill-error-100" name="trash" />
                    </div>
                    <h3 className="text-h4 mb-2">Delete Book?</h3>
                    <p className="text-gray-500 font-medium mb-10">
                        Are you sure you want to remove this book? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <Button className="flex-1" isMedium onClick={() => setDeletingId(null)}>Cancel</Button>
                        <Button className="flex-1" isPrimary isMedium onClick={handleDelete}>Delete</Button>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
};

const BookForm = ({ book, onClose, onSuccess }: { book?: any; onClose: () => void; onSuccess: () => void }) => {
    const [title, setTitle] = useState(book?.title || "");
    const [author, setAuthor] = useState(book?.author || "");
    const [isbn, setIsbn] = useState(book?.isbn || "");
    const [price, setPrice] = useState(book?.price || "");
    const [description, setDescription] = useState(book?.description || "");
    const [coverImage, setCoverImage] = useState(book?.cover_image || "");
    const [publishedDate, setPublishedDate] = useState(book?.published_date || new Date().toISOString().split('T')[0]);
    const [publisher, setPublisher] = useState(book?.publisher || "");
    const [currency, setCurrency] = useState(book?.currency || "USD");
    const [isAvailable, setIsAvailable] = useState(book ? book.is_available : true);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const data = {
                title,
                author,
                isbn,
                description,
                cover_image: coverImage,
                published_date: publishedDate,
                publisher,
                price: parseFloat(price),
                currency,
                is_available: isAvailable
            };
            if (book) {
                await booksApi.updateBook(book.id, data);
            } else {
                await booksApi.createBook(data);
            }
            onSuccess();
        } catch (err: any) {
            setError(err.message || "Failed to save book");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="p-8" onSubmit={handleSubmit}>
            <div className="mb-8">
                <h3 className="text-h4 mb-1">{book ? "Edit Book" : "Add New Book"}</h3>
                <p className="text-gray-500 font-medium font-body-sm">
                    {book ? "Update the details of this book title." : "Register a new book to the catalog."}
                </p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                    <Field
                        label="Book Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Women's Stories of Hope"
                        required
                    />
                    <Field
                        label="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="e.g. Jane Smith"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                    <Field
                        label="ISBN"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        placeholder="e.g. 978-1234567890"
                        required
                    />
                    <Field
                        label="Publisher"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                        placeholder="e.g. NGO Publications"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                    <Field
                        label="Published Date"
                        value={publishedDate}
                        onChange={(e) => setPublishedDate(e.target.value)}
                        type="date"
                        required
                    />
                    <div className="flex gap-2">
                        <Field
                            className="flex-[2]"
                            label="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0.00"
                            type="number"
                            required
                        />
                        <div className="flex-1">
                            <label className="block text-body-xs font-bold uppercase text-gray-400 mb-1.5">Currency</label>
                            <div className="h-12 flex items-center px-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-500 font-semibold">
                                {currency}
                            </div>
                        </div>
                    </div>
                </div>

                <Field
                    label="Cover Image URL"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://example.com/cover.jpg"
                />

                <Field
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A collection of inspiring stories..."
                    textarea
                    required
                />

                <Checkbox
                    label="Available for Sale"
                    checked={isAvailable}
                    onChange={() => setIsAvailable(!isAvailable)}
                />

                {error && (
                    <div className="p-4 bg-error-0 border border-error-100 rounded-xl text-error-100 text-body-sm font-medium flex items-center gap-2">
                        <Icon className="fill-error-100 !size-4" name="info" />
                        {error}
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-gray-100">
                <Button type="button" isMedium onClick={onClose}>Cancel</Button>
                <Button type="submit" isPrimary isMedium disabled={loading}>
                    {loading ? "Saving..." : "Save Book"}
                </Button>
            </div>
        </form>
    );
};

export default BooksPage;
