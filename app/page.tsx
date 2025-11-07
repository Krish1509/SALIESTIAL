"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { VideoBackground } from "@/components/video-background";
import { SaliestialLogo } from "@/components/saliestial-logo";
import { CountdownTimer } from "@/components/countdown-timer";
import { TopNav } from "@/components/top-nav";
import { SocialSidebar } from "@/components/social-sidebar";
import { ProfileModal } from "@/components/profile-modal";
import { ProfileCompletion } from "@/components/profile-completion";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <VideoBackground />
      <TopNav onProfileClick={() => setProfileOpen(true)} />
      <SocialSidebar />
      
      {/* Countdown Timer - Desktop/Tablet: Top Right, Mobile: Bottom */}
      {/* Desktop/Tablet - Top Right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="fixed top-20 right-4 sm:top-24 sm:right-6 md:top-28 md:right-8 lg:right-12 z-40 hidden md:block"
      >
        <div className="flex flex-col items-end gap-1.5">
          <CountdownTimer />
        </div>
      </motion.div>

      {/* Mobile - Countdown Timer Above Bottom Nav */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="fixed bottom-20 left-0 right-0 z-40 md:hidden px-4"
      >
        <div className="flex flex-col items-center gap-1.5">
          <CountdownTimer />
        </div>
      </motion.div>
      
      {/* Left Sidebar Navigation - Tablet/Desktop Only */}
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 lg:gap-4"
      >
        {[
          { label: "HOME", icon: "🏠", href: "/" },
          { label: "EVENTS", icon: "📅", href: "/events" },
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
            { label: "EVENTS", icon: "📅", href: "/events" },
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
      
      {/* Main Content - Centered with Negative Top Margin */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 pt-20 sm:pt-24 md:pt-28 pb-24 md:pb-32">
        {/* Logo Section - Centered */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl mx-auto text-center"
        >
          <SaliestialLogo />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-6 sm:bottom-8 md:bottom-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/70"
          >
            <span className="text-xs sm:text-sm font-space uppercase tracking-wider">Scroll to know more</span>
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#00d4ff]" />
          </motion.div>
          </motion.div>
        </div>

        <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
        {session && (
          <ProfileCompletion 
            onComplete={() => setProfileOpen(true)} 
            onSkip={() => {}} 
          />
        )}
      </div>
    );
  }
