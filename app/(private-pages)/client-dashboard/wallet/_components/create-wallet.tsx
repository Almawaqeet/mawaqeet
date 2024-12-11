"use client";

import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import AppDialogBox from "@/components/reusables/AppDialogBox";
import { useAppToast } from '@/components/reusables/AppToast';
import AppButton from "@/components/reusables/AppButton";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEYS } from "@/constants/local-storage-keys";
import { CLIENT_ROUTES } from "@/lib/routes";
import { useQueryClient } from "@tanstack/react-query";
import { generateBaseQueryKeyFromRoute, routes } from "@/api/routes";
import { useCheckIfUserHasAWallet, useCreateWallet, useGetBankList, useVerifyWalletAccountNumber } from "@/api/services/wallet";

const validationSchema = Yup.object({
    account_number: Yup.string()
        .required("Account number is required"),
    bank: Yup.string()
        .required("Bank is required")
});

export default function CreateWallet() {
    const { data: checkIfUserHasWallet } = useCheckIfUserHasAWallet();
    const { mutate: createWallet, isPending: isCreatingWallet } = useCreateWallet();
    const { data: bankList, isLoading: isBankListLoading } = useGetBankList();
    const { mutate: verifyWalletAccountNumber, isPending: isVerifyingWalletAccountNumber } = useVerifyWalletAccountNumber();
    const [accountName, setAccountName] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { showToast } = useAppToast();
    const router = useRouter();
    const queryClient = useQueryClient()



    useEffect(() => {
        if (checkIfUserHasWallet?.has_wallet) {
            router.push(CLIENT_ROUTES.PrivatePages.clientDashboard.wallet.viewWallet)
        }
    }, [checkIfUserHasWallet]);

    const formik = useFormik({
        initialValues: {
            account_number: "",
            bank: ""
        },
        validationSchema,
        onSubmit: (values) => {
            const selectedBank = bankList?.banks?.find(bank => bank.bank_code === values.bank);
            if (!selectedBank) {
                formik.setFieldError('bank', 'Invalid bank selected');
                showToast({
                    title: "Error",
                    description: "Invalid bank selected",
                    variant: "destructive"
                });
                return;
            }

            verifyWalletAccountNumber(
                {
                    account_number: values.account_number,
                    bank_code: selectedBank.bank_code
                },
                {
                    onSuccess: (response) => {
                        if ('data' in response && response.data?.account_name) {
                            setAccountName(response.data.account_name);
                            setDialogOpen(true);
                        } else {
                            formik.setFieldError('account_number', 'Invalid account number');
                            showToast({
                                title: "Error",
                                description: "Invalid account number",
                                variant: "destructive"
                            });
                        }
                    },
                    onError: (error) => {
                        formik.setFieldError('account_number', 'Error verifying account number');
                        showToast({
                            title: "Error",
                            description: "Error verifying account number",
                            variant: "destructive"
                        });
                        console.error("Error verifying account number:", error);
                    }
                }
            );
        }
    });

    const handleConfirm = () => {
        if (accountName) {
            const selectedBank = bankList?.banks?.find(bank => bank.bank_code === formik.values.bank);
            if (selectedBank) {
                createWallet(
                    {
                        account_number: formik.values.account_number,
                        bank: {
                            bank_code: selectedBank.bank_code,
                            name: selectedBank.name
                        }
                    },
                    {
                        onSuccess: (response) => {
                            if (response) {
                                if (typeof window !== undefined) {
                                    localStorage.setItem(LOCAL_STORAGE_KEYS.USER_WALLET_STATUS, 'found');
                                }
                                showToast({
                                    title: "Success",
                                    description: "Wallet created successfully",
                                    variant: "default"
                                });
                                queryClient.invalidateQueries({
                                    queryKey: [
                                        generateBaseQueryKeyFromRoute(routes.wallet.checkIfUserHasWallet)
                                    ]
                                });
                                queryClient.invalidateQueries({
                                    queryKey: [
                                        generateBaseQueryKeyFromRoute(routes.wallet.checkWalletInformation),
                                    ]
                                });

                                router.push(CLIENT_ROUTES.PrivatePages.clientDashboard.wallet.viewWallet);
                            }
                        },
                        onError: (error) => {
                            showToast({
                                title: "Error",
                                description: "Error creating wallet",
                                variant: "destructive"
                            });
                            console.error("Error creating wallet:", error);
                        }
                    }
                );
            }
        }
        setDialogOpen(false);
    };

    return (
        <div className="max-w-2xl mx-auto pt-16">
            <Card className="bg-white shadow-lg rounded-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Create Your Wallet</CardTitle>
                    <CardDescription className="text-gray-600">Set up your bank account details</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="account_number" className="font-medium">Account Number</Label>
                            <Input
                                id="account_number"
                                type="text"
                                placeholder="Enter your account number"
                                {...formik.getFieldProps('account_number')}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {formik.touched.account_number && formik.errors.account_number && (
                                <div className="text-red-500 text-sm">{formik.errors.account_number}</div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bank" className="font-medium">Bank</Label>
                            {isBankListLoading ? (
                                <div>Loading banks...</div>
                            ) : (
                                <Select
                                    onValueChange={(value) => formik.setFieldValue('bank', value)}
                                    value={formik.values.bank}
                                >
                                    <SelectTrigger className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                                        <SelectValue placeholder="Select a bank" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bankList?.banks?.map((bank) => (
                                            <SelectItem key={bank?.bank_code} value={bank?.bank_code as string}>
                                                {bank?.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            {formik.touched.bank && formik.errors.bank && (
                                <div className="text-red-500 text-sm">{formik.errors.bank}</div>
                            )}
                        </div>

                        {accountName && (
                            <div className="text-green-500 text-sm">
                                Account Name: {accountName}
                            </div>
                        )}

                        <AppButton
                            variant="primary"
                            type="submit"
                            className="w-full mt-4"
                            loading={isCreatingWallet || isVerifyingWalletAccountNumber}
                        >
                            {isCreatingWallet || isVerifyingWalletAccountNumber ? 'Creating...' : 'Create Wallet'}
                        </AppButton>
                    </form>
                </CardContent>
            </Card>

            <AppDialogBox
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title="Confirm Account Name"
                description={`Account Name: ${accountName}. Do you want to proceed?`}
                onConfirm={handleConfirm}
                onCancel={() => setDialogOpen(false)}
            />
        </div>
    );
}
