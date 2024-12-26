'use client';

import { AreaGraph } from './area-graph';
import { BarGraph } from './bar-graph';
import { PieGraph } from './pie-graph';
import { CalendarDateRangePicker } from '@/components/reusables/date-range-picker';
import PageContainer from '@/components/layout/page-container';
import { RecentSales } from './recent-sales';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSession } from 'next-auth/react';
import { extractFirstName } from '@/lib/utils';
import { useCheckIfUserHasAWallet } from '@/api/services/wallet';
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import AppDialogBox from '@/components/reusables/AppDialogBox';
import AppButton, { LoadingIcon } from '@/components/reusables/AppButton';
import { LOCAL_STORAGE_KEYS } from "@/constants/local-storage-keys";
import { CLIENT_ROUTES } from "@/lib/routes";
import AppModal from '@/components/reusables/AppModal';
import BookingDemo from './booking-demo-video';
import { Table } from 'lucide-react';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookingTableSkeleton } from '../../bookings/_components/booking-table-skeleton';
import WelcomeBanner from './welcome-banner';


export default function OverViewPage() {
  const { data: session } = useSession();
  const { data: checkIfUserHasWallet, isLoading } = useCheckIfUserHasAWallet();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showTermsAndPolicyModal, setShowTermsAndPolicyModal] = useState(false)
  const [showHajjWelcomeBanner, setShowHajjWelcomeBanner] = useState(false);
  const [showUmrahWelcomeBanner, setShowUmrahWelcomeBanner] = useState(false);
  const [showDemoVideo, setShowDemoVideo] = useState<ReactNode>(<BarGraph />)
  const router = useRouter();
  const userWalletExists = window != undefined ? localStorage.getItem(LOCAL_STORAGE_KEYS.USER_WALLET_STATUS) : false;


  useEffect(() => {
    if (!userWalletExists && isLoading && !checkIfUserHasWallet) {
      const intervalModalCall = setInterval(() => {
        // use this logic for intallment payment plan
        setShowWalletModal(true);
        setShowTermsAndPolicyModal(true)
      }, 2000)

      return () => clearInterval(intervalModalCall)
    }
  }, [isLoading, userWalletExists]);

  useEffect(() => {
    //? this is here because i want to save that the user already has a wallet so this does'nt disturb them on another page render
    if (userWalletExists || checkIfUserHasWallet?.has_wallet) {
      if (typeof window !== undefined) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER_WALLET_STATUS, 'found');
      }
    }
  }, []);

