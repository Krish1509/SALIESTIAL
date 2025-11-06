"use client";

import { motion } from "framer-motion";

export function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-space">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#00d4ff]/30 border-t-[#00d4ff] rounded-full"
        />
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[#00d4ff] text-lg font-heading"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}

