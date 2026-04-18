import React, { forwardRef } from 'react';
import { cn } from '../lib/utils'; // Create this file

const Card = forwardRef(
  ({ className, children, ...props }, ref) => {
    const classes = cn('bg-white/5 rounded-lg border border-white/10', className);
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = forwardRef(
  ({ className, children, ...props }, ref) => {
    const classes = cn('p-4', className);
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef(
  ({ className, children, ...props }, ref) => {
    const classes = cn('text-lg font-semibold text-white', className);
    return (
      <h3 ref={ref} className={classes} {...props}>
        {children}
      </h3>
    );
  }
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef(
  ({ className, children, ...props }, ref) => {
    const classes = cn('text-sm text-gray-400', className);
    return (
      <p ref={ref} className={classes} {...props}>
        {children}
      </p>
    );
  }
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef(
  ({ className, children, ...props }, ref) => {
    const classes = cn('p-4', className);
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);
CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
