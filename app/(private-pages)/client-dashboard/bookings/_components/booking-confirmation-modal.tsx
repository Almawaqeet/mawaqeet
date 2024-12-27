import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  onCancel,
  message,
}: ConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Go to Bookings
          </Button>
          <Button onClick={onConfirm}>Go to Wallet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationModal;
