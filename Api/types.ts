export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}



export interface CheckIfEmailAddressExistResponse {
    exists: boolean;
}


export interface OnboardingPaymentResponse {
    registration_fee: number;
}


export interface OnboardingCreateUserResponse {
    message: string;
    payload: {
        websocket_id: string;
        onboarding_id: number;
    }
}


export interface OnboardingCreateUserRequest {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    next_of_kin_name: string;
    next_of_kin_phone_number: string;
    next_of_kin_address: string;
}


export interface OnboardingInitiatePaymentRequest {
    onboarding_id: number;
}

export interface OnboardingInitiatePaymentResponse {
    status: boolean;
    message: string;
    data: {
        authorization_url: string;
        access_code: string;
        reference: string;
    } | null;
}


export interface OnboardingVerifyPaymentResponse {
    message: string;
    receipt_url: string;
    status: string;
}


export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    refresh: string;
    access: string;
    user_id: number;
    email: string;
    account_type: "ADMIN" | "USER";
}




export interface SimpleOnboardingUser {
    email: string;
    first_name: string;
    last_name: string;
    onboarding_fee_payment_check?: boolean;
    is_completed?: boolean;
    date_created?: string;
}



export interface User {
    email: string;
    profile?: {
        first_name?: string;
        last_name?: string;
        phone_number?: string;
        address?: string;
    } | null;
}
