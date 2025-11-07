"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function TopNav() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between relative">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity z-10 shrink-0">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
            <Image
              src="/logo.png"
              alt="SALIESTIAL Logo"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </Link>

        {/* Center: Navigation Links - Desktop Only */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 xl:gap-12 absolute left-1/2 -translate-x-1/2">
          <Link
            href="/events"
            className="text-white hover:text-[#00d4ff] transition-colors font-heading uppercase text-sm md:text-base lg:text-lg tracking-[0.15em] px-3 py-2 font-bold letter-spacing-wide"
          >
            EVENTS
          </Link>
          <Link
            href="/nightfall"
            className="text-white hover:text-[#00d4ff] transition-colors font-heading uppercase text-sm md:text-base lg:text-lg tracking-[0.15em] px-3 py-2 font-bold letter-spacing-wide"
          >
            NIGHTFALL
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-[#00d4ff] transition-colors font-heading uppercase text-sm md:text-base lg:text-lg tracking-[0.15em] px-3 py-2 font-bold letter-spacing-wide"
          >
            ABOUT
          </Link>
        </div>

        {/* Right: Sign In Button + Mobile Menu */}
        <div className="flex items-center gap-3 z-10 shrink-0">
          {/* Desktop Sign In */}
          <div className="hidden md:block">
            {session ? (
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  className="!px-6 md:!px-8 !py-2 md:!py-2.5 text-xs font-bold font-heading uppercase tracking-[0.2em] border-2 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 shadow-[0_0_15px_rgba(0,212,255,0.5)] hover:shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all h-auto rounded-full"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                onClick={() => signIn("google")}
                className="!px-6 md:!px-8 !py-2 md:!py-2.5 text-xs font-bold font-heading uppercase tracking-[0.2em] border-2 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 shadow-[0_0_15px_rgba(0,212,255,0.5)] hover:shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all h-auto rounded-full"
              >
                SIGN IN
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#00d4ff] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-black/80 backdrop-blur-xl border-b border-[#00d4ff]/30"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/events"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white hover:text-[#00d4ff] transition-colors font-heading uppercase text-sm tracking-[0.15em] py-2 font-bold"
              >
                EVENTS
              </Link>
              <Link
                href="/nightfall"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white hover:text-[#00d4ff] transition-colors font-heading uppercase text-sm tracking-[0.15em] py-2 font-bold"
              >
                NIGHTFALL
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white hover:text-[#00d4ff] transition-colors font-heading uppercase text-sm tracking-[0.15em] py-2 font-bold"
              >
                ABOUT
              </Link>
              <div className="pt-2 border-t border-[#00d4ff]/30">
                {session ? (
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      variant="outline" 
                      className="w-full !px-6 !py-2.5 text-xs font-bold font-heading uppercase tracking-[0.2em] border-2 border-[#00d4ff] text-[#00d4ff]"
                    >
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signIn("google");
                    }}
                    className="w-full !px-6 !py-2.5 text-xs font-bold font-heading uppercase tracking-[0.2em] border-2 border-[#00d4ff] text-[#00d4ff]"
                  >
                    SIGN IN
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

