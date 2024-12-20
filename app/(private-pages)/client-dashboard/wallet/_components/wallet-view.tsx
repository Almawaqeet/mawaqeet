'use client';

import { useCheckIfUserHasAWallet, useCheckWalletInformation } from "@/api/services/wallet";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppButton, { LoadingIcon } from "@/components/reusables/AppButton";
import { extractFirstName } from "@/lib/utils";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CLIENT_ROUTES } from "@/lib/routes";
import { LOCAL_STORAGE_KEYS } from "@/constants/local-storage-keys";

export default function WalletView() {
    const { data: session } = useSession();
    const { data: checkIfUserHasWallet, isLoading } = useCheckIfUserHasAWallet();
    const { data: walletInformation, isLoading: walletInformationLoading } = useCheckWalletInformation();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && checkIfUserHasWallet?.has_wallet === false) {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_WALLET_STATUS);
            router.push(CLIENT_ROUTES.PrivatePages.clientDashboard.wallet.createWallet);
        }
    }, [checkIfUserHasWallet, isLoading, router]);

    if (isLoading || walletInformationLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/80">
                <LoadingIcon color="white" />
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-6xl px-4 py-4 sm:py-8">
            {checkIfUserHasWallet?.has_wallet === false  && (
                <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 sm:space-y-6 rounded-lg bg-gray-50 p-4 sm:p-8 text-center">
                    <div className="space-y-3 sm:space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-bold">Welcome to Your Digital Wallet</h2>
                        <p className="text-base sm:text-lg text-gray-600">Get started by creating your wallet to manage your funds easily</p>
                    </div>
                    <Button
                        onClick={() => router.push("/client-dashboard/wallet/create")}
                        className="w-full sm:w-auto px-4 py-4 sm:px-8 sm:py-6 text-base sm:text-lg"
                    >
                        Create Your Wallet
                    </Button>
                </div>
            )}

            {checkIfUserHasWallet?.has_wallet && walletInformation?.wallet && (
                <>
                    <div className="mb-4 sm:mb-8 flex items-center justify-between">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                            Welcome back, {extractFirstName(session?.user?.fullName ?? '')} 👋
                        </h2>
                    </div>

                    <div className="grid gap-4 sm:gap-8 md:grid-cols-2">
                        <Card className="md:col-span-2">
                            <CardHeader className="space-y-2 p-4 sm:p-6">
                                <CardTitle className="text-xl sm:text-2xl">Wallet Balance</CardTitle>
                                <CardDescription>Track your current savings and account details</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6">
                                <div className="rounded-lg p-4 sm:p-6 text-brand-color">
                                    <p className="mb-1 sm:mb-2 text-base sm:text-lg opacity-90">Available Balance</p>
                                    <p className="text-3xl sm:text-4xl font-bold">₦{walletInformation.wallet?.balance ? Number(walletInformation.wallet.balance).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}</p>
                                </div>

                                <div className="grid gap-3 sm:gap-2 rounded-lg bg-white p-4">
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                        <span className="font-medium">Account Number</span>
                                        <span className="font-semibold">{walletInformation.wallet?.account_number ?? 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                        <span className="font-medium">Bank Name</span>
                                        <span className="font-semibold">{walletInformation.wallet?.bank?.name ?? 'N/A'}</span>
                                    </div>
                                </div>

                                <AppButton
                                    disabled={true}
                                    className="mt-2 sm:mt-4 w-full md:w-auto"
                                >
                                    Withdraw Money
                                </AppButton>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2">
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                    Recent Activity
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-normal">Last 30 days</span>
                                </CardTitle>
                                <CardDescription>Track your recent transactions</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex min-h-[150px] sm:min-h-[200px] items-center justify-center rounded-lg bg-gray-50 p-4 sm:p-8 text-gray-500">
                                    <p>No transactions to display</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
}
