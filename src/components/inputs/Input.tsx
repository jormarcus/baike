import * as React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  required?: boolean;
  errors?: FieldErrors;
  disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, id, required = false, errors, disabled, ...props },
    ref
  ) => {
    return (
      <input
        id={id}
        disabled
        type={type}
        className={cn(
          `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
          ${errors && errors[id] ? 'border-red-500' : 'border-neutral-300'}
          ${
            errors && errors[id] ? 'focus:border-red-500' : 'focus:border-black'
          }`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
