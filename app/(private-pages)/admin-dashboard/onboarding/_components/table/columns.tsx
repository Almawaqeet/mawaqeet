'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { SimpleOnboardingUser } from '@/api/types';

export const columns: ColumnDef<SimpleOnboardingUser>[] = [
  {
    accessorKey: 'first_name',
    header: 'NAME',
    cell: ({ row }) => {
      const firstName = row.original.first_name ?? '';
      const lastName = row.original.last_name ?? '';
      return `${firstName} ${lastName}`;
    }
  },
  {
    accessorKey: 'email',
    header: 'EMAIL',
    cell: ({ row }) => row.original.email ?? ''
  },
  {
    accessorKey: 'onboarding_fee_payment_check',
    header: 'PAYMENT STATUS',
    cell: ({ row }) => row.original.onboarding_fee_payment_check ? 'Paid' : 'Pending'
  },
  {
    accessorKey: 'is_completed',
    header: 'ONBOARDING STATUS',
    cell: ({ row }) => row.original.is_completed ? 'Completed' : 'In Progress'
  },
  {
    accessorKey: 'date_created',
    header: 'DATE CREATED',
    cell: ({ row }) => {
      const date = row.original.date_created;
      return date ? new Date(date).toLocaleDateString() : '';
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
