import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ReceiptIcon } from "lucide-react";
import Link from "next/link";

interface Transaction {
    id?: number | undefined;
    amount_paid?: string | undefined;
    transaction_date_initiated?: string | undefined;
    transaction_status?: string | undefined;
    reference: string;
    receipt_url?: string | undefined;
}

interface ReceiptsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transactions?: Transaction[];
}

function ReceiptsModal({ open, onOpenChange, transactions }: ReceiptsModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[500px] overflow-y-auto bg-white">
                <DialogHeader className="sticky top-0 z-10 pb-4">
                    <DialogTitle className="flex items-center gap-2">
                        <ReceiptIcon className="h-5 w-5 text-brand-color" />
                        Payment Receipts
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 px-1 h-[200px] overflow-y-auto">
                    {transactions?.length ? (
                        transactions.map((transaction) => (
                            <div key={transaction?.id} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">Amount: ₦{Number(transaction?.amount_paid ?? 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                                    <span className="text-sm text-gray-500">{new Date(transaction?.transaction_date_initiated ?? '').toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">Reference: {transaction?.reference ?? 'N/A'}</span>
                                </div>
                                {transaction?.receipt_url && (
                                    <Link
                                        href={transaction.receipt_url}
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        className="text-brand-color hover:underline text-sm flex items-center gap-2"
                                    >
                                        <ReceiptIcon className="h-4 w-4" />
                                        Download Receipt
                                    </Link>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No payment receipts available</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}


export default ReceiptsModal
