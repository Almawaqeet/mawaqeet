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
import { Badge } from "@/components/ui/badge";
import { getUserBookings } from "@/api/services/booking";
import { format, differenceInDays } from "date-fns";
import Link from "next/link";
import { InboxIcon, EyeIcon, CrownIcon, StarIcon, DiamondIcon, CalendarIcon,  ClockIcon, PackageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingTableSkeleton } from "./booking-table-skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CLIENT_ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";

interface BookingTableProps {
  packageId?: string;
}

export const BookingTable = ({ packageId }: BookingTableProps) => {
  const { data: userBookings, isLoading } = getUserBookings();
  const router = useRouter()

  const renderLoadingSkeleton = () => (
    <>
      {[...Array(3)].map((_, i) => (
        <BookingTableSkeleton key={i} />
      ))}
    </>
  );

  const formatStatus = (status: string | undefined) => {
    if (!status) return 'UNKNOWN';
    return status.replace(/_/g, ' ').toUpperCase();
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case 'no_payment':
        return 'default';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'destructive';
      case 'completed':
        return 'success';
      default:
        return 'outline';
    }
  };

  const getCategoryIcon = (category: string | undefined) => {
    if (!category) return <StarIcon className="h-5 w-5 transition-all duration-200" />;

    switch(category.toLowerCase()) {
      case 'vip':
        return <CrownIcon className="h-5 w-5 text-yellow-500 drop-shadow-md transition-all duration-200 hover:scale-110" />;
      case 'deluxe':
        return <DiamondIcon className="h-5 w-5 text-purple-500 drop-shadow-md transition-all duration-200 hover:scale-110" />;
      case 'standard':
        return <StarIcon className="h-5 w-5 text-blue-500 drop-shadow-md transition-all duration-200 hover:scale-110" />;
      default:
        return <StarIcon className="h-5 w-5 transition-all duration-200" />;
    }
  };

  const isExpiryClose = (expiryDate: string) => {
    if (!expiryDate) return false;
    const daysUntilExpiry = differenceInDays(new Date(expiryDate), new Date());
    return daysUntilExpiry <= 30;
  };

  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-6">
      <Card className="bg-white shadow-lg">
        <CardHeader className="p-4 sm:p-6 border-b">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div>
              <CardTitle className="text-2xl sm:text-3xl font-bold">
                My Bookings
              </CardTitle>
              <CardDescription className="mt-2 text-base">
                Track and manage your travel experiences
              </CardDescription>
            </div>
            <Link href={CLIENT_ROUTES.PrivatePages.clientDashboard.packages}>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <PackageIcon className="mr-2 h-4 w-4" />
                Book New Package
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="rounded-lg border shadow-sm overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-bold p-2 md:p-4">Package Details</TableHead>
                  <TableHead className="font-bold p-2 md:p-4 hidden sm:table-cell">Booking Date</TableHead>
                  <TableHead className="font-bold p-2 md:p-4">Status</TableHead>
                  <TableHead className="font-bold p-2 md:p-4 hidden md:table-cell">Amount</TableHead>
                  <TableHead className="font-bold p-2 md:p-4 hidden lg:table-cell">Expiry Date</TableHead>
                  <TableHead className="font-bold p-2 md:p-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  renderLoadingSkeleton()
                ) : !userBookings?.bookings || userBookings.bookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="rounded-full bg-muted p-3">
                          <InboxIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground text-lg font-medium">No bookings found</p>
                        <p className="text-sm text-muted-foreground mb-2">Start your journey by booking a package</p>
                        <Link href={CLIENT_ROUTES.PrivatePages.clientDashboard.packages}>
                          <Button variant="outline" size="lg" className="mt-2 hover:bg-primary hover:text-white transition-colors">
                            Explore Packages
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  userBookings?.bookings.map((booking) => (
                    <TableRow key={booking?.id ?? 'unknown'} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium p-4 text-sm sm:text-base">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted rounded-lg p-2">
                            {getCategoryIcon(booking?.selected_price?.category)}
                          </div>
                          <div>
                            <span className="font-semibold text-base">{booking?.package?.name ?? 'Unnamed Package'}</span>
                            <span className="text-xs text-muted-foreground mt-1 block font-medium">
                              {booking?.selected_price?.category ?? 'No category'}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-4 hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {booking.created_at ? format(new Date(booking?.created_at), 'MMM dd, yyyy') : 'No date'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="p-4">
                        <Badge
                          variant={getStatusColor(booking?.status) as "default" | "destructive" | "outline" | "secondary"}
                          className="text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {formatStatus(booking?.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-4 hidden md:table-cell">
                          <span className="font-semibold">
                            ₦{booking.balance ? Number(booking.balance).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                          </span>
                      </TableCell>
                      <TableCell className="p-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <ClockIcon className="h-4 w-4 text-muted-foreground" />
                          {booking?.expiry_date ? (
                            <span className={cn(
                              "text-sm",
                              isExpiryClose(booking.expiry_date) && "text-red-500 font-medium"
                            )}>
                              {format(new Date(booking.expiry_date), 'MMM dd, yyyy')}
                            </span>
                          ) : 'No expiry date'}
                        </div>
                      </TableCell>
                      <TableCell className="p-4">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-primary/10 text-primary transition-colors"
                              onClick={() => router.push(CLIENT_ROUTES.PrivatePages.clientDashboard.booking.viewBooking(booking?.id ?? ''))}
                            >
                              <EyeIcon className="h-4 w-4 mr-1.5" />
                              <span className="hidden sm:inline">View Details</span>
                              <span className="sm:hidden">View</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View booking details</TooltipContent>
                        </Tooltip>
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
