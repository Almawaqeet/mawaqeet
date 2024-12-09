export const CLIENT_ROUTES = {
    PublicPages: {
        home: '/',
        onboarding: {
            newUser: '/onboarding/new-user/',
            stepOne: '/onboarding/new-user/step-1',
            stepTwo: '/onboarding/new-user/step-2',
            stepThree: '/onboarding/new-user/step-3'
        },
        packages: {
            index: '/packages',
            details: (packageId: string) => `/packages/${packageId}`
        },
        auth: {
            login: '/auth/login',
            forgotPassword: '/auth/forgot-password',
            password: {
                stepOne: '/password/step-1',
                stepTwo: '/password/step-2',
                stepThree: '/password/step-3'
            }
        },
        contact: '/contact',
        about: {
            index: '/about',
            details: (teamId: string) => `/about/profile/${teamId}`
        }
    },
    PrivatePages: {
        clientDashboard: {
            home: '/client-dashboard',
            overview: '/client-dashboard/overview',
            customers: '/client-dashboard/customer',
            team: '/client-dashboard/onboarding',
            products: '/client-dashboard/product',
            packages: '/client-dashboard/package',
            payment: '/client-dashboard/payment',
            profile: '/client-dashboard/profile'
        },
        adminDashboard: {
            home: '/admin-dashboard',
            overview: '/admin-dashboard/overview',
            customers: '/admin-dashboard/customer',
            team: '/admin-dashboard/onboarding',
            products: '/admin-dashboard/product',
            packages: '/admin-dashboard/package',
            payment: '/admin-dashboard/payment',
            profile: '/admin-dashboard/profile'
        }
    }
}
