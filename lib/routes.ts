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
            home: '/client-dashboard',
            overview: '/client-dashboard/overview',
            customers: '/client-dashboard/customer',
            team: '/client-dashboard/team',
            products: '/client-dashboard/product',
            packages: '/client-dashboard/package',
            payment: '/client-dashboard/payment',
            profile: '/client-dashboard/profile'
        },
        adminDashboard: {
            home: '/admin-dashboard',
            overview: '/admin-dashboard/overview',
            customers: '/admin-dashboard/customer',
            team: '/admin-dashboard/team',
            products: '/admin-dashboard/product',
            packages: '/admin-dashboard/package',
            payment: '/admin-dashboard/payment',
            profile: '/admin-dashboard/profile'
        }
    }
}
