import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isRunningFirefox() {
  const sUsrAg = navigator.userAgent;
  return sUsrAg.indexOf("Firefox") > -1;
}
