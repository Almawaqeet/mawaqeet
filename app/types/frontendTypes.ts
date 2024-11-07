export interface NavItem {
  id: number;
  content: string;
}

export interface DropdownItem {
  id: number;
  content: string;
}

export interface BrandItem {
  id: number;
  brand: string | null;
}

export interface DispatchAction {
  type: string;
  payload?: any;
}

export interface LogoProps {}

export interface DesktopNavLinksProps {
  navItems: NavItem[] | null;
  activeIndex: number;
  dispatch: (action: DispatchAction) => void;
  dropdown: boolean;
  arrow: boolean;
  dropdownItems: DropdownItem[] | null;
  subNavActiveIndex: number;
}

export interface DropdownMenuProps {
  dropdownItems: DropdownItem[] | null;
  subNavActiveIndex: number;
  dispatch: (action: DispatchAction) => void;
  dropdown: boolean;
}

export interface MobileNavMenuProps {
  isActive: boolean;
  navItems: NavItem[] | null;
  activeIndex: number;
  dispatch: (action: DispatchAction) => void;
  dropdownmobile: boolean;
  arrow: boolean;
  dropdownItems: DropdownItem[] | null;
  subNavActiveIndex: number;
  navbtn: boolean;
}

export interface MobileNavListProps {
  navItems: NavItem[] | null;
  activeIndex: number;
  dispatch: (action: DispatchAction) => void;
  dropdownmobile: boolean;
  arrow: boolean;
  dropdownItems: DropdownItem[] | null;
  subNavActiveIndex: number;
  navbtn: boolean;
}

export interface MobileNavItemProps {
  item: NavItem;
  index: number;
  activeIndex: number;
  dispatch: (action: DispatchAction) => void;
  dropdownmobile: boolean;
  arrow: boolean;
  dropdownItems: DropdownItem[] | null;
  subNavActiveIndex: number;
}

export interface MobileDropdownContentProps {
  item: NavItem;
  arrow: boolean;
  dropdownmobile: boolean;
  dropdownItems: DropdownItem[] | null;
  subNavActiveIndex: number;
  dispatch: (action: DispatchAction) => void;
}
