import { Package } from '@/constants/types';
import { DataTable } from '@/components/ui/table/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash, Eye, Power, PowerOff } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useAppToast } from '@/components/reusables/AppToast';
import {
  useActivatePackage,
  useDeactivatePackage,
  useDeletePackage,
  useGetAllActivePackages,
  useGetAllInactivePackages,
} from '@/api/services/packages';
import { useQueryClient } from '@tanstack/react-query';
import { routes } from '@/api/routes';
import { generateBaseQueryKeyFromRoute } from '@/api/routes';
import { useQueryState, parseAsInteger } from 'nuqs';
import { DataTableSearch } from '@/components/ui/table/data-table-search';

export default function PackageTable({}: {}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<Package | null>(null);
  const [showActivateDialog, setShowActivateDialog] = useState(false);
  const [packageToActivate, setPackageToActivate] = useState<Package | null>(
    null
  );
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [packageToDeactivate, setPackageToDeactivate] =
    useState<Package | null>(null);

  const [activePageIndex, setActivePageIndex] = useQueryState(
    'activePage',
    parseAsInteger.withDefault(1)
  );

  const [inactivePageIndex, setInactivePageIndex] = useQueryState(
    'inactivePage',
    parseAsInteger.withDefault(1)
  );

  const [searchQuery, setSearchQuery] = useQueryState('search', {
    defaultValue: '',
  });

  const { data: activePackages, isLoading: isLoadingActive } =
    useGetAllActivePackages({
      package_type: undefined,
      search: searchQuery ?? '',
      page: activePageIndex,
    });

  const { data: inactivePackages, isLoading: isLoadingInactive } =
    useGetAllInactivePackages({
      package_type: undefined,
      search: searchQuery ?? '',
      page: inactivePageIndex,
    });

  const { showToast } = useAppToast();
  const queryClient = useQueryClient();

  const activatePackageMutation = useActivatePackage(
    packageToActivate?.id ?? ''
  );
  const deactivatePackageMutation = useDeactivatePackage(
    packageToDeactivate?.id ?? ''
  );
  const deletePackageMutation = useDeletePackage(packageToDelete?.id ?? '');

  const handleDeleteClick = (pkg: Package) => {
    setPackageToDelete(pkg);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!packageToDelete?.id) return;

    deletePackageMutation.mutate(packageToDelete.id, {
      onSuccess: () => {
        showToast({
          title: 'Package deleted successfully!',
          description: 'The package has been removed.',
        });
        setShowDeleteDialog(false);
        setPackageToDelete(null);
        queryClient.invalidateQueries({
          queryKey: [
            generateBaseQueryKeyFromRoute(
              routes.packages.showAllActivePackages
            ),
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [
            generateBaseQueryKeyFromRoute(
              routes.packages.showAllInactivePackages
            ),
          ],
        });
      },
    });
  };

  const handleActivateClick = (pkg: Package) => {
    setPackageToActivate(pkg);
    setShowActivateDialog(true);
  };

  const handleConfirmActivate = () => {
    if (!packageToActivate?.id) return;

    activatePackageMutation.mutate(packageToActivate.id, {
      onSuccess: () => {
        showToast({
          title: 'Package activated successfully!',
          description: 'The package is now active.',
        });
        setShowActivateDialog(false);
        setPackageToActivate(null);
        queryClient.invalidateQueries({
          queryKey: [
            generateBaseQueryKeyFromRoute(
              routes.packages.showAllActivePackages
            ),
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [
            generateBaseQueryKeyFromRoute(
              routes.packages.showAllInactivePackages
            ),
          ],
        });
      },
    });
  };

  const handleDeactivateClick = (pkg: Package) => {
    setPackageToDeactivate(pkg);
    setShowDeactivateDialog(true);
  };

  const handleConfirmDeactivate = () => {
    if (!packageToDeactivate?.id) return;

    showToast({
      title: 'Refund Notice',
      description: 'Money booked by users will be refunded.',
    });
    deactivatePackageMutation.mutate(packageToDeactivate.id, {
      onSuccess: () => {
        showToast({
          title: 'Package deactivated successfully!',
          description: 'The package is now inactive.',
        });
        setShowDeactivateDialog(false);
        setPackageToDeactivate(null);
        queryClient.invalidateQueries({
          queryKey: [
            generateBaseQueryKeyFromRoute(
              routes.packages.showAllActivePackages
            ),
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [
            generateBaseQueryKeyFromRoute(
              routes.packages.showAllInactivePackages
            ),
          ],
        });
      },
    });
  };

  const columns: ColumnDef<Package>[] = [
    {
      accessorKey: 'name',
      header: () => (
        <div className="text-sm font-semibold text-gray-700">Name</div>
      ),
      cell: ({ row }) => {
        if (!row.original || isLoadingActive || isLoadingInactive) {
          return (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-full sm:w-36 bg-gray-100 rounded-md" />
              <Skeleton className="h-4 w-3/4 sm:w-28 bg-gray-100 rounded-md" />
            </div>
          );
        }
        return (
          <div className="flex flex-col gap-1.5">
            <span className="text-sm sm:text-base font-semibold text-gray-800 tracking-tight break-words">
              {row.original?.name ?? 'N/A'}
              {row.original?.settlement && (
                <Badge
                  variant="outline"
                  className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 border-yellow-300"
                >
                  Booking Completed
                </Badge>
              )}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-500">
              ID: {row.original?.id ?? 'N/A'}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'package_type',
      header: () => (
        <div className="text-sm font-semibold text-gray-700">Type</div>
      ),
      cell: ({ row }) => {
        if (!row.original || isLoadingActive || isLoadingInactive) {
          return (
            <Skeleton className="h-8 w-full sm:w-28 bg-gray-100 rounded-md" />
          );
        }
        return (
          <Badge
            variant="outline"
            className="px-2 sm:px-4 py-1 sm:py-1.5 capitalize text-xs sm:text-sm font-medium bg-brand-color-light/20 text-brand-color border-brand-color/30 rounded-full shadow-sm whitespace-nowrap"
          >
            {row.original?.package_type?.toLowerCase() ?? 'N/A'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'price',
      header: () => (
        <div className="text-sm font-semibold text-gray-700">Price</div>
      ),
      cell: ({ row }) => {
        if (!row.original || isLoadingActive || isLoadingInactive) {
          return (
            <div className="space-y-2 sm:space-y-3">
              <Skeleton className="h-5 sm:h-6 w-full sm:w-32 bg-gray-100 rounded-md" />
              <Skeleton className="h-5 sm:h-6 w-full sm:w-32 bg-gray-100 rounded-md" />
            </div>
          );
        }
        const prices = row.original?.price ?? [];
        return (
          <div className="space-y-2 sm:space-y-2.5">
            {prices.map((priceItem, index) => (
              <div
                key={priceItem?.id ?? index}
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3"
              >
                <span className="text-sm sm:text-base font-bold text-gray-800">
                  ₦
                  {parseFloat(priceItem?.price ?? '0').toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <Badge
                  variant="outline"
                  className="text-xs bg-gray-50/80 text-gray-600 border-gray-200 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 w-fit"
                >
                  {priceItem?.category ?? 'N/A'}
                </Badge>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: () => (
        <div className="text-sm font-semibold text-gray-700">Status</div>
      ),
      cell: ({ row }) => {
        if (!row.original || isLoadingActive || isLoadingInactive) {
          return (
            <Skeleton className="h-7 sm:h-8 w-20 sm:w-24 bg-gray-100 rounded-md" />
          );
        }
        const status = row.original?.is_active ?? false;
        return (
          <Badge
            variant={status ? 'default' : 'destructive'}
            className={`px-2 sm:px-4 py-1 sm:py-1.5 capitalize text-xs sm:text-sm font-semibold rounded-full shadow-sm whitespace-nowrap ${
              status
                ? 'bg-green-50 text-green-700 border-green-200/70 ring-1 ring-green-500/10'
                : 'bg-red-50 text-red-700 border-red-200/70 ring-1 ring-red-500/10'
            }`}
          >
            {status ? 'Active' : 'Inactive'}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: () => (
        <div className="text-sm font-semibold text-gray-700">Actions</div>
      ),
      cell: ({ row }) => {
        if (!row.original || isLoadingActive || isLoadingInactive) {
          return (
            <Skeleton className="h-8 sm:h-10 w-8 sm:w-10 bg-gray-100 rounded-md" />
          );
        }
        const id = row.original?.id;
        const isActive = row.original?.is_active;
        if (!id) return null;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-brand-color-light/20 rounded-full transition-colors"
              >
                <MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 sm:w-52 border-gray-200 shadow-lg rounded-lg bg-white"
            >
              <DropdownMenuLabel className="text-gray-800 font-semibold px-3 py-2 sm:py-2.5 text-sm">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:bg-brand-color-light/20 focus:bg-brand-color-light/20 px-3 py-2 sm:py-2.5"
              >
                <Link
                  href={`/admin-dashboard/package/${id}`}
                  className="flex items-center text-gray-700 text-sm"
                >
                  <Eye className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> View
                  Package
                </Link>
              </DropdownMenuItem>
              {!isActive && (
                <>
                  <DropdownMenuItem
                    onClick={() => handleActivateClick(row.original)}
                    className="cursor-pointer text-green-600 hover:bg-green-50 focus:bg-green-50 focus:text-green-600 px-3 py-2 sm:py-2.5 text-sm"
                  >
                    <Power className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />{' '}
                    Activate Package
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteClick(row.original)}
                    className="cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-600 px-3 py-2 sm:py-2.5 text-sm"
                  >
                    <Trash className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Delete
                    Package
                  </DropdownMenuItem>
                </>
              )}
              {isActive && (
                <DropdownMenuItem
                  onClick={() => handleDeactivateClick(row.original)}
                  className="cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-600 px-3 py-2 sm:py-2.5 text-sm"
                >
                  <PowerOff className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />{' '}
                  Deactivate Package
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <Card className="w-full border-gray-200/80 shadow-xl rounded-xl overflow-hidden">
        <CardContent className="p-2 sm:p-4">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 bg-gray-100/70 p-1 rounded-lg">
              <TabsTrigger
                value="active"
                className="py-2 sm:py-2.5 px-2 sm:px-4 text-sm sm:text-base font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-brand-color data-[state=active]:shadow-sm text-gray-600 flex items-center justify-center"
              >
                Active Packages
              </TabsTrigger>
              <TabsTrigger
                value="inactive"
                className="py-2 sm:py-2.5 px-2 sm:px-4 text-sm sm:text-base font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-brand-color data-[state=active]:shadow-sm text-gray-600 flex items-center justify-center"
              >
                Inactive Packages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-0">
              <div className="mb-6 space-y-4">
                <DataTableSearch
                  searchKey="name"
                  searchQuery={searchQuery ?? ''}
                  setSearchQuery={setSearchQuery}
                  setPage={setActivePageIndex}
                />
              </div>
              <DataTable
                columns={columns}
                data={
                  isLoadingActive
                    ? Array(10).fill({})
                    : (activePackages?.results ?? [])
                }
                totalItems={activePackages?.count ?? 0}
                pageSizeOptions={[10, 20, 30, 40, 50]}
              />
            </TabsContent>
            <TabsContent value="inactive" className="mt-0">
              <div className="mb-6 space-y-4">
                <DataTableSearch
                  searchKey="name"
                  searchQuery={searchQuery ?? ''}
                  setSearchQuery={setSearchQuery}
                  setPage={setInactivePageIndex}
                />
              </div>
              <DataTable
                columns={columns}
                data={
                  isLoadingInactive
                    ? Array(10).fill({})
                    : (inactivePackages?.results ?? [])
                }
                totalItems={inactivePackages?.count ?? 0}
                pageSizeOptions={[10, 20, 30, 40, 50]}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Delete Package</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              {packageToDelete?.name ?? 'this package'}? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={deletePackageMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deletePackageMutation.isPending}
            >
              {deletePackageMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showActivateDialog} onOpenChange={setShowActivateDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Activate Package</DialogTitle>
            <DialogDescription>
              Are you sure you want to activate{' '}
              {packageToActivate?.name ?? 'this package'}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowActivateDialog(false)}
              disabled={activatePackageMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmActivate}
              disabled={activatePackageMutation.isPending}
            >
              {activatePackageMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2"></div>
                  Activating...
                </>
              ) : (
                <>
                  <Power className="mr-2 h-4 w-4" />
                  Activate
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showDeactivateDialog}
        onOpenChange={setShowDeactivateDialog}
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Deactivate Package</DialogTitle>
            <DialogDescription>
              Are you sure you want to deactivate{' '}
              {packageToDeactivate?.name ?? 'this package'}? Money booked by
              users will be refunded.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeactivateDialog(false)}
              disabled={deactivatePackageMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDeactivate}
              disabled={deactivatePackageMutation.isPending}
            >
              {deactivatePackageMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2"></div>
                  Deactivating...
                </>
              ) : (
                <>
                  <PowerOff className="mr-2 h-4 w-4" />
                  Deactivate
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
