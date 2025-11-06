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
import { Starfield } from "@/components/starfield";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-space">
        <div className="text-[#00d4ff] text-xl">Loading...</div>
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
    <div className="min-h-screen bg-gradient-space relative">
      <Starfield />
      <div className="relative z-10 flex">
        <Sidebar />
        
        <main className="flex-1 p-4 md:p-8 lg:ml-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold font-heading gradient-text">
                Dashboard
              </h1>
              <p className="text-gray-400 mt-2">
                Welcome back, {session.user?.name?.split(" ")[0]}!
              </p>
            </div>
            <Button
              onClick={() => setProfileOpen(true)}
              variant="outline"
              className="hidden md:flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Profile
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-[#00d4ff]/30">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Events</CardTitle>
                  <Calendar className="w-5 h-5 text-[#00d4ff]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold font-heading text-[#00d4ff]">
                    8
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Total Events</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-[#ff0066]/30">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Prize Pool</CardTitle>
                  <Trophy className="w-5 h-5 text-[#ff0066]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold font-heading text-[#ff0066]">
                    ₹1.8L+
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Total Prizes</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-[#00d4ff]/30">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Participants</CardTitle>
                  <Users className="w-5 h-5 text-[#00d4ff]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold font-heading text-[#00d4ff]">
                    500+
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Expected</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold font-heading mb-6 text-white">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <Card className="h-full hover:border-[#00d4ff]/50 transition-all cursor-pointer group">
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle>{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {section.href ? (
                          <Link href={section.href}>
                            <Button variant="outline" className="w-full">
                              Explore
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            variant="outline"
                            className="w-full"
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

