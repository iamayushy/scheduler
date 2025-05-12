import { type InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      fullWidth = false,
      className = '',
      containerClassName = '',
      labelClassName = '',
      errorClassName = '',
      ...props
    },
    ref
  ) => {
    const combineClasses = (...classes: (string | boolean | undefined)[]) => {
      return classes.filter(Boolean).join(' ');
    };

    return (
      <div className={combineClasses(
        'flex flex-col space-y-2', 
        fullWidth && 'w-full', 
        containerClassName
      )}>
        {label && (
          <label className={combineClasses(
            'text-sm font-medium text-foreground', 
            labelClassName
          )}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={combineClasses(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive focus-visible:ring-destructive',
            fullWidth && 'w-full',
            className
          )}
          {...props}
        />
        {error && (
          <p className={combineClasses(
            'text-xs text-destructive', 
            errorClassName
          )}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;