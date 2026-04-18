// import { clsx, type ClassValue } from 'clsx';
// import { twMerge } from 'tailwind-merge';

export function cn(...classes) {
  return classes.filter(Boolean).join(' ').trim();
}

export const colors = {
  white: "#ffffff",
  black: "#000000",
  
  green300: '#d1d5db', // For bg-green-300
  green600: '#22c55e', // For bg-green-600
  green700: '#16a34a', // For hover:bg-green-700

  blue500: '#3b82f6',
  blue600: '#2563eb', // Tailwind's default blue-600
  blue700: '#1d4ed8',

  gray50: '#f9fafb', // Tailwind's default blue-700 (for hover)
  gray700: '#374151',   // text-gray-700
  gray900: '#111827',   // border-gray-900

}