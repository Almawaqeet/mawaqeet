import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  CreditCardIcon,
  FileTextIcon,
  PhoneCallIcon,
  XIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompletionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestCard: () => void;
  onDownloadPortfolio: () => void;
  onLiveCall: () => void;
}

function CompletionModal({
  open,
  onOpenChange,
  onRequestCard,
  onDownloadPortfolio,
  onLiveCall,
}: CompletionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-4">
            🎉 Congratulations!
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Your booking has been completed successfully. What would you like to
            do next?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Button onClick={onRequestCard} className="flex items-center gap-2">
            <CreditCardIcon className="h-5 w-5" />
            Request Payment Card
          </Button>
          <Button
            onClick={onDownloadPortfolio}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileTextIcon className="h-5 w-5" />
            Download Hajj Guide Portfolio
          </Button>
          <Button
            onClick={onLiveCall}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <PhoneCallIcon className="h-5 w-5" />
            Schedule a Live Call
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CompletionModal;
