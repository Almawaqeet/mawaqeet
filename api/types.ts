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

export interface InitiateBookingApiResponse {
    message: string;
    booking_id: string
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

export interface InitiatePaymentResponse {
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

export interface BookingVerifyPaymentResponse {
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


export interface SimpleTransactionResponse
    {
        id?: number;
        amount_paid?: string;
        transaction_date_initiated?: string;
        transaction_status?: string;
        reference: string;
        receipt_url?: string;
        package_name?: string
    }


export interface UserTransactionResponse {
    payments: SimpleTransactionResponse[]
}


export interface BookingInformationResponse {
    booking?: {
        id?: string;
        expiry_date?: string;
        created_at?: string;
        is_active: boolean;
        selected_price?: {
            id?: string;
            package?: string;
            price?: string;
            category?: string;
            weekly_installment_fee?: string;
            monthly_installment_fee?: string;
        };
        payment_plan?: string;
        status?: string;
        package?: {
            id?: string;
            price?: {
                id?: string;
                package?: string;
                price?: string;
                category?: string;
                weekly_installment_fee?: string;
                monthly_installment_fee?: string;
            }[];
            category_description?: {
                id?: string;
                package?: string;
                category?: string;
                description?: string;
            }[];
            umrah_batch?: any[]; //TODO:change this later when payload is ready
            description?: string;
            slug?: string;
            name?: string;
            package_type?: string;
            is_active?: boolean;
            expiry_date?: string;
            created_at?: string;
            updated_at?: string;
            reason_for_deactivation?: string;
            deactivated_at?: string | null;
        };
        balance?: string;
        date_payment_completed?: string | null;
        date_initiated?: string;
        total_amount_paid?: number;
        transactions?: SimpleTransactionResponse[];
        percentage_completion?: {
            percentage_completion?: number;
        };
    };
}


export interface InitiateBookingPaymentRequest {
    amount: string
}



export interface PackageBookingListResponse {
    id?: string;
    user?: {
        email?: string;
        profile?: {
            first_name?: string;
            last_name?: string;
            phone_number?: string;
            address?: string;
        };
    };
    expiry_date?: string;
    created_at?: string;
    selected_price?: {
        id?: string;
        package?: string;
        price?: string;
        category?: string;
        weekly_installment_fee?: string;
        monthly_installment_fee?: string;
    };
    status?: string;
    balance?: string;
    payment_plan?: string;
    payment_summary?: {
        amount_to_be_paid?: number;
        amount_paid?: number;
        balance?: number;
    };
    is_active?: boolean;
}


export interface BookingFinancialSummaryResponse {
    summary?: {
        VIP?: {
            total_amount_paid?: string;
            total_amount_due?: string;
            total_bookings?: {
                completed?: string;
                installment?: string;
                no_payment?: string;
            };
        };
        DELUXE?: {
            total_amount_paid?: string;
            total_amount_due?: string;
            total_bookings?: {
                completed?: string;
                installment?: string;
                no_payment?: string;
            };
        };
        STANDARD?: {
            total_amount_paid?: string;
            total_amount_due?: string;
            total_bookings?: {
                completed?: string;
                installment?: string;
                no_payment?: string;
            };
        };
    };
}


export interface FinancialSummaryResponse {
    summary?: {
        company_balance?: {
            currency?: string;
            balance?: number;
        }[];
        company_amount_in_debt?: number;
        total_amount_due?: number;
        active_bookings?: number
    };
}


export interface PackageBookingFinancialSummaryResponse {
    summary?: {
        date?: string;
        hajj?: number;
        umrah?: number;
    }[];
}


  export interface UpcomingPackageResponse {
    hajj?: {
        id: string;
        name: string;
        expiry_date: string;
    } | null;
    umrah?: {
        id: string;
        name: string;
        expiry_date: string;
    } | null;
  }


  export interface UserFinancialSummaryResponse {
    total_spent?: number | null;
    total_remaining?: number | null;
    active_booking?: {
      package_name?: string | null;
      total_price?: number | null;
      amount_paid?: number | null;
      completion_percentage?: number | null;
    } | null;
  }
