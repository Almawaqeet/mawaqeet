'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { User } from '@/network/types';
import { ColumnDef } from '@tanstack/react-table';
// import { CellAction } from './cell-action';

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'profile.first_name',
    header: 'NAME',
    cell: ({ row }) =>
      row.original.profile?.first_name && row.original.profile?.last_name
        ? `${row.original.profile.first_name} ${row.original.profile.last_name}`
        : '-',
  },
  {
    accessorKey: 'email',
    header: 'EMAIL',
    cell: ({ row }) => row.original.email ?? '-',
  },
  {
    accessorKey: 'profile.phone_number',
    header: 'PHONE',
    cell: ({ row }) => row.original.profile?.phone_number ?? '-',
  },
  {
    accessorKey: 'profile.address',
    header: 'ADDRESS',
    cell: ({ row }) => row.original.profile?.address ?? '-',
  },
  //   {
  //     id: 'actions',
  //     cell: ({ row }) => <CellAction data={row.original} />
  //   }
];
