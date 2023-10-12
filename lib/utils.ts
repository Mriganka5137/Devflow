import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return years === 1 ? "a year ago" : `${years} years ago`;
  if (months > 0) return months === 1 ? "a month ago" : `${months} months ago`;
  if (days > 0) return days === 1 ? "a day ago" : `${days} days ago`;
  if (hours > 0) return hours === 1 ? "an hour ago" : `${hours} hours ago`;
  if (minutes > 0)
    return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
  return "just now";
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};
