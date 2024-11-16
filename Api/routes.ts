export const routes = {
    login: '/auth/login',
    register: '/auth/register',
    forgottenPassword: '/auth/forgotten-password',


    onboarding: {
        checkIfEmailAddressExist: 'onboarding/customer/check-if-email-address-exist/',
        initiatePayment: 'onboarding/customer/onboarding-payment/',
        getOnboardingPaymentAmount: 'onboarding/customer/onboarding-payment/',
    }
}
