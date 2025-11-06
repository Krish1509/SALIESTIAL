"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function SaliestialLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="text-center flex flex-col items-center justify-center"
    >
      {/* Main Logo Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative w-full max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto mb-6"
        style={{
          filter: "drop-shadow(0 0 30px rgba(0, 212, 255, 0.6)) drop-shadow(0 0 60px rgba(0, 212, 255, 0.3))",
        }}
      >
        <Image
          src="/Pasted image.png"
          alt="SALIESTIAL - Technology Era Start Here"
          width={1200}
          height={600}
          priority
          unoptimized
          className="w-full h-auto object-contain"
          style={{
            filter: "brightness(1.1) contrast(1.05)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

