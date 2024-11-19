import { useMbisContext } from "@/old-pages/hooks/useContextProvider";
import Step1 from "@/old-pages/UI/Step1";
import Step2 from "@/old-pages/UI/Step2";
import Step3 from "@/old-pages/UI/Step3";
import React, { useEffect } from "react";

// Enum to define the steps
export enum PaymentPageSteps {
    ONBOARDING = 'step1',
    PACKAGE_SELECTION = 'step2',
    EXTRA_INFORMATION = 'step3'
}

// Interface to define the props for the PaymentPage component
interface PaymentPageProps {
    steps?: PaymentPageSteps; // The 'steps' should match the enum values
}

const PaymentPage: React.FC<PaymentPageProps> = ({ steps }) => {
    const { dispatch } = useMbisContext();

    const detectedStep = steps || PaymentPageSteps.ONBOARDING;

    useEffect(() => {
        // Dispatch only the step string to update the state
        dispatch({ type: 'setSelectedComponent', payload: detectedStep });
    }, [detectedStep, dispatch]);

    // Render the appropriate component based on the detected step
    switch (detectedStep) {
        case PaymentPageSteps.ONBOARDING:
            return <Step1 />;
        case PaymentPageSteps.PACKAGE_SELECTION:
            return <Step2 />;
        case PaymentPageSteps.EXTRA_INFORMATION:
            return <Step3 />;
        default:
            return <Step1 />; // Fallback to Step1 if the step is invalid
    }
};

export default PaymentPage;
