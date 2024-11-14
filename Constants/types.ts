//todo: change this later. its here for props
interface Package {
  id: string;
  price: string;
  category_description: string;
  umrah_batch: string;
  description: string;
  slug: string;
  name: string;
  package_type: 'hajj' | 'umrah';
  is_active: boolean;
  expiry_date?: string;
  created_at: string;
  updated_at: string;
  reason_for_deactivation?: string;
  deactivated_at?: string;
}
