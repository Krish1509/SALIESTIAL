"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Sparkles, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ProfileCompletionProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

export function ProfileCompletion({ onComplete, onSkip }: ProfileCompletionProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      const hasSeenWelcome = localStorage.getItem(`welcome_${session.user.email}`);
      if (!hasSeenWelcome) {
        setTimeout(() => setShow(true), 800);
      }
    }
  }, [session]);

  const handleComplete = () => {
    if (session?.user?.email) {
      localStorage.setItem(`welcome_${session.user.email}`, "true");
    }
    setShow(false);
    router.push("/profile");
    onComplete?.();
  };

  const handleSkip = () => {
    if (session?.user?.email) {
      localStorage.setItem(`welcome_${session.user.email}`, "true");
    }
    setShow(false);
    onSkip?.();
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSkip}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-full md:w-[500px] glass rounded-2xl p-6 md:p-8 border border-[#00d4ff]/30 shadow-2xl"
          >
            <div className="text-center">
              {/* Animated Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  y: [0, -10, 0]
                }}
                transition={{ 
                  delay: 0.2, 
                  type: "spring",
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#ff0066] flex items-center justify-center glow-blue shadow-lg"
              >
                <Rocket className="w-10 h-10 text-white" />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold font-heading text-white mb-2"
                style={{
                  background: "linear-gradient(135deg, #00d4ff 0%, #ffffff 50%, #ff0066 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Welcome to SALIESTIAL 2025!
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 text-sm md:text-base mb-6"
              >
                Hi <span className="text-[#00d4ff] font-semibold">{session?.user?.name?.split(" ")[0]}!</span> Let's set up your profile to get the most out of your SALIESTIAL experience.
              </motion.p>

              {/* Compact Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3 mb-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3 p-3 bg-[#00d4ff]/10 rounded-lg border border-[#00d4ff]/30"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/20 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-white font-semibold text-sm">Complete Your Profile</h3>
                    <p className="text-gray-400 text-xs">Add your college, year, and contact details to register for events.</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3 p-3 bg-[#ff0066]/10 rounded-lg border border-[#ff0066]/30"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#ff0066]/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-[#ff0066]" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-white font-semibold text-sm">Register for Events</h3>
                    <p className="text-gray-400 text-xs">Browse technical events, gaming competitions, and cultural shows.</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button
                  onClick={handleComplete}
                  variant="default"
                  className="flex-1 !px-6 !py-3 text-sm font-bold"
                >
                  <User className="w-4 h-4 mr-2" />
                  Complete Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  onClick={handleSkip}
                  variant="outline"
                  className="flex-1 !px-6 !py-3 text-sm"
                >
                  Skip for Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

