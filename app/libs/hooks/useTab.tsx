import { RefObject, useEffect, useRef } from "react";
import { useMbisContext } from "./useContextProvider";

export const useTab = () => {
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);
  const btn3Ref = useRef<HTMLButtonElement>(null);
  const btn4Ref = useRef<HTMLButtonElement>(null);

  const { dispatch, state: { activeBtnServiceId, showPackage } } = useMbisContext();


  const handleButtonClick = (buttonRef: RefObject<HTMLButtonElement>) => () => {
    if (showPackage !== buttonRef.current && activeBtnServiceId !== buttonRef.current) {
      dispatch({ type: 'setshowpackage', payload: buttonRef });
      dispatch({ type: 'setactiveBtnService', payload: buttonRef });
    }
  };

  return { handleButtonClick, btn1Ref, btn2Ref, btn3Ref, btn4Ref, showPackage, activeBtnServiceId, dispatch };
};
