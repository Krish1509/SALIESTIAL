"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function TopNav() {
  const { data: session } = useSession();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between relative">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity z-10 shrink-0">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
            <Image
              src="/logo.jpeg"
              alt="SALIESTIAL Logo"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </Link>

        {/* Center: Navigation Links - Absolutely Centered */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 xl:gap-12 absolute left-1/2 -translate-x-1/2">
          <Link
            href="/events"
            className="text-white hover:text-[#00d4ff] transition-colors font-heading uppercase text-xs lg:text-sm tracking-[0.15em] px-2 py-2 font-bold letter-spacing-wide"
          >
            EVENTS
          </Link>
          <Link
            href="/nightfall"
            className="text-white hover:text-[#00d4ff] transition-colors font-heading uppercase text-xs lg:text-sm tracking-[0.15em] px-2 py-2 font-bold letter-spacing-wide"
          >
            NIGHTFALL
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-[#00d4ff] transition-colors font-heading uppercase text-xs lg:text-sm tracking-[0.15em] px-2 py-2 font-bold letter-spacing-wide"
          >
            ABOUT
          </Link>
        </div>

        {/* Right: Sign In Button - Top Right Corner */}
        <div className="flex items-center z-10 shrink-0">
          {session ? (
            <Link href="/dashboard">
              <Button 
                variant="outline" 
                className="px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-bold font-heading uppercase tracking-[0.2em] border-2 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 shadow-[0_0_15px_rgba(0,212,255,0.5)] hover:shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all h-auto rounded-full"
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Button
              variant="outline"
              onClick={() => signIn("google")}
              className="px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-bold font-heading uppercase tracking-[0.2em] border-2 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 shadow-[0_0_15px_rgba(0,212,255,0.5)] hover:shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all h-auto rounded-full"
            >
              SIGN IN
            </Button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

