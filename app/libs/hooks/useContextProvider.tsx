import { navbar } from '@/app/contents/navbar';
import React, { useContext, useReducer, createContext, ReactNode } from 'react';


// Define types for the state and actions
type State = {
  navbar_bar: boolean;
  activeIndex: number;
  subNavActiveIndex: number;
  navItems: any[]; 
  dropdownItems: any[]; 
  navbtn: boolean;
  dropdown: boolean;
  dropdownmobile: boolean;
  arrow: boolean;
  isActive: boolean;
  activeBtnServiceId: HTMLButtonElement | null;
  showPackage: HTMLButtonElement | null;
  isLoading: boolean;
  isSelected: boolean | null; 
};

type Action =
  | { type: 'togglenav' }
  | { type: 'setSelected'; payload: boolean | null } 
  | { type: 'togglenavbtn' }
  | { type: 'toggledropdown' }
  | { type: 'toggledropdownmobile' }
  | { type: 'togglearrow' }
  | { type: 'setshowpackage'; payload: HTMLButtonElement | null }
  | { type: 'setActiveIndex'; payload: number }
  | { type: 'setSubNavActiveIndex'; payload: number }
  | { type: 'setactiveBtnService'; payload: HTMLButtonElement | null } 
  | { type: 'shownav' }
  | { type: 'setIsLoading'; payload: boolean };

  
// Create the context with a default value
const mbisContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

const MbisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Find nav items in array
  const mainNav = navbar.find((navList) => navList.id === 'mainNav');
  const subNav = navbar.find((navList) => navList.id === 'subItems');

  // Ensure initial state structure matches required data
  const initialState: State = {
    navbar_bar: false,
    activeIndex: -1,
    subNavActiveIndex: -1,
    navItems: mainNav ? mainNav.navItems : [], // Default to empty array if mainNav is not found
    dropdownItems: subNav ? subNav.navItems : [],
    navbtn: false,
    dropdown: false,
    dropdownmobile: false,
    arrow: false,
    isActive: false,
    activeBtnServiceId: null,
    showPackage: null,
    isLoading: false,
    isSelected: null,
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'togglenav':
        return {
          ...state,
          navbar_bar: !state.navbar_bar,
        };

      case 'setSelected':
        return {
          ...state,
          isSelected: action.payload,
        };

      case 'togglenavbtn':
        return {
          ...state,
          navbtn: !state.navbtn,
        };

      case 'toggledropdown':
        return {
          ...state,
          dropdown: !state.dropdown,
        };

      case 'toggledropdownmobile':
        return {
          ...state,
          dropdownmobile: !state.dropdownmobile,
        };

      case 'togglearrow':
        return {
          ...state,
          arrow: !state.arrow,
        };

      case 'setshowpackage':
        return {
          ...state,
          showPackage: action.payload,
        };

      case 'setActiveIndex': {
        const newActiveIndex =
          state.activeIndex === action.payload ? -1 : action.payload; // Toggle active state

        return {
          ...state,
          activeIndex: newActiveIndex,
        };
      }

      case 'setSubNavActiveIndex': {
        const newSubNavActiveIndex =
          state.subNavActiveIndex === action.payload ? -1 : action.payload; // Toggle active state
        return {
          ...state,
          subNavActiveIndex: newSubNavActiveIndex,
        };
      }

      case 'setactiveBtnService':
        return {
          ...state,
          activeBtnServiceId: action.payload,
        };

      case 'shownav':
        return {
          ...state,
          isActive: !state.isActive,
        };

      case 'setIsLoading':
        return {
          ...state,
          isLoading: action.payload,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <mbisContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </mbisContext.Provider>
  );
};

const useMbisContext = () => {
  const context = useContext(mbisContext);
  if (!context) throw new Error('mbisContext used in the wrong location');
  return context;
};

export { MbisProvider, useMbisContext };
