import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { CLIENT_ROUTES } from '@/lib/routes';

type WelcomeBannerProps = {
  onClose: () => void;
  title: string;
  description: string;
  buttonAction: () => void;
  buttonText?: string;
};

const WelcomeBanner = ({
  onClose,
  title,
  description,
  buttonAction,
  buttonText = 'Book Now',
}: WelcomeBannerProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 bg-yellow-100 text-black p-4 rounded-lg shadow-lg flex justify-between items-center"
    >
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={buttonAction}>{buttonText}</Button>
        <button
          onClick={onClose}
          className="p-2 hover:bg-yellow-300 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;
