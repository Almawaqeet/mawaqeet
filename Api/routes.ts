export const routes = {
    login: '/auth/login',
    register: '/auth/register',
    forgottenPassword: '/auth/forgotten-password',


    onboarding: {
        checkIfEmailAddressExist: 'onboarding/customer/check-if-email-address-exist/',
        initiatePayment: 'onboarding/customer/onboarding-payment/',
        createUser: 'onboarding/customer/',
        getOnboardingPaymentAmount: 'onboarding/customer/onboarding-payment/',
    },

    packages: {
        showAllActivePackages: 'core/customer/show-all-active-packages/',
    },


}
