import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './package-tables/columns';
import { Package } from '@/constants/types';

type ProductListingPage = {
  activePackages: Package[];
  inactivePackages: Package[];
};

export default async function ProductListingPage({
  activePackages,
  inactivePackages
}: ProductListingPage) {

  // Use the actual packages data passed as props instead of mock data
  const packages = activePackages ?? [];
  const totalItems = packages?.length ?? 0;

  return (
    <ProductTable
      columns={columns}
      data={packages}
      totalItems={totalItems}
    />
  );
}
