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
