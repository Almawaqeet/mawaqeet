import { Package, PackagePrice } from "@/constants/types";

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface CustomApiErrorResponse {
    message?: string
}

export interface CustomApiResponse {
    message?: string
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


export interface OtpPasswordRequest {
    email: string;
    otp: string;
}

export interface SendOtpRequest {
    email: string;
}

export interface SendOtpResponse {
    message: string;
}

export interface VerifyOtpRequest {
    email: string;
    otp: string;
}

export interface VerifyOtpResponse {
    message: string;
}

export interface ChangePasswordRequest {
    email: string;
    password: string;
}

export interface ChangePasswordResponse {
    message: string;
}

export interface LoginResponse {
    refresh: string;
    access: string;
    user_id: number;
    email: string;
    account_type: "ADMIN" | "USER";
}

export interface PreBookPackageRequest {
    email: string;
    category: string;
}

export interface PreBookPackageResponse {
    message: string;
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


export interface CheckIfUserHasAWalletResponse {
    message?: string;
    has_wallet?: boolean;
}


export interface CheckWalletInformationResponse {
    wallet?: {
        balance?: string;
        account_number?: string;
        bank?: {
            bank_code?: string;
            name?: string;
        };
        is_verified?: boolean;
    };
}

export interface CreateAndEditWalletRequest {
    account_number?: string;
    bank?: {
        bank_code?: string;
        name?: string;
    };
}


export interface BankListResponse {
    banks?: {
        name?: string;
        bank_code?: string;
    }[];
}


export interface VerifyWalletAccountNumberRequest {
    account_number: string;
    bank_code: string;
}


export interface VerifyWalletAccountNumberResponse {
    data?: {
        account_name?: string;
    };
}

export interface VerifyWalletAccountNumberErrorResponse {
    message?: string
}


export interface SimpleBookingResponse {
    bookings: {
        id?: string;
        expiry_date?: string;
        created_at?: string;
        selected_price?: PackagePrice;
        payment_plan?: string;
        status?: string;
        package?: Package;
        balance?: string;
    }[]
}


export interface InitiateBookingRequest {
    payment_plan: string,
    category: string
}
