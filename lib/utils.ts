import { type ClassValue, clsx } from "clsx"
import { getServerSession } from "next-auth"
import { twMerge } from "tailwind-merge"
import { authOptions } from "./token"
import { ACCOUNT_TYPES } from "@/constants/generic"
import { CLIENT_ROUTES } from "./routes"
import { redirect } from "next/navigation"
import { Package, SegregatedPackage } from "@/constants/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const convertToKobo = (amount: number) => {
  return amount * 100
}


export const extractFirstName = (fullName: string) => {
  return fullName.split(' ')[0];
}


export const extractInitials = (fullName: string) => {
  return fullName.split(' ').map(name => name.charAt(0)).join('');
}

/**
 * Checks if the user is authenticated and has admin privileges
 * Redirects to login page if:
 * - User is not authenticated (no session)
 * - User is not an admin
 * @throws {Redirect} Redirects to login page if authentication fails
 */
export async function checkAuth({
    pageType
}: {
    pageType: typeof ACCOUNT_TYPES[keyof typeof ACCOUNT_TYPES]
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(CLIENT_ROUTES.PublicPages.auth.login);
  }

  if (pageType === "ADMIN" && session.user?.accountType !== ACCOUNT_TYPES.ADMIN) {
    redirect(CLIENT_ROUTES.PublicPages.auth.login);
  }
}



/**
 * Transforms an array of Package objects into SegregatedPackage objects with formatted pricing and features
 *
 * @param packages - Array of Package objects containing pricing, descriptions and features
 * @returns Array of SegregatedPackage objects with formatted data for display
 *
 * The function:
 * - Extracts price categories and formats prices with Nigerian Naira symbol
 * - Formats payment plans with weekly/monthly installment options
 * - Combines category descriptions and bullet points into features list
 * - Limits features to maximum of 4 items
 * - Handles null/undefined values safely
 */
export const segregatePackageByItsPriceCategory = (packages: Array<Package>): SegregatedPackage[] => {
  if (!packages?.length) return [];

  const segregatedPackages = packages.flatMap((pkg) => {
    if (!pkg?.price?.length) return [];

    return pkg.price.map((priceItem) => {
      const categoryDescription = pkg.category_description?.find(
        (desc) => desc.category === priceItem.category
      );

      // Split description into bullet points if it contains line breaks
      const descriptionPoints = categoryDescription?.description?.split('\n').filter(Boolean) ?? [];

      // Extract text content from li tags if present
      const processedPoints = descriptionPoints?.map(point => {
        if (!point) return '';
        const liMatch = point.match(/<li>([^<]+):([^<]+)<\/li>/);
        if (liMatch?.[1] && liMatch?.[2]) {
          return `${liMatch[1]}: ${liMatch[2].trim()}`;
        }
        return point;
      }) ?? [];

      const allFeatures = [
        ...processedPoints,
        pkg.expiry_date ? `Package valid until ${new Date(pkg.expiry_date).toLocaleDateString()}` : ''
      ].filter(Boolean);

      return {
        id: pkg.id ?? '',
        type: pkg.package_type,
        tier: priceItem.category.toUpperCase(),
        cohort: pkg.name ?? '',
        price: `₦${parseInt(priceItem.price ?? '0').toLocaleString()}`,
        paymentPlan: `Payable in installment`,
        features: allFeatures.slice(0, 4)
      };
    });
  });

  return segregatedPackages;
}



export const addSearchParamsToUrl = (url: string, params: Record<string, string>) => {
  const searchParams = new URLSearchParams(params);
  return `${url}?${searchParams.toString()}`;
}


export const removeSearchParamsFromUrl = (url: string, params: Record<string, string>) => {
  const searchParams = new URLSearchParams(params);
  return url.split('?')[0];
}


export const getSearchParamsFromUrl = (url: string) => {
  const searchParams = new URLSearchParams(url.split('?')[1]);
  return Object.fromEntries(searchParams.entries());
}
