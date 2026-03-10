'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Video, Edit3, Image, ArrowLeftRight, Zap, Code2, Search, Sparkles } from 'lucide-react';

const Tags = () => {
  // Primera fila de tags
  const topTags = [
    { name: 'Video & Motion Graphics', icon: Video },
    { name: 'Copywriting', icon: Edit3 },
    { name: 'Posters', icon: Image },
    { name: 'Framer Migration', icon: ArrowLeftRight },
  ];

  // Segunda fila de tags
  const bottomTags = [
    { name: 'Optimization', icon: Zap },
    { name: 'Custom Code', icon: Code2 },
    { name: 'SEO', icon: Search },
    { name: 'Icons', icon: Sparkles },
  ];

  return (
    <section className="py-16 overflow-hidden bg-black">
      <div className="space-y-6">
        {/* Primera fila - desliza hacia la izquierda */}
        <div className="relative">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex gap-4 whitespace-nowrap"
          >
            {[...topTags, ...topTags].map((tag, idx) => {
              const Icon = tag.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#1a1a1a] border border-white/10 rounded-lg px-6 py-3 text-base text-gray-300 hover:bg-[#222] hover:border-white/20 transition-all cursor-pointer inline-flex items-center gap-3"
                >
                  <Icon className="w-5 h-5" />
                  {tag.name}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Segunda fila - desliza hacia la derecha */}
        <div className="relative">
          <motion.div
            animate={{ x: [-2000, 0] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex gap-4 whitespace-nowrap"
          >
            {[...bottomTags, ...bottomTags].map((tag, idx) => {
              const Icon = tag.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#1a1a1a] border border-white/10 rounded-lg px-6 py-3 text-base text-gray-300 hover:bg-[#222] hover:border-white/20 transition-all cursor-pointer inline-flex items-center gap-3"
                >
                  <Icon className="w-5 h-5" />
                  {tag.name}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Tags;