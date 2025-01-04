'use client';

import { BarGraph } from './bar-graph';
import PageContainer from '@/components/layout/page-container';
import { RecentSales } from './recent-sales';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useSession } from 'next-auth/react';
import { useGetFinancialSummary } from '@/api/services/admin-analytics';
import { Skeleton } from '@/components/ui/skeleton';

export default function OverViewPage() {
  const { data: session } = useSession();
  const { data: financialSummary, isLoading: financialSummaryLoading } =
    useGetFinancialSummary();

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋 {session?.user?.fullName ?? 'Admin'}
          </h2>
        </div>

        <Tabs defaultValue="hajj" className="space-y-6">
          <TabsContent value="hajj" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue (YTD)
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
                  {financialSummaryLoading ? (
                    <Skeleton className="h-8 w-[100px]" />
                  ) : (
                    <div className="text-2xl font-bold">
                      ₦
                      {financialSummary?.summary?.company_balance?.balance ??
                        '0.000'}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Expected Revenue
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
                  {financialSummaryLoading ? (
                    <Skeleton className="h-8 w-[100px]" />
                  ) : (
                    <div className="text-2xl font-bold">
                      ₦
                      {financialSummary?.summary?.total_amount_due?.toLocaleString() ??
                        '0'}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Total pending payments from all active bookings
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Outstanding Debt
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
                  {financialSummaryLoading ? (
                    <Skeleton className="h-8 w-[100px]" />
                  ) : (
                    <div className="text-2xl font-bold">
                      ₦
                      {financialSummary?.summary?.company_amount_in_debt?.toLocaleString() ??
                        '0'}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Total unpaid refunds from cancelled bookings
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Bookings
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
                  {financialSummaryLoading ? (
                    <Skeleton className="h-8 w-[100px]" />
                  ) : (
                    <div className="text-2xl font-bold">
                      {financialSummary?.summary?.active_bookings?.toLocaleString() ??
                        '0'}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Total active bookings across all packages
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <BarGraph />
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Registrations</CardTitle>
                  <CardDescription>
                    Latest customer sign-ups and verification status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
