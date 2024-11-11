import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function covertAmountFromMilliunits(amount : number){
  return amount / 1000;
};

export function covertAmountToMilliunits(amount : number){
  return Math.round(amount * 1000);
};