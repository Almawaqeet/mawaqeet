export const CLIENT_ROUTES = {
    PublicPages: {
        home: '/',
        onboarding: {
            stepOne: '/onboarding/new-user/step-1',
            stepTwo: '/onboarding/new-user/step-2',
            stepThree: '/onboarding/new-user/step-3'
        },
        packages: {
            index: '/packages',
            details: '/packages/:id'
        },
        auth: {
            login: '/auth/login',
            forgotPassword: '/auth/forgot-password'
        }
    },
    PrivatePages: {
        clientDashboard: {
            home: '/client-dashboard'
        },
        adminDashboard: {
            home: '/admin-dashboard'
        }
    }
}
