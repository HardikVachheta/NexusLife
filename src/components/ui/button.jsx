import React, { forwardRef } from 'react';
import { cn } from '../lib/utils'; // Create this file

const Button = forwardRef(
  (
    {
      variant = 'default',
      size = 'default',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-md font-medium whitespace-nowrap';

    const variantClasses = {
      default:
        'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
      ghost: 'text-gray-300 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50',
      outline:
        'border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50',
      destructive:
        'bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50',
    };

    const sizeClasses = {
      default: 'px-4 py-2',
      sm: 'px-3 py-1.5 text-sm',
      lg: 'px-6 py-3 text-lg',
      icon: 'p-2 rounded-full',
    };

    const classes = cn(
      baseClasses,
      variantClasses[variant] || variantClasses.default,
      sizeClasses[size] || sizeClasses.default,
      className
    );

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
