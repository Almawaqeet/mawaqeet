'use client';

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import AppButton from '@/components/reusables/AppButton'
import AppModal from '@/components/reusables/AppModal'
import SuccessLottie from '@/components/reusables/SuccessLottie'
import LoadingLottie from '@/components/reusables/LoadingLottie'
import { usePaystack } from '@/third-party/Paystack'
import { convertToKobo } from '@/lib/utils'
import { useAppToast } from '@/components/reusables/AppToast'
import { CLIENT_ROUTES } from '@/lib/routes'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGetBookingInformation, useInitiateBookingPayment, useVerifyBookingPayment } from '@/api/services/booking'
import { useSession } from 'next-auth/react'
import { Skeleton } from '@/components/ui/skeleton'
import { useCheckWalletInformation } from '@/api/services/wallet'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CreditCard, Wallet, Calendar, Package2, Clock, Layers } from 'lucide-react'

interface BookingPaymentProps {
  id: string;
}

export function BookingPayment({ id }: BookingPaymentProps) {
    const [reference, setReference] = useState<string>("")
    const [paymentAmount, setPaymentAmount] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('card')
    const router = useRouter()
    const { showToast } = useAppToast()

    const { data: bookingData, isLoading: isLoadingBooking } = useGetBookingInformation(id)
    const { data: walletInformation, isLoading: walletInformationLoading } = useCheckWalletInformation()
    const { mutate: initiatePayment, isPending: isInitiatingPayment } = useInitiateBookingPayment(id)
    const { data: verifyPaymentData, isPending: isVerifyingPayment } = useVerifyBookingPayment(reference)
    const { data: session } = useSession();

    const booking = bookingData?.booking
    const totalAmount = Number(booking?.balance) ?? 0
    const amountPaid = Number(booking?.total_amount_paid) ?? 0
    const remainingAmount = totalAmount - amountPaid
    const isFullPayment = booking?.payment_plan?.toLowerCase() === 'full_payment'
    const walletBalance = Number(walletInformation?.wallet?.balance ?? 0)

    const handlePayment = () => {
        const amount = parseFloat(paymentAmount)

        if (isNaN(amount) || amount <= 0) {
            showToast({
                title: "Error",
                description: "Please enter a valid amount",
                variant: "destructive"
            })
            return
        }

        if (isFullPayment && amount < remainingAmount) {
            showToast({
                title: "Error",
                description: "Full payment plan requires complete payment of remaining balance",
                variant: "destructive"
            })
            return
        }

        if (amount > remainingAmount) {
            showToast({
                title: "Error",
                description: "Amount cannot exceed remaining balance",
                variant: "destructive"
            })
            return
        }

        if (paymentMethod === 'wallet' && amount > walletBalance) {
            showToast({
                title: "Error",
                description: "Insufficient wallet balance",
                variant: "destructive"
            })
            return
        }

        initiatePayment(
            { booking_id: id, amount, payment_method: paymentMethod },
            {
                onSuccess: (data) => {
                    if (paymentMethod === 'card' && data?.data?.reference && data?.data?.authorization_url && session?.user?.email) {
                        const { initializePayment } = usePaystack({
                            email: session?.user?.email as string,
                            amount: convertToKobo(amount),
                            reference: data?.data?.reference,
                            onSuccess: () => {
                                setReference(data.data?.reference ?? '')
                            },
                            onClose: () => {}
                        })
                        initializePayment()
                    } else if (paymentMethod === 'wallet') {
                        setReference(data.data?.reference ?? '')
                    }
                },
                onError: (error: any) => {
                    const errorMessage = error?.response?.data?.message || error?.message || "An error occurred while initiating payment"
                    showToast({
                        title: "Error",
                        description: errorMessage,
                        variant: "destructive",
                        action: {
                            label: "Contact Support",
                            onClick: () => router.push(CLIENT_ROUTES.PublicPages.contact)
                        }
                    })
                }
            }
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl mx-auto mt-8"
        >
            <AppModal
                open={isVerifyingPayment && reference !== ''}
                title="Please hang on while we verify your payment"
            >
                <div className="flex flex-col items-center justify-center">
                    <LoadingLottie />
                </div>
            </AppModal>

            <AppModal
                open={verifyPaymentData?.status === 'success'}
                title="Payment Successful"
            >
                <div className="flex flex-col items-center justify-center gap-4">
                    <SuccessLottie />
                    <p className="text-center text-gray-700 text-base font-medium">
                        {verifyPaymentData?.message}
                    </p>
                    {verifyPaymentData?.receipt_url && (
                        <a
                            href={verifyPaymentData.receipt_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-color hover:underline text-sm font-medium transition-colors duration-200 ease-in-out"
                        >
                            Download Receipt
                        </a>
                    )}
                </div>
            </AppModal>

            {isLoadingBooking || walletInformationLoading ? (
                <div className="space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <Package2 className="w-6 h-6 text-brand-color" />
                                Booking Details
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b hover:bg-gray-50 px-2 rounded transition-colors">
                                    <span className="text-gray-600 flex items-center gap-2">
                                        <Package2 className="w-4 h-4" />
                                        Package Name
                                    </span>
                                    <span className="font-medium">{booking?.package?.name}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b hover:bg-gray-50 px-2 rounded transition-colors">
                                    <span className="text-gray-600 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Date Initiated
                                    </span>
                                    <span className="font-medium">{new Date(booking?.created_at ?? '').toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b hover:bg-gray-50 px-2 rounded transition-colors">
                                    <span className="text-gray-600 flex items-center gap-2">
                                        <Layers className="w-4 h-4" />
                                        Plan Category
                                    </span>
                                    <span className="font-medium">{(booking?.payment_plan?.toUpperCase() ?? '')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <CreditCard className="w-6 h-6 text-brand-color" />
                                Payment Information
                            </h2>
                            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-100 shadow-sm">
                                <div className="flex justify-between mb-4">
                                    <span className="text-gray-600 font-medium">Total Amount</span>
                                    <span className="font-semibold text-lg">₦{totalAmount?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500 mb-4">
                                    <span>Amount Paid</span>
                                    <span className="font-medium">₦{amountPaid?.toLocaleString()}</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between font-bold text-brand-color">
                                    <span>Remaining Balance</span>
                                    <span>₦{remainingAmount?.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="space-y-4">
                                    <Label className="text-lg">Select Payment Method</Label>
                                    <RadioGroup
                                        value={paymentMethod}
                                        onValueChange={setPaymentMethod}
                                        className="flex flex-col space-y-3"
                                    >
                                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-brand-color hover:bg-gray-50 transition-all cursor-pointer">
                                            <RadioGroupItem value="card" id="card" />
                                            <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                                                <CreditCard className="w-5 h-5 text-brand-color" />
                                                Pay with Card
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-brand-color hover:bg-gray-50 transition-all cursor-pointer">
                                            <RadioGroupItem value="wallet" id="wallet" />
                                            <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer">
                                                <Wallet className="w-5 h-5 text-brand-color" />
                                                Pay from Wallet
                                                <span className="text-sm text-gray-500">
                                                    (Balance: ₦{walletBalance?.toLocaleString()})
                                                </span>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="amount" className="text-gray-700 flex items-center gap-2">
                                        Enter Payment Amount
                                        {isFullPayment && (
                                            <span className="text-red-500 text-sm">
                                                (Full payment of ₦{remainingAmount?.toLocaleString()} required)
                                            </span>
                                        )}
                                    </Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder={isFullPayment ? `Enter ₦${remainingAmount}` : "Enter amount to pay"}
                                        value={paymentAmount}
                                        onChange={(e) => setPaymentAmount(e.target.value)}
                                        className="h-12 text-lg"
                                    />
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="pt-2"
                                >
                                    <AppButton
                                        variant="primary"
                                        className="w-full h-12 text-base font-medium"
                                        onClick={handlePayment}
                                        disabled={isInitiatingPayment || !paymentAmount}
                                        loading={isInitiatingPayment}
                                    >
                                        {isInitiatingPayment ? 'Processing...' : 'Pay Now'}
                                    </AppButton>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    )
}
