'use client';
import { PackageBookingListResponse } from '@/network/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<PackageBookingListResponse>[] = [
  {
    accessorKey: 'user',
    header: 'NAME',
    cell: ({ row }) => {
      const firstName = row.original.user?.profile?.first_name ?? '';
      const lastName = row.original.user?.profile?.last_name ?? '';
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: 'user.email',
    header: 'EMAIL',
    cell: ({ row }) => row.original.user?.email ?? '',
  },
  {
    accessorKey: 'selected_price',
    header: 'PACKAGE CATEGORY',
    cell: ({ row }) => row.original.selected_price?.category ?? 'N/A',
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status?.toLowerCase() === 'completed'
            ? 'secondary'
            : row.original.status?.toLowerCase() === 'cancelled'
              ? 'destructive'
              : 'default'
        }
      >
        {row.original.status?.replace(/_/g, ' ').toUpperCase() ?? 'N/A'}
      </Badge>
    ),
  },
  {
    accessorKey: 'balance',
    header: 'BALANCE',
    cell: ({ row }) => {
      const balance = row.original.balance;
      return balance
        ? `₦${Number(balance).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`
        : 'N/A';
    },
  },
  {
    accessorKey: 'created_at',
    header: 'DATE CREATED',
    cell: ({ row }) => {
      const date = row.original.created_at;
      return date ? format(new Date(date), 'MMM dd, yyyy') : 'N/A';
    },
  },
  {
    accessorKey: 'expiry_date',
    header: 'EXPIRY DATE',
    cell: ({ row }) => {
      const date = row.original.expiry_date;
      return date ? format(new Date(date), 'MMM dd, yyyy') : 'N/A';
    },
  },
];
