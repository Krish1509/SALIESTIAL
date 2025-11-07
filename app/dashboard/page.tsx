"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { ProfileModal } from "@/components/profile-modal";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  FileText,
  Radio,
  Trophy,
  Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VideoBackground } from "@/components/video-background";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
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

  const sections = [
    {
      icon: Calendar,
      title: "Events",
      description: "Browse and register for technical events",
      href: "/events",
      color: "from-[#00d4ff] to-[#0099cc]",
    },
    {
      icon: User,
      title: "My Profile",
      description: "View and edit your profile",
      href: "#",
      onClick: () => setProfileOpen(true),
      color: "from-[#ff0066] to-[#cc0052]",
    },
    {
      icon: FileText,
      title: "Register",
      description: "Register for event participation",
      href: "/events",
      color: "from-[#00d4ff] to-[#ff0066]",
    },
    {
      icon: Radio,
      title: "Live Updates",
      description: "Real-time event updates and announcements",
      href: "#",
      color: "from-[#ff0066] to-[#ff3399]",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <VideoBackground />
      <div className="relative z-10 flex min-h-screen">
        <Sidebar />
        
        <main className="flex-1 p-6 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 md:mb-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold font-heading distressed-text text-white mb-3" data-text="DASHBOARD">
                DASHBOARD
              </h1>
              <p className="text-gray-300 text-lg md:text-xl font-space">
                Welcome back, <span className="text-[#00d4ff] font-semibold">{session.user?.name?.split(" ")[0]}!</span>
              </p>
            </div>
            <Button
              onClick={() => setProfileOpen(true)}
              variant="outline"
              className="hidden md:flex items-center gap-2 px-6 py-3"
            >
              <User className="w-4 h-4" />
              Profile
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-[#00d4ff]/30 glass backdrop-blur-md">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-lg font-heading text-white">Events</CardTitle>
                  <Calendar className="w-5 h-5 text-[#00d4ff]" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold font-heading text-[#00d4ff] glow-text-blue">
                    8
                  </div>
                  <p className="text-sm text-gray-300 mt-2">Total Events</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-[#ff0066]/30 glass backdrop-blur-md">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-lg font-heading text-white">Prize Pool</CardTitle>
                  <Trophy className="w-5 h-5 text-[#ff0066]" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold font-heading text-[#ff0066] glow-text-red">
                    ₹1.8L+
                  </div>
                  <p className="text-sm text-gray-300 mt-2">Total Prizes</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-[#00d4ff]/30 glass backdrop-blur-md">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-lg font-heading text-white">Participants</CardTitle>
                  <Users className="w-5 h-5 text-[#00d4ff]" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold font-heading text-[#00d4ff] glow-text-blue">
                    500+
                  </div>
                  <p className="text-sm text-gray-300 mt-2">Expected</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-white distressed-text" data-text="QUICK ACTIONS">
              QUICK ACTIONS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="h-full hover:border-[#00d4ff]/50 transition-all cursor-pointer group glass backdrop-blur-md">
                      <CardHeader className="pb-4">
                        <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <CardTitle className="text-white font-heading text-xl">{section.title}</CardTitle>
                        <CardDescription className="text-gray-300">{section.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {section.href ? (
                          <Link href={section.href}>
                            <Button variant="outline" className="w-full px-6 py-3">
                              Explore
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            variant="outline"
                            className="w-full px-6 py-3"
                            onClick={section.onClick}
                          >
                            Open
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
}

