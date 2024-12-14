"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons } from "@/components/reusables/icons";
import { Badge } from "@/components/ui/badge";
import { getUserBookings } from "@/api/services/booking";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import Link from "next/link";
import { InboxIcon, EyeIcon } from "lucide-react";

export const BookingTable = () => {
  const { data: userBookings, isLoading } = getUserBookings();

  const renderLoadingSkeleton = () => (
    <>
      {[...Array(3)].map((_, i) => (
        <TableRow key={i}>
          <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
          <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
          <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
          <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
          <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
          <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
        </TableRow>
      ))}
    </>
  );

  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">My Bookings</CardTitle>
              <CardDescription className="mt-2">View and manage your travel bookings</CardDescription>
            </div>
            <Link href="/client-dashboard/packages">
              <Button className="hover:scale-105 transition-transform">
                <Icons.package className="mr-2 h-4 w-4" />
                Book New Package
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Package Name</TableHead>
                  <TableHead className="font-semibold">Booking Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Payment Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  renderLoadingSkeleton()
                ) : !userBookings?.bookings || userBookings.bookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <InboxIcon className="h-8 w-8 text-gray-400" />
                        <p className="text-muted-foreground">No bookings found</p>
                        <Link href="/client-dashboard/packages">
                          <Button variant="outline" size="sm" className="mt-2">
                            Browse Packages
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  userBookings.bookings.map((booking) => (
                    <TableRow key={booking.id ?? 'unknown'} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{booking.package?.name ?? 'Unnamed Package'}</TableCell>
                      <TableCell>
                        {booking.created_at ? format(new Date(booking.created_at), 'MMM dd, yyyy') : 'No date'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(booking.status)}>
                          {booking.status ?? 'Unknown'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${booking.balance?.toLocaleString() ?? '0'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={booking.status === "Paid" ? "default" : "secondary"}>
                          {booking.status ?? 'Unknown'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-primary/10"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
