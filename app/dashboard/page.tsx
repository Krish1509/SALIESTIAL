"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileModal } from "@/components/profile-modal";
import { ProfileCompletion } from "@/components/profile-completion";
import { DashboardSpaceElements } from "@/components/dashboard-space-elements";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoBackground } from "@/components/video-background";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      // Redirect to home page after sign in
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <VideoBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-[#00d4ff] text-xl font-heading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <VideoBackground />
      <DashboardSpaceElements />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center"
        >
          <Button
            onClick={() => setProfileOpen(true)}
            variant="outline"
            size="lg"
            className="!px-12 !py-6 text-lg font-bold font-heading uppercase tracking-wider border-2 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 shadow-[0_0_20px_rgba(0,212,255,0.5)] hover:shadow-[0_0_30px_rgba(0,212,255,0.7)] transition-all hover:scale-105"
          >
            <User className="w-5 h-5 mr-3" />
            Profile
          </Button>
        </motion.div>
      </div>

      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
      <ProfileCompletion 
        onComplete={() => setProfileOpen(true)} 
        onSkip={() => {}} 
      />
    </div>
  );
}

