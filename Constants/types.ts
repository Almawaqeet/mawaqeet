//todo: change this later. its here for props
export interface Package {
  id?: string;
  package_type: 'hajj' | 'umrah';
  description: string;
  name: string;
  price: Array<PackagePrice>;
  umrah_batches?: Array<UmrahBatch>;
  category_descriptions: Array<CategoryDescription>;
  slug?: string;
  is_active?: boolean;
  expiry_date: string;
  created_at?: string;
  updated_at?: string;
  reason_for_deactivation?: string;
  deactivated_at?: string;
}


export interface UmrahBatch {
  id?: string;
  batch_status: string;
  batch_start_date: string;
}

export interface CategoryDescription {
  id?: string;
  category: string;
  description: string;
}

export interface PackagePrice {
  id?: string;
  price: string;
  category: string;
  weekly_installment_fee?: string;
  monthly_installment_fee?: string;
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
