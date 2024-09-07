import { useEffect } from "react";
import { useMbisContext } from "./useContextProvider";
import { appForm } from "@/app/contents/payment";
import Step1 from "@/app/UI/Step1";
import Step2 from "@/app/UI/Step2";
import Step3 from "@/app/UI/Step3";


 export const useAppInfo = () => {
    const { dispatch, state : { selectedNumber, selectedComponent } } = useMbisContext()

    useEffect(() => {
        updateComponent(selectedNumber);
    }, [selectedNumber]);
    
     const handleNext = () => {
        dispatch({
            type: 'setselectedNumber',
            payload: (selectedNumber + 1) % appForm.length
        });
    };
    
    const handlePrevious = () => {
        dispatch({type: 'setselectedNumber', payload:  (selectedNumber - 1 + appForm.length) % appForm.length})
    };
    
    const updateComponent = (step: number) => {
        switch (step) {
            case 0:
                dispatch({ type: 'setSelectedComponent', payload: <Step1  /> });
                break;
            case 1:
                dispatch({ type: 'setSelectedComponent', payload: <Step2  /> });
                break;
            case 2:
                dispatch({ type: 'setSelectedComponent', payload: <Step3  /> });
                break;
            default:
                dispatch({ type: 'setSelectedComponent', payload: <Step1  /> });
                break;
        }
    };

    return { handleNext, handlePrevious, selectedNumber, selectedComponent }
  }

