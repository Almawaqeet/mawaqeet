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
import { useEffect, useState } from "react";
import AppDialogBox from '@/components/reusables/AppDialogBox';
import { LoadingIcon } from '@/components/reusables/AppButton';
import { LOCAL_STORAGE_KEYS } from "@/constants/local-storage-keys";



export default function OverViewPage() {
    const { data: session } = useSession();
    const { data: checkIfUserHasWallet, isLoading } = useCheckIfUserHasAWallet();
    const [showWalletModal, setShowWalletModal] = useState(false);
    const router = useRouter();
    const userWalletExists = window != undefined ? localStorage.getItem(LOCAL_STORAGE_KEYS.USER_WALLET_STATUS) : false;


    useEffect(() => {
      if (!userWalletExists && isLoading && !checkIfUserHasWallet) {
        setShowWalletModal(true);
      }
    }, [ isLoading, userWalletExists]);

    useEffect(() => {
        //? this is here because i want to save that the user already has a wallet so this does'nt disturb them on another page render 
        if (userWalletExists || checkIfUserHasWallet?.has_wallet) {
            if (typeof window !== undefined) {
                localStorage.setItem(LOCAL_STORAGE_KEYS.USER_WALLET_STATUS, 'found');
            }
        }
    }, []);


    if (isLoading && !userWalletExists && !userWalletExists) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80">
          <LoadingIcon color="white" />
        </div>
      );
    }

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
          onConfirm={() => router.push("/client-dashboard/wallet")}
        />

      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi {extractFirstName(session?.user?.fullName ?? '')}, Welcome back 👋
          </h2>
        </div>
        <Tabs defaultValue="hajj" className="space-y-4">
          <TabsList>
            <TabsTrigger value="hajj">Hajj</TabsTrigger>
            <TabsTrigger value="umrah">
              Umrah
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hajj" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
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
                    Total amount saved so far
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
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
              <div className="col-span-4">
                <BarGraph />
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
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
              <div className="col-span-4">
                <BarGraph />
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
