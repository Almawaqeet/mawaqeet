import React from 'react';
import { X } from 'lucide-react';

interface BookingDemoProps {
  onClose?: () => void;
  link?: string;
}

const BookingDemo = ({ onClose, link }: BookingDemoProps) => {
  return (
    <div className="relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 hover:bg-black/30"
        >
          <X className="h-4 w-4 text-white" />
        </button>
      )}
      <div className="relative overflow-hidden w-full pt-[56.25%]">
        <iframe
          className="absolute inset-0 w-full h-full bg-black"
          src={
            link ??
            'https://utfs.io/f/HSbZtkoKCyOfYL1eF7ylQTZp2r0cG3Mw97Xjdq4DnKhSiR1L'
          }
          title="mawaqeet-welcoming-video"
          sandbox="allow-scripts allow-same-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
};

export default BookingDemo;
