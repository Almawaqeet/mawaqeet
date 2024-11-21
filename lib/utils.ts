import { type ClassValue, clsx } from "clsx"
import { getServerSession } from "next-auth"
import { twMerge } from "tailwind-merge"
import { authOptions } from "./token"
import { ACCOUNT_TYPES } from "@/constants/generic"
import { CLIENT_ROUTES } from "./routes"
import { redirect } from "next/navigation"

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
