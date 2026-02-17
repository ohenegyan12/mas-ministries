
import { useState, useEffect } from "react";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Icon from "@/components/Icon";
import { soldBooksApi, mastersApi, booksApi } from "@/lib/api";
import { SelectOption } from "@/types/select";

type Props = {
    onClose: () => void;
    onSuccess?: () => void;
};

const AddBookSaleModal = ({ onClose, onSuccess }: Props) => {
    // Form State
    const [selectedBook, setSelectedBook] = useState<SelectOption | undefined>(undefined);
    const [buyerName, setBuyerName] = useState("");
    const [buyerEmail, setBuyerEmail] = useState("");
    const [buyerPhone, setBuyerPhone] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [paymentMethod, setPaymentMethod] = useState<SelectOption | undefined>(undefined);
    const [paymentStatus, setPaymentStatus] = useState<SelectOption | undefined>({ id: "completed", name: "Completed" });
    const [notes, setNotes] = useState("");
    const [saleDate, setSaleDate] = useState(new Date().toISOString().split('T')[0]);

    // Options
    const [bookOptions, setBookOptions] = useState<SelectOption[]>([]);
    const [paymentOptions, setPaymentOptions] = useState<SelectOption[]>([]);
    const [statusOptions] = useState<SelectOption[]>([
        { id: "completed", name: "Completed" },
        { id: "pending", name: "Pending" },
        { id: "failed", name: "Failed" },
    ]);

    // Status State
    const [isLoadingOptions, setIsLoadingOptions] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [masters, booksData] = await Promise.all([
                    mastersApi.getMasters(1),
                    booksApi.getBooks().catch(() => ({ data: [] })), // Graceful catch if endpoint doesn't exist
                ]);

                const allMasterItems = Array.isArray(masters) ? masters : (masters as any)?.data || [];
                const allBooks = Array.isArray(booksData) ? booksData : (booksData as any)?.data || [];

                const payments = allMasterItems
                    .filter((item: any) => (item.type === "payment_method" || item.type === "payment_type") && item.is_active)
                    .map((item: any) => ({ id: item.id, name: item.name.replace('_', ' ').toUpperCase() }));

                const books = allBooks.map((item: any) => ({
                    id: item.id,
                    name: item.title || item.name,
                    price: item.price
                }));

                setPaymentOptions(payments);
                setBookOptions(books);

                if (payments.length > 0) setPaymentMethod(payments[0]);
                if (books.length > 0) {
                    setSelectedBook(books[0]);
                    setSalePrice(books[0].price?.toString() || "");
                }
            } catch (err) {
                console.error("Failed to fetch options", err);
            } finally {
                setIsLoadingOptions(false);
            }
        };

        fetchOptions();
    }, []);

    // Update price when book changes
    useEffect(() => {
        if (selectedBook && (selectedBook as any).price) {
            setSalePrice((selectedBook as any).price.toString());
        }
    }, [selectedBook]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const payload = {
            book_id: selectedBook?.id,
            buyer_name: buyerName,
            buyer_email: buyerEmail,
            buyer_phone: buyerPhone,
            sale_price: parseFloat(salePrice),
            currency: currency,
            payment_method_id: paymentMethod?.id,
            payment_status: paymentStatus?.id,
            notes: notes,
            sale_date: saleDate,
        };

        try {
            await soldBooksApi.createSoldBook(payload);
            onSuccess && onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || "Failed to record book sale");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="p-8" onSubmit={handleSubmit}>
            <div className="mb-8">
                <h3 className="text-h4 mb-1">Add Book Sale</h3>
                <p className="text-gray-500 font-medium font-body-sm">Record a new book purchase with full transaction details.</p>
            </div>

            {isLoadingOptions ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                        <Field
                            label="Buyer Name"
                            value={buyerName}
                            onChange={(e) => setBuyerName(e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                        <Field
                            label="Email Address"
                            value={buyerEmail}
                            onChange={(e) => setBuyerEmail(e.target.value)}
                            placeholder="john@example.com"
                            type="email"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                        <Field
                            label="Phone Number"
                            value={buyerPhone}
                            onChange={(e) => setBuyerPhone(e.target.value)}
                            placeholder="+1234567890"
                        />
                        <Field
                            label="Sale Date"
                            value={saleDate}
                            onChange={(e) => setSaleDate(e.target.value)}
                            type="date"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                        <Select
                            label="Select Book"
                            value={selectedBook}
                            onChange={setSelectedBook}
                            options={bookOptions}
                            required
                        />
                        <div className="flex gap-2">
                            <Field
                                className="flex-[2]"
                                label="Sale Price"
                                value={salePrice}
                                onChange={(e) => setSalePrice(e.target.value)}
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

                    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                        <Select
                            label="Payment Method"
                            value={paymentMethod}
                            onChange={setPaymentMethod}
                            options={paymentOptions}
                            required
                        />
                        <Select
                            label="Payment Status"
                            value={paymentStatus}
                            onChange={setPaymentStatus}
                            options={statusOptions}
                            required
                        />
                    </div>

                    <Field
                        label="Internal Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add details about the sale..."
                        textarea
                    />

                    {error && (
                        <div className="p-4 bg-error-0 border border-error-100 rounded-xl text-error-100 text-body-sm font-medium flex items-center gap-2">
                            <Icon className="fill-error-100 !size-4" name="info" />
                            {error}
                        </div>
                    )}
                </div>
            )}

            <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-gray-100">
                <Button
                    type="button"
                    isMedium
                    onClick={onClose}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    isPrimary
                    isMedium
                    disabled={isSubmitting || isLoadingOptions}
                >
                    {isSubmitting ? "Saving..." : "Record Sale"}
                </Button>
            </div>
        </form>
    );
};

export default AddBookSaleModal;
