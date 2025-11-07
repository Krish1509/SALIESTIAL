"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, x: 300, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: 300, rotateY: -15 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-4 top-20 z-50 w-80 glass rounded-2xl p-6 border border-[#00d4ff]/30 shadow-2xl"
            style={{ perspective: "1000px" }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#00d4ff] hover:text-[#ff0066] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#00d4ff] glow-blue"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#ff0066] to-[#00d4ff] flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                )}
              </motion.div>

              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold font-heading text-white">
                  {session.user.name}
                </h3>
                <p className="text-sm text-gray-400">{session.user.email}</p>
              </div>

              <div className="w-full pt-4 border-t border-[#00d4ff]/20">
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="w-full px-6 py-3"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

