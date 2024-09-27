
import { useMbisContext } from "./useContextProvider";
import { appForm } from "@/app/contents/payment";
import { useRouter } from "next/navigation";


export const useAppInfo = () => {
    const { dispatch, state: { selectedNumber, selectedComponent } } = useMbisContext();

    const router = useRouter()

    const handleNext = () => {
        const nextStepIndex = (selectedNumber + 1) % appForm.length;
        const nextStepContent = appForm[nextStepIndex].content;
    
        // Extract the current URL path
        const currentPath = window.location.pathname;
    
        // Append the next step to the current URL path
        const newURL = `${currentPath}/${nextStepContent}`;
    
        // Push the updated URL to the browser history
        window.history.pushState(null, '', newURL);

        // router.push(`${currentPath}/${nextStepContent}`)
    
        // Update the state with the new step index
        dispatch({
            type: 'setselectedNumber',
            payload: nextStepIndex,
        });

        
    };
    


    const handlePrevious = () => {
        const currentPath = window.location.pathname;
    
        // Split the current path into an array by "/"
        const pathSegments = currentPath.split('/');
    
        // Ensure there are more than the base segments
        if (pathSegments.length > 1) {
            // Remove the last segment (the last step)
            pathSegments.pop();
    
            // Join the remaining segments to form the new path
            const newURL = pathSegments.join('/');
    
            // Push the updated URL to the browser history
            window.history.pushState(null, '', newURL);
    
            // Update the state to move back to the previous step
            const previousStepIndex = (selectedNumber - 1 + appForm.length) % appForm.length;
            dispatch({
                type: 'setselectedNumber',
                payload: previousStepIndex,
            });
        }
    };

    return { handleNext, handlePrevious, selectedNumber, selectedComponent }
}
