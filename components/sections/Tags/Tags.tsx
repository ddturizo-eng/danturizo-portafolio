'use client';

import { motion } from 'framer-motion';

const topTags = [
  { name: 'Java' },
  { name: 'Oracle' },
  { name: 'PL/SQL' },
  { name: 'Software Architecture' },
];

const bottomTags = [
  { name: 'FastAPI' },
  { name: 'React' },
  { name: 'Next.js' },
  { name: 'Database Design' },
];

export function Tags() {
  return (
    <section className="py-16 px-4 md:px-6 bg-black">
      <div className="space-y-6">
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex gap-4 whitespace-nowrap"
          >
            {[...topTags, ...topTags].map((tag, idx) => (
              <div
                key={idx}
                className="bg-[#1a1a1a] border border-white/10 rounded-lg px-6 py-3 text-base text-gray-300 hover:bg-[#222] hover:border-white/20 transition-all cursor-pointer inline-flex items-center gap-3"
              >
                {tag.name}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: [-2000, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex gap-4 whitespace-nowrap"
          >
            {[...bottomTags, ...bottomTags].map((tag, idx) => (
              <div
                key={idx}
                className="bg-[#1a1a1a] border border-white/10 rounded-lg px-6 py-3 text-base text-gray-300 hover:bg-[#222] hover:border-white/20 transition-all cursor-pointer inline-flex items-center gap-3"
              >
                {tag.name}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
