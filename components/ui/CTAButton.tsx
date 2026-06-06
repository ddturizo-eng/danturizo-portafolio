'use client';

import { motion } from 'framer-motion';
import { hoverScale } from '@/utils';

interface CTAButtonProps {
  href: string;
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
  className?: string;
}

const baseStyles =
  'px-8 py-4 rounded-full font-medium text-sm transition-all inline-block text-center';

const variants = {
  primary: 'bg-white text-black hover:bg-gray-100',
  ghost:
    'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/15',
};

export function CTAButton({
  href,
  variant = 'primary',
  children,
  className = '',
}: CTAButtonProps) {
  return (
    <motion.a
      href={href}
      {...hoverScale}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.a>
  );
}
