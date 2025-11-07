"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { VideoBackground } from "@/components/video-background";
import { SaliestialLogo } from "@/components/saliestial-logo";
import { SpaceElements } from "@/components/space-elements";
import { CountdownTimer } from "@/components/countdown-timer";
import { TopNav } from "@/components/top-nav";
import { SocialSidebar } from "@/components/social-sidebar";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <VideoBackground />
      <TopNav />
      <SocialSidebar />
      <SpaceElements />
      
      {/* Left Sidebar Navigation */}
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4 lg:gap-6 p-3 lg:p-4"
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
      
      {/* Main Content - Better Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 pt-16 sm:pt-20 md:pt-24">
        {/* Logo - No Image, Just Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 sm:mb-10 md:mb-12 w-full max-w-5xl mx-auto text-center"
        >
          <SaliestialLogo />
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8 sm:mb-10 md:mb-12 w-full max-w-3xl mx-auto flex justify-center"
        >
          <CountdownTimer />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-row gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 justify-center items-center w-full max-w-2xl mx-auto px-4"
        >
          {mounted && session ? (
            <Link href="/dashboard" className="flex-1 sm:flex-none">
              <Button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base shadow-lg">
                Go to Dashboard
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 sm:flex-none min-w-0"
              >
                <Link href="/events" className="block w-full">
                  <Button variant="default" className="group w-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold shadow-xl whitespace-nowrap">
                    Explore Events
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 sm:flex-none min-w-0"
              >
                <Button
                  variant="outline"
                  onClick={() => signIn("google")}
                  className="group w-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold shadow-xl whitespace-nowrap"
                >
                  Sign In with Google
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-4 sm:bottom-6 md:bottom-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-xs sm:text-sm font-space uppercase tracking-wider">Scroll to know more</span>
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#00d4ff]" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
