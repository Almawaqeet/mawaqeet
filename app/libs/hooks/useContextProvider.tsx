import { navbar } from '@/app/contents/navbar';
import React, {
  useReducer,
  createContext,
  ReactNode,
  RefObject,
  useContext,
} from 'react';

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
  activeBtnServiceId: RefObject<HTMLButtonElement> | null;
  showPackage: RefObject<HTMLButtonElement> | null;
  isLoading: boolean;
  isSelected: boolean | null;
  selectedNumber: number;
  selectedComponent: ReactNode;
  openModal: boolean;
  openPackage: boolean | number;
};

type Action =
  | { type: 'togglenav' }
  | { type: 'setSelected'; payload: boolean | null }
  | { type: 'togglenavbtn' }
  | { type: 'toggledropdown'; payload: boolean }
  | { type: 'toggledropdownmobile'; payload: boolean }
  | { type: 'togglearrow'; payload: boolean }
  | { type: 'setshowpackage'; payload: RefObject<HTMLButtonElement> }
  | { type: 'setActiveIndex'; payload: number }
  | { type: 'setSubNavActiveIndex'; payload: number }
  | { type: 'setactiveBtnService'; payload: RefObject<HTMLButtonElement> }
  | { type: 'shownav'; payload: boolean }
  | { type: 'setIsLoading'; payload: boolean }
  | { type: 'setselectedNumber'; payload: number }
  | { type: 'setSelectedComponent'; payload: ReactNode }
  | { type: 'openModal'; payload: boolean }
  | { type: 'openPackage'; payload: boolean | number };

const mbisContext = createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

const MbisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Find nav items in array
  const mainNav = navbar.find((navList) => navList.id === 'mainNav');
  const subNav = navbar.find((navList) => navList.id === 'subItems');

  const initialState: State = {
    navbar_bar: false,
    activeIndex: -1,
    subNavActiveIndex: -1,
    navItems: mainNav ? mainNav.navItems : [],
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
    selectedNumber: 0,
    selectedComponent: null,
    openModal: false,
    openPackage: false,
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'togglenav':
        return { ...state, navbar_bar: !state.navbar_bar };
      case 'setSelected':
        return { ...state, isSelected: action.payload };
      case 'togglenavbtn':
        return { ...state, navbtn: !state.navbtn };
      case 'toggledropdown':
        return {
          ...state,
          dropdown:
            action.payload !== state.dropdown
              ? action.payload
              : !state.dropdown,
        };
      case 'toggledropdownmobile':
        return {
          ...state,
          dropdownmobile:
            action.payload !== state.dropdownmobile
              ? action.payload
              : !state.dropdownmobile,
        };
      case 'togglearrow':
        return {
          ...state,
          arrow:
            action.payload !== !state.arrow ? action.payload : !state.arrow,
        };
      case 'setshowpackage':
        return { ...state, showPackage: action.payload };
      case 'setActiveIndex': {
        const newActiveIndex =
          state.activeIndex === action.payload ? -1 : action.payload;
        return { ...state, activeIndex: newActiveIndex };
      }
      case 'setSubNavActiveIndex': {
        const newSubNavActiveIndex =
          state.subNavActiveIndex === action.payload ? -1 : action.payload;
        return { ...state, subNavActiveIndex: newSubNavActiveIndex };
      }
      case 'setactiveBtnService':
        return { ...state, activeBtnServiceId: action.payload };
      case 'shownav':
        return {
          ...state,
          isActive:
            action.payload !== state.isActive
              ? action.payload
              : !state.isActive,
        };
      case 'setIsLoading':
        return { ...state, isLoading: action.payload };
      case 'setselectedNumber':
        return { ...state, selectedNumber: action.payload };
      case 'setSelectedComponent':
        return { ...state, selectedComponent: action.payload };
      case 'openModal':
        return { ...state, openModal: action.payload };
      case 'openPackage':
        return { ...state, openPackage: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <mbisContext.Provider value={{ state, dispatch }}>
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
