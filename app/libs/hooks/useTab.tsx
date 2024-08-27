import { useRef, RefObject } from 'react';
import { useMbisContext } from './useContextProvider';

export const useTab = () => {
  const { dispatch, state: { activeBtnServiceId, showPackage } } = useMbisContext();

  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);
  const btn3Ref = useRef<HTMLButtonElement>(null);
  const btn4Ref = useRef<HTMLButtonElement>(null);

  const handleButtonClick = (buttonRef: RefObject<HTMLButtonElement>) => () => {
    if (showPackage && activeBtnServiceId !== buttonRef.current) {
      if (buttonRef.current) {
        dispatch({ type: 'setshowpackage', payload: buttonRef.current });
        dispatch({ type: 'setactiveBtnService', payload: buttonRef.current });
      }
    }
  };

  return { handleButtonClick, btn1Ref, btn2Ref, btn3Ref, btn4Ref, showPackage, activeBtnServiceId };
};
