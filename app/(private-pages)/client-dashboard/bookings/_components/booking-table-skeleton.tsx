import { Skeleton } from '@/components/ui/skeleton'
import { TableRow, TableCell } from '@/components/ui/table'
import React from 'react'

export const BookingTableSkeleton = () => {
  return (
    <TableRow>
    <TableCell className="p-2 md:p-4"><Skeleton className="h-4 w-[100px] md:w-[200px]" /></TableCell>
    <TableCell className="p-2 md:p-4 hidden sm:table-cell"><Skeleton className="h-4 w-[80px] md:w-[100px]" /></TableCell>
    <TableCell className="p-2 md:p-4"><Skeleton className="h-4 w-[60px] md:w-[80px]" /></TableCell>
    <TableCell className="p-2 md:p-4 hidden md:table-cell"><Skeleton className="h-4 w-[50px] md:w-[60px]" /></TableCell>
    <TableCell className="p-2 md:p-4 hidden lg:table-cell"><Skeleton className="h-4 w-[60px] md:w-[80px]" /></TableCell>
    <TableCell className="p-2 md:p-4"><Skeleton className="h-4 w-[80px] md:w-[100px]" /></TableCell>
  </TableRow>
  )
}
