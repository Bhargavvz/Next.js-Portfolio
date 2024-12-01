"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
}

const buttonVariants = {
  primary: 'bg-purple-600 hover:bg-purple-700 text-white',
  secondary: 'bg-gray-800 hover:bg-gray-700 text-white',
  outline: 'border border-purple-600 hover:bg-purple-600/20 text-white',
};

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3',
  lg: 'px-8 py-4 text-lg',
};

const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  href,
  isExternal,
  ...props
}: ButtonProps) => {
  const baseClasses = cn(
    'rounded-full font-medium transition-colors inline-flex items-center justify-center',
    buttonVariants[variant],
    buttonSizes[size],
    className
  );

  const content = (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={baseClasses}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return isExternal ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : (
      <Link href={href}>{content}</Link>
    );
  }

  return (
    <button {...props} className={baseClasses}>
      {children}
    </button>
  );
};

export default Button;
