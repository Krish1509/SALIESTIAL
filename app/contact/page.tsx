"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { VideoBackground } from "@/components/video-background";
import { TopNav } from "@/components/top-nav";
import { SocialSidebar } from "@/components/social-sidebar";
import { Mail, Phone, Code, Sparkles } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <VideoBackground />
      <TopNav onProfileClick={() => {}} />
      <SocialSidebar />
      
      {/* Left Sidebar Navigation - Tablet/Desktop Only */}
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 lg:gap-4"
      >
        {[
          { label: "HOME", icon: "🏠", href: "/" },
          { label: "COMPETITIONS", icon: "📅", href: "/events" },
          { label: "CONTACT", icon: "📞", href: "/contact" },
          { label: "ABOUT", icon: "👥", href: "/about" },
          { label: "SPONSORS", icon: "💎", href: "/about" },
        ].map((item, index) => (
          <Link key={item.label} href={item.href}>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex flex-col items-center gap-2 text-white/70 hover:text-[#00d4ff] transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 flex items-center justify-center glass rounded-lg border border-[#00d4ff]/20 group-hover:border-[#00d4ff]/50 text-xl">
                {item.icon}
              </div>
              <span className="text-xs font-space uppercase tracking-wider">{item.label}</span>
            </motion.div>
          </Link>
        ))}
      </motion.aside>

      {/* Bottom Navigation Bar - Mobile Only */}
      <motion.nav
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-black/80 backdrop-blur-xl border-t border-[#00d4ff]/30"
      >
        <div className="flex items-center justify-around px-2 py-3">
          {[
            { label: "HOME", icon: "🏠", href: "/" },
            { label: "COMPETITIONS", icon: "📅", href: "/events" },
            { label: "CONTACT", icon: "📞", href: "/contact" },
            { label: "ABOUT", icon: "👥", href: "/about" },
            { label: "SPONSORS", icon: "💎", href: "/about" },
          ].map((item, index) => (
            <Link key={item.label} href={item.href} className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center gap-1 text-white/70 hover:text-[#00d4ff] transition-colors cursor-pointer group active:scale-95"
              >
                <div className="w-8 h-8 flex items-center justify-center text-lg">
                  {item.icon}
                </div>
                <span className="text-[10px] font-space uppercase tracking-wider font-semibold">
                  {item.label}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.nav>
      
      <div className="relative z-10 min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 pt-20 sm:pt-24 md:pt-28 pb-20 sm:pb-24 md:pb-28">
        <div className="max-w-5xl mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-4"
              style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #ffffff 50%, #ff0066 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              CONTACT
            </h1>
            <p className="text-gray-400 text-sm md:text-base uppercase tracking-wider">
              Technical & Software Development
            </p>
          </motion.div>

          {/* Main Contact Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="relative"
          >
            <div className="glass rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-[#00d4ff]/30 shadow-2xl relative overflow-hidden">
              {/* Multiple Animated Background Glows - Aura Farming */}
              <motion.div
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, rgba(0, 212, 255, 0.15) 0%, transparent 60%)",
                    "radial-gradient(circle at 100% 100%, rgba(255, 0, 102, 0.15) 0%, transparent 60%)",
                    "radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 70%)",
                    "radial-gradient(circle at 0% 0%, rgba(0, 212, 255, 0.15) 0%, transparent 60%)",
                  ],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none"
              />
              <motion.div
                animate={{
                  background: [
                    "radial-gradient(circle at 100% 0%, rgba(255, 0, 102, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 100%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 0%, rgba(255, 0, 102, 0.1) 0%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute inset-0 pointer-events-none"
              />
              <motion.div
                animate={{
                  background: [
                    "radial-gradient(circle at 50% 0%, rgba(0, 212, 255, 0.08) 0%, transparent 40%)",
                    "radial-gradient(circle at 0% 50%, rgba(255, 0, 102, 0.08) 0%, transparent 40%)",
                    "radial-gradient(circle at 100% 50%, rgba(0, 212, 255, 0.08) 0%, transparent 40%)",
                    "radial-gradient(circle at 50% 0%, rgba(0, 212, 255, 0.08) 0%, transparent 40%)",
                  ],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute inset-0 pointer-events-none"
              />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                  {/* Photo Section */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="relative shrink-0"
                  >
                    {/* Aura rings around photo */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={`aura-${i}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 1,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-2xl border-2"
                        style={{
                          borderColor: i === 0 ? "rgba(0, 212, 255, 0.4)" : i === 1 ? "rgba(255, 0, 102, 0.4)" : "rgba(0, 212, 255, 0.2)",
                          transform: `scale(${1 + i * 0.1})`,
                        }}
                      />
                    ))}
                    
                    <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-[#00d4ff] shadow-2xl">
                      {/* Animated gradient background */}
                      <motion.div
                        animate={{
                          background: [
                            "linear-gradient(135deg, #00d4ff 0%, #ff0066 50%, #00d4ff 100%)",
                            "linear-gradient(135deg, #ff0066 0%, #00d4ff 50%, #ff0066 100%)",
                            "linear-gradient(135deg, #00d4ff 0%, #ff0066 50%, #00d4ff 100%)",
                          ],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0"
                      />
                      
                      {/* Glow effect */}
                      <motion.div
                        animate={{
                          boxShadow: [
                            "0 0 30px rgba(0, 212, 255, 0.6), inset 0 0 30px rgba(0, 212, 255, 0.3)",
                            "0 0 50px rgba(255, 0, 102, 0.8), inset 0 0 50px rgba(255, 0, 102, 0.4)",
                            "0 0 30px rgba(0, 212, 255, 0.6), inset 0 0 30px rgba(0, 212, 255, 0.3)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0"
                      />
                      
                      {/* Photo */}
                      <Image
                        src="/TechLeader_Krish.jpeg"
                        alt="Krish Soni - Technical Leader"
                        fill
                        className="object-cover z-10"
                        priority
                      />
                    </div>
                    
                    {/* Floating particles around photo */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0.8, 0],
                          scale: [0, 1.5, 1, 0],
                          x: [0, (Math.random() - 0.5) * 200],
                          y: [0, (Math.random() - 0.5) * 200],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeOut",
                        }}
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                          left: "50%",
                          top: "50%",
                          background: i % 2 === 0 ? "rgba(0, 212, 255, 0.8)" : "rgba(255, 0, 102, 0.8)",
                          boxShadow: `0 0 ${10 + i * 2}px ${i % 2 === 0 ? "rgba(0, 212, 255, 0.8)" : "rgba(255, 0, 102, 0.8)"}`,
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Info Section */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Name */}
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-2 uppercase tracking-wider"
                    >
                      KRISH SONI
                    </motion.h2>

                    {/* Role */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mb-6 flex flex-wrap gap-3"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-lg relative overflow-hidden"
                      >
                        <motion.div
                          animate={{
                            boxShadow: [
                              "0 0 10px rgba(0, 212, 255, 0.5)",
                              "0 0 20px rgba(0, 212, 255, 0.8)",
                              "0 0 10px rgba(0, 212, 255, 0.5)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-0 rounded-lg"
                        />
                        <Code className="w-5 h-5 text-[#00d4ff] relative z-10" />
                        <span className="text-[#00d4ff] font-bold font-heading uppercase tracking-wider text-sm md:text-base relative z-10">
                          Technical Leader
                        </span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff0066]/10 border border-[#ff0066]/30 rounded-lg relative overflow-hidden"
                      >
                        <motion.div
                          animate={{
                            boxShadow: [
                              "0 0 10px rgba(255, 0, 102, 0.5)",
                              "0 0 20px rgba(255, 0, 102, 0.8)",
                              "0 0 10px rgba(255, 0, 102, 0.5)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                          className="absolute inset-0 rounded-lg"
                        />
                        <Sparkles className="w-5 h-5 text-[#ff0066] relative z-10" />
                        <span className="text-[#ff0066] font-bold font-heading uppercase tracking-wider text-sm md:text-base relative z-10">
                          Software Developer
                        </span>
                      </motion.div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="text-gray-300 text-sm md:text-base mb-8 leading-relaxed"
                    >
                      Handling all software development, technical infrastructure, and digital solutions for SALIESTIAL 2025.
                    </motion.p>

                    {/* Contact Information Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="glass rounded-xl p-4 md:p-6 border border-[#00d4ff]/30 space-y-4"
                    >
                      {/* Email */}
                      <motion.a
                        href="mailto:krish1509soni@gmail.com"
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex items-center gap-4 p-3 rounded-lg bg-[#00d4ff]/5 hover:bg-[#00d4ff]/10 border border-[#00d4ff]/20 hover:border-[#00d4ff]/40 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0099cc] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                          <p className="text-white font-semibold text-sm md:text-base break-all">
                            krish1509soni@gmail.com
                          </p>
                        </div>
                      </motion.a>

                      {/* Phone */}
                      <motion.a
                        href="tel:+916352753899"
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex items-center gap-4 p-3 rounded-lg bg-[#ff0066]/5 hover:bg-[#ff0066]/10 border border-[#ff0066]/20 hover:border-[#ff0066]/40 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ff0066] to-[#cc0052] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                          <p className="text-white font-semibold text-sm md:text-base">
                            +91 6352753899
                          </p>
                        </div>
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Multiple Animated Border Glows - Aura Farming */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(0, 212, 255, 0.5), inset 0 0 30px rgba(0, 212, 255, 0.2), 0 0 60px rgba(0, 212, 255, 0.3)",
                    "0 0 50px rgba(255, 0, 102, 0.6), inset 0 0 50px rgba(255, 0, 102, 0.3), 0 0 80px rgba(255, 0, 102, 0.4)",
                    "0 0 30px rgba(0, 212, 255, 0.5), inset 0 0 30px rgba(0, 212, 255, 0.2), 0 0 60px rgba(0, 212, 255, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-2xl pointer-events-none"
              />
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(255, 0, 102, 0.3), inset 0 0 40px rgba(255, 0, 102, 0.15)",
                    "0 0 60px rgba(0, 212, 255, 0.4), inset 0 0 60px rgba(0, 212, 255, 0.2)",
                    "0 0 40px rgba(255, 0, 102, 0.3), inset 0 0 40px rgba(255, 0, 102, 0.15)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute inset-0 rounded-2xl pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 md:mt-12 text-center"
          >
            <div className="glass rounded-xl p-6 border border-[#00d4ff]/20">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block mb-4"
              >
                <Sparkles className="w-8 h-8 text-[#00d4ff]" />
              </motion.div>
              <p className="text-gray-400 text-sm md:text-base">
                For technical queries, software development, and digital solutions
              </p>
              <p className="text-[#00d4ff] font-semibold mt-2 text-sm md:text-base">
                Available for collaboration and support
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
