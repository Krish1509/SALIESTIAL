"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Star } from "lucide-react";

export function DashboardSpaceElements() {
  return (
    <>
      {/* Floating Stars */}
      {[...Array(8)].map((_, i) => {
        const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920;
        const randomY = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: randomX, y: randomY }}
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute z-0"
          >
            <Star className="w-2 h-2 text-[#00d4ff]" />
          </motion.div>
        );
      })}

      {/* Animated Particles */}
      {[...Array(12)].map((_, i) => {
        const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920;
        const randomY = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080;
        return (
          <motion.div
            key={`particle-${i}`}
            initial={{ 
              opacity: 0,
              x: randomX,
              y: randomY,
            }}
            animate={{ 
              opacity: [0, 0.6, 0],
              y: [randomY, randomY - 200],
              x: [randomX, randomX + (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
            className="absolute z-0"
          >
            <div className="w-1 h-1 bg-[#00d4ff] rounded-full blur-sm" />
          </motion.div>
        );
      })}

      {/* Floating Icons */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ 
          opacity: [0.4, 0.8, 0.4],
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-10 z-0 hidden lg:block"
      >
        <Sparkles className="w-8 h-8 text-[#00d4ff]/30" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ 
          opacity: [0.4, 0.8, 0.4],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute top-32 right-16 z-0 hidden lg:block"
      >
        <Zap className="w-10 h-10 text-[#ff0066]/30" />
      </motion.div>

      {/* Gradient Orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-[#00d4ff] rounded-full blur-3xl z-0 opacity-10"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff0066] rounded-full blur-3xl z-0 opacity-10"
      />
    </>
  );
}

