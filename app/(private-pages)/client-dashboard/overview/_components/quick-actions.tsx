'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Calendar, PlayCircle, BookOpen, History, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import BookingDemo from './booking-demo-video';
import AppDialogBox from '@/components/reusables/AppDialogBox';
import { CLIENT_ROUTES } from '@/lib/routes';

const shortcuts = [
  {
    title: 'How to Book a package',
    description: 'Watch our step-by-step booking guide',
    icon: <PlayCircle className="h-6 w-6" />,
    isVideo: true,
    link: "https://utfs.io/f/HSbZtkoKCyOfYL1eF7ylQTZp2r0cG3Mw97Xjdq4DnKhSiR1L"
  },
  {
    title: 'View & Book Packages',
    description: 'Browse and book Hajj or Umrah packages',
    icon: <Calendar className="h-6 w-6" />,
    route: CLIENT_ROUTES.PrivatePages.clientDashboard.packages
  },
  {
    title: 'Learn Our Process',
    description: 'Understand what happens after booking a package',
    icon: <BookOpen className="h-6 w-6" />,
    isVideo: true,
    link: "https://utfs.io/f/HSbZtkoKCyOfYL1eF7ylQTZp2r0cG3Mw97Xjdq4DnKhSiR1L"
  },
  {
    title: 'Booking Manager',
    description: 'View and manage upcoming bookings',
    icon: <History className="h-6 w-6" />,
    route: CLIENT_ROUTES.PrivatePages.clientDashboard.booking.mainPage
  },
  {
    title: 'Wallet Manager',
    description: 'Manage your wallet payments and transactions',
    icon: <Wallet className="h-6 w-6" />,
    route: CLIENT_ROUTES.PrivatePages.clientDashboard.wallet.viewWallet
  },
  {
    title: 'Help and Support',
    description: 'Are you stuck? Get help from our support team',
    icon: <HelpCircle className="h-6 w-6" />,
    isSupport: true
  },
];

export function QuickActions() {
  const router = useRouter();
  const [showVideo, setShowVideo] = React.useState(false);
  const [showSupportModal, setShowSupportModal] = React.useState(false);
  const [selectedVideoLink, setSelectedVideoLink] = React.useState<string>("");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleClick = (shortcut: typeof shortcuts[0]) => {
    if (shortcut.isVideo) {
      setSelectedVideoLink(shortcut.link ?? "");
      setShowVideo(true);
    } else if (shortcut.isSupport) {
      setShowSupportModal(true);
    } else {
      router.push(shortcut.route as string);
    }
  };

  return (
    <Card>
      <AppDialogBox
        open={showSupportModal}
        onOpenChange={setShowSupportModal}
        title="Contact Support"
        description="Would you like to start a live call with our support representative?"
        confirmText="Start Call"
        cancelText="Cancel"
        onConfirm={() => {
          // Handle starting live call
          setShowSupportModal(false);
        }}
        onCancel={() => setShowSupportModal(false)}
      />

      {showVideo ? (
        <BookingDemo onClose={() => setShowVideo(false)} link={selectedVideoLink}/>
      ) : (
        <div>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Shortcuts to help you navigate quickly
            </CardDescription>
          </CardHeader>

          <CardContent>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {shortcuts.map((shortcut) => (
                <motion.button
                  key={shortcut.title}
                  variants={item}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleClick(shortcut)}
                  className="flex items-start space-x-4 rounded-lg border bg-white/90 p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    {shortcut.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{shortcut.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {shortcut.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </CardContent>
        </div>
      )}
    </Card>
  );
}
