"use client";

import { motion } from "framer-motion";

export function SaliestialLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center flex flex-col items-center justify-center"
    >
      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xs sm:text-sm md:text-base text-white/80 font-space uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4"
      >
        SAL EDUCATION PRESENTS
      </motion.p>

      {/* Main Title - SALIESTIAL with 3D Effect */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          rotateX: 0,
          rotateY: [0, 5, -5, 0]
        }}
        transition={{ 
          delay: 0.4, 
          type: "spring", 
          stiffness: 100,
          rotateY: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-3 md:mb-4"
        style={{
          background: "linear-gradient(135deg, #00d4ff 0%, #ff0066 50%, #00d4ff 100%)",
          backgroundSize: "200% 200%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 212, 255, 0.3), 0 10px 20px rgba(0, 0, 0, 0.5)",
          letterSpacing: "0.05em",
          animation: "gradient-shift 3s ease infinite",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        SALIESTIAL
      </motion.h1>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center gap-2"
      >
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-space mb-1 tracking-wider"
          animate={{ 
            textShadow: [
              "0 0 10px rgba(0, 212, 255, 0.5)",
              "0 0 20px rgba(255, 0, 102, 0.5)",
              "0 0 10px rgba(0, 212, 255, 0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Coming Soon
        </motion.p>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#00d4ff] font-heading"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          January 2026
        </motion.p>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xs sm:text-sm md:text-base text-white/70 font-space uppercase tracking-wider px-2 mt-2"
      >
        THE TECHNOLOGY ERA STARTS HERE
      </motion.p>
    </motion.div>
  );
}

