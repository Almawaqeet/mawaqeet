'use client';

import { QuickActions } from './quick-actions';
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
import { LOCAL_STORAGE_KEYS } from "@/constants/local-storage-keys";
import { CLIENT_ROUTES } from "@/lib/routes";
import WelcomeBanner from './welcome-banner';
import { useGetUpcomingHajjAndUmrahPackage, useGetUserFinancialSummary } from '@/api/services/user-anaalytics';
import { PACKAGE_TYPES } from '@/constants/generic';
import { Skeleton } from '@/components/ui/skeleton';

export default function OverViewPage() {
  const { data: session } = useSession();
  const { data: checkIfUserHasWallet, isLoading: isWalletLoading } = useCheckIfUserHasAWallet();
  const { data: upcomingPackages, isLoading: isPackagesLoading } = useGetUpcomingHajjAndUmrahPackage();
  const { data: hajjFinancialSummary, isLoading: isHajjSummaryLoading } = useGetUserFinancialSummary(PACKAGE_TYPES.HAJJ);
  const { data: umrahFinancialSummary, isLoading: isUmrahSummaryLoading } = useGetUserFinancialSummary(PACKAGE_TYPES.UMRAH);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showTermsAndPolicyModal, setShowTermsAndPolicyModal] = useState(false);
  const [showHajjWelcomeBanner, setShowHajjWelcomeBanner] = useState(true);
  const [showUmrahWelcomeBanner, setShowUmrahWelcomeBanner] = useState(false);

  const router = useRouter();
  const userWalletExists = window != undefined ? localStorage.getItem(LOCAL_STORAGE_KEYS.USER_WALLET_STATUS) : false;

  useEffect(() => {
    if (!userWalletExists && isWalletLoading && !checkIfUserHasWallet) {
      const intervalModalCall = setInterval(() => {
        // use this logic for intallment payment plan
        setShowWalletModal(true);
        setShowTermsAndPolicyModal(true)
      }, 2000)

      return () => clearInterval(intervalModalCall)
    }
  }, [isWalletLoading, userWalletExists]);

  useEffect(() => {
    //? this is here because i want to save that the user already has a wallet so this does'nt disturb them on another page render
    if (userWalletExists || checkIfUserHasWallet?.has_wallet) {
      if (typeof window !== undefined) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER_WALLET_STATUS, 'found');
      }
    }
  }, []);

  if (isWalletLoading && !userWalletExists && !userWalletExists) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
        </div>
    );
  }

  const renderCardSkeleton = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-[120px] mb-2" />
        <Skeleton className="h-3 w-[140px]" />
      </CardContent>
    </Card>
  );

  const renderSkeletonGrid = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => renderCardSkeleton())}
    </div>
  );

  return (
    <PageContainer scrollable>
      {/* Hajj Welcome Banner */}
      {showHajjWelcomeBanner && upcomingPackages?.hajj && (
        <WelcomeBanner
          onClose={() => setShowHajjWelcomeBanner(false)}
          title={`Next Hajj Cohort: ${upcomingPackages?.hajj?.name}`}
          description={`Begin your spiritual journey to the holy lands. Book your Hajj package today! Expires on ${upcomingPackages?.hajj?.expiry_date ? new Date(upcomingPackages.hajj.expiry_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}`}
          buttonAction={() => router.push(CLIENT_ROUTES.PrivatePages.clientDashboard.viewPackage(upcomingPackages?.hajj?.id as string))}
          buttonText="Book Now"
        />
      )}

      {/* Umrah Welcome Banner */}
      {showUmrahWelcomeBanner && upcomingPackages?.umrah && (
        <WelcomeBanner
          onClose={() => setShowUmrahWelcomeBanner(false)}
          title={`Plan Your Umrah Journey: ${upcomingPackages.umrah.name}`}
          description={`Explore our Umrah packages and start your blessed journey to the holy lands today. Expires on ${upcomingPackages?.umrah?.expiry_date ? new Date(upcomingPackages.umrah.expiry_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}`}
          buttonAction={() => router.push(CLIENT_ROUTES.PrivatePages.clientDashboard.viewPackage(upcomingPackages?.umrah?.id as string))}
          buttonText="View Packages"
        />
      )}

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

      <div className="space-y-2 relative">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi {extractFirstName(session?.user?.fullName ?? '')}, Welcome back 👋
          </h2>
        </div>
        <Tabs defaultValue="hajj" className="space-y-4">
          <TabsList>
            <TabsTrigger value="hajj" onClick={() => { setShowHajjWelcomeBanner(true); setShowUmrahWelcomeBanner(false)}}>Hajj</TabsTrigger>
            <TabsTrigger value="umrah" onClick={() => { setShowUmrahWelcomeBanner(true); setShowHajjWelcomeBanner(false)}}>
              Umrah
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hajj" className="space-y-4">
            {isHajjSummaryLoading ? (
              renderSkeletonGrid()
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* one */}
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
                    <div className="text-2xl font-bold">₦{hajjFinancialSummary?.total_spent?.toLocaleString() ?? '0.00'}</div>
                    <p className="text-xs text-muted-foreground">
                      Total amount invested so far
                    </p>
                  </CardContent>
                </Card>

                {/* two */}
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
                    <div className="text-2xl font-bold">₦{hajjFinancialSummary?.active_booking?.total_price?.toLocaleString() ?? '0.00'}</div>
                    <p className="text-xs text-muted-foreground">
                      Target amount to be saved
                    </p>
                  </CardContent>
                </Card>

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
                    <div className="text-2xl font-bold">{hajjFinancialSummary?.active_booking?.completion_percentage ?? 0}%</div>
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
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4" id='demo-video'>
                <QuickActions  />
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Hajj Transactions</CardTitle>
                  <CardDescription>Summary of your recent package payment</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <RecentSales type={PACKAGE_TYPES.HAJJ} />
                </CardContent>
                </Card>
            </div>
          </TabsContent>

          <TabsContent value="umrah" className="space-y-4">
            {isUmrahSummaryLoading ? (
              renderSkeletonGrid()
            ) : (
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
                    <div className="text-2xl font-bold">₦{umrahFinancialSummary?.total_spent?.toLocaleString() ?? '0.00'}</div>
                    <p className="text-xs text-muted-foreground">
                      Total amount invested for Umrah
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
                    <div className="text-2xl font-bold">₦{umrahFinancialSummary?.active_booking?.total_price?.toLocaleString() ?? '0.00'}</div>
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
                    <div className="text-2xl font-bold">{umrahFinancialSummary?.active_booking?.completion_percentage ?? 0}%</div>
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
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4" id='demo-video'>
              <QuickActions  />
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Umrah Transactions</CardTitle>
                  <CardDescription>
                    View Your recent package payment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales type={PACKAGE_TYPES.UMRAH}/>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
