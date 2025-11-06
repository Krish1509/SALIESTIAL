"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Music,
  Info,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/nightfall", label: "Nightfall", icon: Music },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg glass border border-[#00d4ff]/30 text-[#00d4ff]"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -300,
        }}
        className={cn(
          "fixed left-0 top-0 h-full w-64 glass border-r border-[#00d4ff]/20 z-40 lg:translate-x-0",
          "lg:static lg:z-auto"
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-heading gradient-text">
              SALIESTIAL
            </h2>
            <p className="text-xs text-gray-400 mt-1">2025</p>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-r from-[#ff0066]/20 to-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff]"
                        : "text-gray-400 hover:text-[#00d4ff] hover:bg-[#00d4ff]/10"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

