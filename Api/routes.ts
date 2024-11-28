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

    users: {
        getUsers: 'core/admin/user-admin/',
},

    packages: {
        showAllActivePackages: 'core/customer/show-all-active-packages/',
        showAllInactivePackages: 'core/admin/get-inactive-packages/',
        createPackage: 'core/admin/create-package/',
    },

    package: {
        viewPackage: (packageId: string) => `core/customer/view-package/${packageId}/`,
        preBookPackage: (packageId: string) => `onboarding/customer/pre-book-package/${packageId}/`,
    },

}
