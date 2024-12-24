import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

interface CancelModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    totalAmountPaid: number;
    isCancelling: boolean;
}

function CancelModal({ open, onOpenChange, onConfirm, totalAmountPaid, isCancelling }: CancelModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Cancel Booking</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to cancel this booking? The amount you have paid (₦{totalAmountPaid?.toLocaleString('en-NG', { minimumFractionDigits: 2 })}) will be refunded to your wallet.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isCancelling}>
                        No, Keep Booking
                    </Button>
                    <Button variant="destructive" onClick={onConfirm} disabled={isCancelling}>
                        {isCancelling ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2"></div>
                                Cancelling...
                            </>
                        ) : (
                            <>
                                <XIcon className="mr-2 h-4 w-4" />
                                Yes, Cancel Booking
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CancelModal
