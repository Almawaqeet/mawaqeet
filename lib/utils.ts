import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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
