'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { fadeInUp } from '@/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export function GlassCard({ children, className = '', ...props }: GlassCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
