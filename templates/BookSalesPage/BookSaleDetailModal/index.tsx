
import { useSoldBook } from "@/hooks/useSoldBook";
import Icon from "@/components/Icon";
import Button from "@/components/Button";

type Props = {
    id: number | string;
    onClose: () => void;
    onEdit?: (id: number | string) => void;
};

const BookSaleDetailModal = ({ id, onClose, onEdit }: Props) => {
    const { data, isLoading, error } = useSoldBook(id);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center text-error-100 font-medium">
                <Icon className="fill-error-100 !size-8 mx-auto mb-4" name="info" />
                {error}
                <div className="mt-6">
                    <Button isMedium onClick={onClose}>Close</Button>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const sale = data;

    return (
        <div className="p-8">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-h3 mb-1">Sale Details</h3>
                    <p className="text-gray-500 font-medium">Transaction ID: #{sale.id}</p>
                </div>
                <div className={`status ${sale.payment_status === "completed" || sale.payment_status === "successful" ? "status-green" : "status-yellow"}`}>
                    {sale.payment_status}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-8 max-md:grid-cols-1">
                <section>
                    <h4 className="text-body-xs font-bold uppercase text-gray-400 mb-4 tracking-wider">Buyer Information</h4>
                    <div className="space-y-4">
                        <div>
                            <div className="text-body-sm text-gray-500 mb-0.5">Full Name</div>
                            <div className="font-semibold text-gray-900">{sale.buyer_name || sale.donor_name}</div>
                        </div>
                        <div>
                            <div className="text-body-sm text-gray-500 mb-0.5">Email Address</div>
                            <div className="font-semibold text-gray-900">{sale.buyer_email || sale.donor_email}</div>
                        </div>
                        <div>
                            <div className="text-body-sm text-gray-500 mb-0.5">Phone Number</div>
                            <div className="font-semibold text-gray-900">{sale.buyer_phone || "-"}</div>
                        </div>
                    </div>
                </section>

                <section>
                    <h4 className="text-body-xs font-bold uppercase text-gray-400 mb-4 tracking-wider">Transaction Info</h4>
                    <div className="space-y-4">
                        <div>
                            <div className="text-body-sm text-gray-500 mb-0.5">Book Title</div>
                            <div className="font-semibold text-primary-600">{sale.book?.title || sale.book_name || "Book Purchase"}</div>
                        </div>
                        <div>
                            <div className="text-body-sm text-gray-500 mb-0.5">Amount Paid</div>
                            <div className="font-bold text-gray-900 text-h4">
                                {sale.currency || "$"} {parseFloat(sale.sale_price || sale.total_amount || 0).toLocaleString()}
                            </div>
                        </div>
                        <div>
                            <div className="text-body-sm text-gray-500 mb-0.5">Payment Method</div>
                            <div className="flex items-center gap-2 font-semibold text-gray-900 capitalize">
                                <Icon className="!size-4 fill-gray-400" name={sale.payment_method?.toLowerCase().includes('card') ? 'card' : 'wallet'} />
                                {sale.payment_method?.replace('_', ' ') || "-"}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="col-span-2 max-md:col-span-1">
                    <h4 className="text-body-xs font-bold uppercase text-gray-400 mb-4 tracking-wider">Additional Context</h4>
                    <div className="space-y-4">
                        <div>
                            <div className="text-body-sm text-gray-500 mb-0.5">Notes</div>
                            <div className="p-4 bg-gray-25 border border-gray-100 rounded-xl text-gray-600 font-medium italic">
                                {sale.notes || "No additional notes provided for this transaction."}
                            </div>
                        </div>
                        <div>
                            <div className="text-body-sm text-gray-500 mb-0.5">Sale Date</div>
                            <div className="font-semibold text-gray-900">
                                {new Date(sale.sale_date || sale.created_at).toLocaleDateString("en-US", {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="flex gap-3 mt-12 pt-8 border-t border-gray-100">
                <Button className="flex-1" isSecondary isLarge onClick={onClose}>
                    Close Details
                </Button>
                {onEdit && (
                    <Button
                        className="flex-1"
                        isPrimary
                        isLarge
                        onClick={() => {
                            onEdit(id);
                        }}
                        icon="edit"
                    >
                        Edit Details
                    </Button>
                )}
            </div>
        </div>
    );
};

export default BookSaleDetailModal;