useEffect(() => {
  setShowHajjWelcomeBanner(true)
}, [])


  if (isLoading && !userWalletExists && !userWalletExists) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80">
        <LoadingIcon color="white" />
      </div>
    );
  }

  // helper function that trigger demo state
  const handleDemoVideo = () => {
    setShowDemoVideo((open) => !open)

    document.getElementById('demo-video')?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  const renderLoadingSkeleton = () => (
    <>
      {[...Array(3)].map((_, i) => (
        <BookingTableSkeleton key={i} />
      ))}
    </>
  );

  return (
    <PageContainer scrollable>
      <AppDialogBox
        open={showWalletModal}
        onOpenChange={setShowWalletModal}
        title="You don't have a wallet"
        description="You need to create a wallet to start saving for Hajj/Umrah. Would you like to create one now?"
        cancelText="Later"
        confirmText="Create Wallet"
        onCancel={() => setShowWalletModal(false)}
        onConfirm={() => router.push(CLIENT_ROUTES.PrivatePages.clientDashboard.wallet.createWallet)}
      />

      <AppDialogBox
        open={showTermsAndPolicyModal}
        onOpenChange={setShowTermsAndPolicyModal}
        title="Our Terms And Policy"
        description="will be pasted here"
        onCancel={() => setShowTermsAndPolicyModal(false)}
      />

      <div className="space-y-2">
      {showHajjWelcomeBanner && <WelcomeBanner >
        {/* sample */}
        hajj | latest hajj cohort 2025 (oct 29) | 159 days to go | book
      </WelcomeBanner>}

      {showUmrahWelcomeBanner && <WelcomeBanner >
        umrah
      </WelcomeBanner>}
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi {extractFirstName(session?.user?.fullName ?? '')}, Welcome back 👋
          </h2>

          <div>
            <AppButton onClick={handleDemoVideo}
            >{showDemoVideo ? 'Demo' : 'Close'}</AppButton>
          </div>

          {/* let show this only for user paying on installment */}
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {/* Terms and policy */}
          {/* Terms and policy */}
          {/* </CardTitle> 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <circle cx="100" cy="100" r="95" fill="#EAF3FF" stroke="#0047A4" stroke-width="5" />
                <rect x="90" y="140" width="20" height="30" fill="#1A73E8" />
                <line x1="100" y1="140" x2="100" y2="50" stroke="#1A73E8" stroke-width="5" />
                <line x1="70" y1="60" x2="130" y2="60" stroke="#1A73E8" stroke-width="5" />
                <circle cx="70" cy="75" r="15" fill="#ECFDF3" stroke="#1A73E8" stroke-width="3" />
                <rect x="62" y="68" width="16" height="14" fill="#D0D5DD" />
                <circle cx="130" cy="75" r="15" fill="#EEF4FF" stroke="#1A73E8" stroke-width="3" />
                <path d="M123 70 L137 70 L130 82 Z" fill="#D0D5DD" />
                <path d="M130 130 L115 120 L145 120 L130 130 Z" fill="#0047A4" stroke="#EAF3FF" stroke-width="2" />
              </svg>
            </CardHeader>
            <CardContent>

              <p className="text-xs text-muted-foreground">
                Read payment plan terms and policy
              </p>
            </CardContent>
          </Card> */}
        </div>
        <Tabs defaultValue="hajj" className="space-y-4">
          <TabsList>
            <TabsTrigger value="hajj" onClick={() => { setShowHajjWelcomeBanner(true); setShowUmrahWelcomeBanner(false)}}>Hajj</TabsTrigger>
            <TabsTrigger value="umrah" onClick={() => { setShowUmrahWelcomeBanner(true); setShowHajjWelcomeBanner(false)}}>
              Umrah
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hajj" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* the first two cards will be displayed if the payment plan is installment */}

              {/* one */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {/* installment payment */}
                    Hajj Total Savings
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦0.00</div>
                  <p className="text-xs text-muted-foreground">
                    {/* payment on installment */}
                    Total amount saved so far
                  </p>
                </CardContent>
              </Card>

              {/* two */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {/* if user want to pay on installment */}
                    Hajj Savings Target
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦0.00</div>
                  <p className="text-xs text-muted-foreground">
                    Target amount to be saved
                  </p>
                </CardContent>
              </Card>


              {/* three */}
              {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {/* Let show this for every users */}
              {/* payment plan */}
              {/* Payment plan */}
              {/* </CardTitle> 
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>

                  <p className="text-xs text-muted-foreground">
                    installment or full payment
                  </p>
                </CardContent>
              </Card> */}

              {/* four */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Hajj Savings Progress
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0%</div>
                  <p className="text-xs text-muted-foreground">
                    Percentage of Hajj target reached
                  </p>
                </CardContent>
              </Card>

              {/* five */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Next Hajj Payment Due
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">--/--/----</div>
                  <p className="text-xs text-muted-foreground">
                    Next scheduled Hajj payment date
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4" id='demo-video'>
                <BarGraph showDemoVideo={showDemoVideo} />
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>

                    {/* proposed table for transaction listing */}

{/* 
                    <div className="rounded-lg border shadow-sm overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="font-bold p-2 md:p-4">Package Details</TableHead>
                            <TableHead className="font-bold p-2 md:p-4 hidden sm:table-cell">Booking Date</TableHead>
                            <TableHead className="font-bold p-2 md:p-4">Reciepts</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {/* renderLoadingSkeleton() */}
                          {/* <TableRow className="hover:bg-muted/30 transition-colors"> 
                            <TableCell className="font-medium p-4 text-sm sm:text-base">
                              <div className="flex items-center gap-3">
                                <div>
                                  <span className="font-semibold text-base">hajj cohort 2025</span>
                                  <span className="text-xs text-muted-foreground mt-1 block font-medium">
                                    vip
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="p-4 hidden sm:table-cell">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">
                                  20/11/2025
                                </span>
                              </div>
                            </TableCell>

                            <TableCell className="p-4">
                              <button
                                className={`w-2/4 py-3 text-sm md:text-base font-semibold text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 mt-6`}
                                aria-label={`Download your Reciept ${session?.user.name}`}
                              >
                                Download receipt
                              </button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div> */}
                    Your recent Hajj payment history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
              {/* <div className="col-span-4">
                <AreaGraph />
              </div> */}
              {/* <div className="col-span-4 md:col-span-3">
                <PieGraph />
              </div> */}
            </div>
          </TabsContent>

          <TabsContent value="umrah" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Umrah Total Savings
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦0.00</div>
                  <p className="text-xs text-muted-foreground">
                    Total amount saved for Umrah
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Umrah Target
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦0.00</div>
                  <p className="text-xs text-muted-foreground">
                    Target amount for Umrah
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Umrah Progress
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0%</div>
                  <p className="text-xs text-muted-foreground">
                    Percentage of Umrah target reached
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Next Umrah Payment
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">--/--/----</div>
                  <p className="text-xs text-muted-foreground">
                    Next scheduled Umrah payment
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4" id='demo-video'>
              <BarGraph showDemoVideo={showDemoVideo}  />
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Umrah Transactions</CardTitle>
                  <CardDescription>
                    Your recent Umrah payment history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
              {/* <div className="col-span-4">
                <AreaGraph />
              </div> */}
              {/* <div className="col-span-4 md:col-span-3">
                <PieGraph />
              </div> */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
