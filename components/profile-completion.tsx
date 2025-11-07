"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { X, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ProfileCompletionProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function ProfileCompletion({ onComplete, onSkip }: ProfileCompletionProps) {
  const { data: session } = useSession();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      const hasSeenWelcome = localStorage.getItem(`welcome_${session.user.email}`);
      if (!hasSeenWelcome) {
        setTimeout(() => setShow(true), 1000);
      }
    }
  }, [session]);

  const handleComplete = () => {
    if (session?.user?.email) {
      localStorage.setItem(`welcome_${session.user.email}`, "true");
    }
    setShow(false);
    onComplete();
  };

  const handleSkip = () => {
    if (session?.user?.email) {
      localStorage.setItem(`welcome_${session.user.email}`, "true");
    }
    setShow(false);
    onSkip();
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-full md:w-[600px] max-h-[90vh] overflow-y-auto glass rounded-2xl p-8 border border-[#00d4ff]/30 shadow-2xl"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#ff0066] flex items-center justify-center glow-blue shadow-lg"
              >
                <Sparkles className="w-12 h-12 text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold font-heading text-white mb-4"
              >
                Welcome to SALIESTIAL 2025!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 text-lg mb-8"
              >
                Hi <span className="text-[#00d4ff] font-semibold">{session?.user?.name?.split(" ")[0]}!</span> Let's set up your profile to get the most out of your SALIESTIAL experience.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4 mb-8 text-left"
              >
                <div className="flex items-start gap-4 p-4 bg-[#00d4ff]/10 rounded-lg border border-[#00d4ff]/30">
                  <User className="w-6 h-6 text-[#00d4ff] mt-1 shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Complete Your Profile</h3>
                    <p className="text-gray-300 text-sm">Add your college, year, and contact details to register for events.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#ff0066]/10 rounded-lg border border-[#ff0066]/30">
                  <Sparkles className="w-6 h-6 text-[#ff0066] mt-1 shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Register for Events</h3>
                    <p className="text-gray-300 text-sm">Browse technical events, gaming competitions, and cultural shows.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={handleComplete}
                  variant="default"
                  className="flex-1 !px-8 !py-4 text-base"
                >
                  <User className="w-5 h-5 mr-2" />
                  Complete Profile
                </Button>
                <Button
                  onClick={handleSkip}
                  variant="outline"
                  className="flex-1 !px-8 !py-4 text-base"
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

