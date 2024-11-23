//todo: change this later. its here for props
interface Package {
  id?: string;
  package_type: 'hajj' | 'umrah';
  description: string;
  name: string;
  package_prices: Array<PackagePrice>;
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


interface UmrahBatch {
  batch_status: string;
  batch_start_date: string;
}

interface CategoryDescription {
  category: string;
  description: string;
}

interface PackagePrice {
  price: string;
  category: string;
}
