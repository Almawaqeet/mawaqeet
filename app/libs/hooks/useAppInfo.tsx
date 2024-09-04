import { useEffect } from 'react';
import { useMbisContext } from '../../libs/hooks/useContextProvider';
import Step1 from '../../UI/Step1';
import Step2 from '../../UI/Step2';
import Step3 from '../../UI/Step3';
import { appForm } from '../../contents/payment'; 

const useAppInfo = () => {
    const { dispatch, state: { selectedNumber, selectedComponent } } = useMbisContext();

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
        dispatch({
            type: 'setselectedNumber',
            payload: (selectedNumber - 1 + appForm.length) % appForm.length
        });
    };

    const updateComponent = (step: number) => {
        switch (step) {
            case 0:
                dispatch({ type: 'setSelectedComponent', payload: <Step1 handleNext={handleNext} /> });
                break;
            case 1:
                dispatch({ type: 'setSelectedComponent', payload: <Step2 handleNext={handleNext} /> });
                break;
            case 2:
                dispatch({ type: 'setSelectedComponent', payload: <Step3 handleNext={handleNext} /> });
                break;
            default:
                dispatch({ type: 'setSelectedComponent', payload: <Step1 handleNext={handleNext} /> });
                break;
        }
    };

    return {
        selectedNumber,
        selectedComponent,
        handleNext,
        handlePrevious
    };
};

export default useAppInfo;
