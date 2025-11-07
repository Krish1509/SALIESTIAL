"use client";

import { motion } from "framer-motion";
import { CountdownTimer } from "@/components/countdown-timer";

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
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          textShadow: [
            "0 0 10px rgba(0, 212, 255, 0.5)",
            "0 0 20px rgba(255, 0, 102, 0.5)",
            "0 0 10px rgba(0, 212, 255, 0.5)"
          ]
        }}
        transition={{ 
          delay: 0.2, 
          duration: 0.6,
          textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        className="text-[10px] sm:text-xs md:text-sm text-[#00d4ff] font-heading uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-2 sm:mb-3 md:mb-4"
      >
        SAL EDUCATION PRESENTS
      </motion.p>

      {/* Main Title - SALIESTIAL with Cool Animation */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          rotateX: 0,
        }}
        transition={{ 
          delay: 0.4, 
          duration: 1,
          ease: "easeOut"
        }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-heading mb-2 sm:mb-3 md:mb-4"
        style={{
          background: "linear-gradient(135deg, #00d4ff 0%, #ffffff 25%, #ff0066 50%, #ffffff 75%, #00d4ff 100%)",
          backgroundSize: "200% 200%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "0 0 30px rgba(0, 212, 255, 0.8), 0 0 60px rgba(255, 0, 102, 0.6)",
          letterSpacing: "0.08em",
          lineHeight: "1.2",
          animation: "gradient-shift 3s ease infinite",
        }}
      >
        SALIESTIAL
      </motion.h1>

      {/* Date - January 2026 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: [1, 1.02, 1]
        }}
        transition={{ 
          delay: 0.6, 
          duration: 0.6,
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="mb-2 sm:mb-3 md:mb-4"
      >
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-heading"
          style={{
            background: "linear-gradient(135deg, #00d4ff 0%, #ff0066 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 0 20px rgba(0, 212, 255, 0.6)",
          }}
        >
          January 2026
        </motion.p>
      </motion.div>

      {/* Tagline - INDIA'S PREMIER TECHNOLOGY FESTIVAL */}
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          textShadow: [
            "0 0 15px rgba(0, 212, 255, 0.8)",
            "0 0 25px rgba(255, 0, 102, 0.8)",
            "0 0 15px rgba(0, 212, 255, 0.8)"
          ]
        }}
        transition={{ 
          delay: 0.8, 
          duration: 0.6,
          textShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#00d4ff] font-heading uppercase tracking-[0.15em] mb-2 sm:mb-3"
      >
        INDIA'S PREMIER TECHNOLOGY FESTIVAL
      </motion.p>
      
      {/* Subtitle - THE TECHNOLOGY ERA STARTS HERE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ 
          delay: 1, 
          duration: 0.6,
          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="text-[10px] sm:text-xs md:text-sm text-[#00d4ff]/80 font-heading uppercase tracking-[0.15em] mb-3 sm:mb-4 md:mb-5"
      >
        THE TECHNOLOGY ERA STARTS HERE
      </motion.p>

      {/* Countdown Timer - After THE TECHNOLOGY ERA STARTS HERE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-3 sm:mt-4 md:mt-5"
      >
        <div className="flex flex-col items-center gap-1.5">
          <CountdownTimer />
        </div>
      </motion.div>
    </motion.div>
  );
}


