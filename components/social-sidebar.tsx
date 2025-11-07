"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Youtube, Twitter, Facebook, MessageCircle } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: MessageCircle, href: "#", label: "Discord" },
];

export function SocialSidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 lg:gap-4"
    >
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.label}
            href={social.href}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.2, color: "#00d4ff" }}
            className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-[#00d4ff] transition-colors glass rounded-lg border border-[#00d4ff]/20 hover:border-[#00d4ff]/50"
            aria-label={social.label}
          >
            <Icon className="w-5 h-5" />
          </motion.a>
        );
      })}
    </motion.aside>
  );
}

