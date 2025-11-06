"use client";

import { motion } from "framer-motion";
import { Telescope, Satellite } from "lucide-react";

export function SpaceElements() {
  return (
    <>
      {/* Left Comet */}
      <motion.div
        initial={{ opacity: 0, x: -100, y: -100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="absolute top-10 left-10 md:top-20 md:left-20 z-10"
      >
        <div className="relative">
          <div className="w-3 h-3 bg-yellow-400 rounded-full blur-sm animate-pulse" />
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-0 left-0 w-20 h-1 bg-gradient-to-r from-yellow-400 via-blue-300 to-transparent blur-sm"
            style={{ transform: "rotate(45deg)" }}
          />
        </div>
      </motion.div>

      {/* Right Comet */}
      <motion.div
        initial={{ opacity: 0, x: 100, y: -100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-10 right-10 md:top-20 md:right-20 z-10"
      >
        <div className="relative">
          <div className="w-3 h-3 bg-orange-400 rounded-full blur-sm animate-pulse" />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-0 right-0 w-20 h-1 bg-gradient-to-l from-orange-400 via-red-400 to-transparent blur-sm"
            style={{ transform: "rotate(-45deg)" }}
          />
        </div>
      </motion.div>

      {/* Telescope (Bottom Left) */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="absolute bottom-10 left-10 md:bottom-20 md:left-20 z-10"
      >
        <div className="relative">
          <Telescope className="w-12 h-12 md:w-16 md:h-16 text-blue-400 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500/30 rounded-full blur-md"
          />
        </div>
      </motion.div>

      {/* Satellite (Bottom Right) */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="absolute bottom-10 right-10 md:bottom-20 md:right-20 z-10"
      >
        <div className="relative">
          <Satellite className="w-12 h-12 md:w-16 md:h-16 text-orange-400 filter drop-shadow-[0_0_15px_rgba(251,146,60,0.6)]" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 w-1 h-6 bg-blue-400 rounded-full transform -translate-x-1/2" />
            <div className="absolute bottom-0 left-1/2 w-1 h-6 bg-blue-400 rounded-full transform -translate-x-1/2" />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

