import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils'; // Create this file

const Sheet = ({ open, onOpenChange, children }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpenChange = useCallback(
    (newOpen) => {
      setIsOpen(newOpen);
      if (onOpenChange) {
        onOpenChange(newOpen);
      }
    },
    [onOpenChange]
  );

  return (
    <>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => handleOpenChange(false)}
        ></div>
      )}
    </>
  );
};

const SheetTrigger = forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);
SheetTrigger.displayName = 'SheetTrigger';

const SheetContent = forwardRef(
  (
    {
      side = 'right',
      className,
      children,
      onClose,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'fixed top-0 h-screen bg-white text-black z-50 w-full md:w-auto';

    const sideClasses = {
      left: 'left-0 border-r',
      right: 'right-0 border-l',
      top: 'top-0 border-b',
      bottom: 'bottom-0 border-t',
    };

    const motionVariants = {
      left: {
        initial: { x: '-100%' },
        animate: { x: 0 },
        exit: { x: '-100%' },
      },
      right: {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '100%' },
      },
      top: {
        initial: { y: '-100%' },
        animate: { y: 0 },
        exit: { y: '-100%' },
      },
      bottom: {
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
      },
    };

        const classes = cn(
            baseClasses,
            sideClasses[side] || sideClasses.right,
            className
        );

    const { initial, animate, exit } = motionVariants[side];

    return (
      <motion.div
        ref={ref}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
SheetContent.displayName = 'SheetContent';

const SheetHeader = forwardRef(
    ({ className, children, ...props }, ref) => {
        const classes = cn("p-4", className);
        return (
            <div ref={ref} className={classes} {...props}>
                {children}
            </div>
        );
    }
);
SheetHeader.displayName = 'SheetHeader';

const SheetTitle = forwardRef(
  ({ className, children, ...props }, ref) => {
    const classes = cn('text-lg font-semibold', className);
    return (
      <h2 ref={ref} className={classes} {...props}>
        {children}
      </h2>
    );
  }
);
SheetTitle.displayName = 'SheetTitle';

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle };
