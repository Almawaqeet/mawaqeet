import { Routes } from "./types";

export const routes = {
    auth: {
        login: '/auth/login/',
        register: '/auth/register/',
        sendOtp: '/auth/forgot-password/',
        verifyOtp: '/auth/verify-otp/',
        changePassword: '/auth/reset-password/',
    },

    onboarding: {
        checkIfEmailAddressExist: 'onboarding/customer/check-if-email-address-exist/',
        initiatePayment: 'onboarding/customer/onboarding-payment/',
        createUser: 'onboarding/customer/',
        getOnboardingPaymentAmount: 'onboarding/customer/onboarding-payment/',
        verifyPayment: 'onboarding/customer/verify-onboarding-payment/:reference/',
        getOnboardingUsers: 'core/admin/onboarding-admin/',
        getRecentOnboardingUsers: 'core/admin/recent-onboarding-admin/',
    },

    wallet: {
        checkIfUserHasWallet: "core/customer/check-user-wallet/",
        checkWalletInformation: "payments/customer/wallet/",
        createWallet: "payments/customer/wallet/",
        editWallet: "payments/customer/wallet/",
        getBanksOnWalletCreation: "payments/customer/get-banks/",
        verifyWalletAccountNumber: "payments/customer/verify-account-number/"
    },

    users: {
        getUsers: 'core/admin/user-admin/',
},

    packages: {
        showAllActivePackages: 'core/customer/show-all-active-packages/',
        showAllInactivePackages: 'core/admin/get-inactive-packages/',
        createPackage: 'core/admin/create-package/',
        showAllActivePackagesById: (editId: string) => `core/admin/get-active-packages/${editId}`
    },

    package: {
        viewPackage: (packageId: string) => `core/customer/view-package/${packageId}/`,
        preBookPackage: (packageId: string) => `onboarding/customer/prebook-package/${packageId}/`,
    },


    bookings: {
        viewUserBookings: 'core/customer/view-user-bookings/',
        initiateBooking: (packageId: string) => `core/customer/initiate-booking/${packageId}/`,
        viewAndEditBooking: (bookingId: string) => `core/customer/view-edit-booking/${bookingId}/`,
        initiateBookingPayment: (bookingId: string) => `core/customer/make-booking-payment/${bookingId}/`,
        verifyBookingPayment: `core/customer/verify-booking-payment/:reference/`,
        cancelBooking: (bookingId: string) => `core/customer/cancel-booking/${bookingId}/`
    }
} 


// export type ExtractAllRouteKeyValues<T> = T extends string 
// ? T : 
// T extends (...args: any[]) => infer R
//  ? R extends string ? R : never 

// //  recursive call that checks and extract all key values from routes
//  : { [K in keyof T]: ExtractAllRouteKeyValues<T[K]> }[keyof T];


/**
 * Generates a base query key from a route string by converting it to PascalCase
 *
 * @param route - The API route string to convert (e.g. 'core/admin/user-admin/')
 * @returns A PascalCase string suitable for use as a React Query key (e.g. 'CoreAdminUserAdmin')
 *
 * @example
 * generateBaseQueryKeyFromRoute('core/admin/user-admin/') // Returns 'CoreAdminUserAdmin'
 * generateBaseQueryKeyFromRoute('auth/login/') // Returns 'AuthLogin'
 */
export const generateBaseQueryKeyFromRoute = (route: string) => {
    const segments = route.split('/').filter(Boolean);
    const pascalCaseKey = segments
        .map(segment => segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('')
        )
        .join('_');

    return pascalCaseKey;
}

