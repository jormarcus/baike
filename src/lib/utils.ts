import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function throwContextNotInitializedError(): any {
  throw new Error('Cannot use Context before initialization');
}

export function isNullOrUndefined<T>(
  value: T | null | undefined
): value is null | undefined {
  return value === null || value === undefined;
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function omit(key: string, obj: any) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}
