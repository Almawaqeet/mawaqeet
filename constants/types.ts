import { StaticImageData } from "next/image";

//todo: change this later. its here for props
export interface Package {
  id?: string;
  package_type: 'hajj' | 'umrah';
  description: string;
  name: string;
  price: Array<PackagePrice>;
  umrah_batch?: Array<UmrahBatch>;
  category_description: Array<CategoryDescription>;
  slug?: string;
  is_active?: boolean;
  expiry_date: string;
  created_at?: string;
  updated_at?: string;
  reason_for_deactivation?: string | null;
  deactivated_at?: string | null;
}
export interface UserBookingListView {
  id: string;
  expiry_date: string;
  created_at: string;
  selected_price: {
    id: string;
    package: string;
    price: string;
    category: string;
    weekly_installment_fee: string;
    monthly_installment_fee: string;
  };
  payment_plan: "full" | "installment";
  status: "no_payment" | "partial_payment" | "paid";
  package: {
    id: string;
    price: string;
    category_description: string;
    umrah_batch: string;
    description: string;
    slug: string;
    name: string;
    package_type: "hajj" | "umrah";
    is_active: boolean;
    expiry_date: string;
    created_at: string;
    updated_at: string;
    reason_for_deactivation: string;
    deactivated_at: string;
  };
  balance: string;
};


export interface UmrahBatch {
  id?: string;
  batch_status: string;
  batch_start_date: string;
  package?: string;
  batch_name?: string
}

export interface CategoryDescription {
  id?: string;
  category: string;
  description: string;
  package?: string;
}

export interface PackagePrice {
  id?: string;
  price: string;
  category: string;
  weekly_installment_fee?: string;
  monthly_installment_fee?: string;
  package?: string;
}



export type SegregatedPackage = {
    id?: string;
    type: 'hajj' | 'umrah';
    tier: string;
    cohort: string;
    price: string;
    paymentPlan: string;
    features: string[];
  }

  interface Profile {
    profile_1: string;
    profile_2: string;
    profile_3: string;
    profile_4?: string;
    profile_5?: string;
  }

  export interface SegregatedTeam {
    id: string;
    company: string;
    image: StaticImageData;
    imageProfile: StaticImageData
    fullname: string;
    post: string;
    slug?: string
    personality?: string;
    view_profile: string;
    profile: [...Array<Profile>]
  }
