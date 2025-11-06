"use client";

import { Sidebar } from "@/components/sidebar";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Award, Rocket } from "lucide-react";

const clubs = [
  {
    name: "Cyborgs Robotics Club",
    description: "Leading robotics innovation and automation solutions",
    icon: Rocket,
    color: "from-[#00d4ff] to-[#0099cc]",
  },
  {
    name: "Syntaxium Club",
    description: "Coding, development, and software engineering community",
    icon: Award,
    color: "from-[#ff0066] to-[#cc0052]",
  },
  {
    name: "ISTE Student Chapter",
    description: "Indian Society for Technical Education student chapter",
    icon: Users,
    color: "from-[#00d4ff] to-[#ff0066]",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-space relative">
      <Starfield />
      <div className="relative z-10 flex">
        <Sidebar />
        
        <main className="flex-1 p-4 md:p-8 lg:ml-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading gradient-text mb-4">
              About SALIESTIAL
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl">
              The official annual techfest of SAL Institute of Technology, bringing together
              innovation, competition, and celebration in a 3-day extravaganza.
            </p>
          </motion.div>

          {/* SAL Education */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Card className="border-[#00d4ff]/30">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0099cc] flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-heading">SAL Education</CardTitle>
                    <CardDescription className="text-base">
                      Organizing Institution
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  SAL Education is committed to providing quality technical education and
                  fostering innovation among students. SALIESTIAL 2025 represents our vision
                  of creating a platform where students can showcase their technical prowess,
                  compete at the highest level, and celebrate the spirit of innovation.
                </p>
              </CardContent>
            </Card>
          </motion.section>

          {/* Clubs Section */}
          <section>
            <h2 className="text-3xl font-bold font-heading text-white mb-6">
              Organizing Clubs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clubs.map((club, index) => {
                const Icon = club.icon;
                return (
                  <motion.div
                    key={club.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <Card className="h-full hover:border-[#00d4ff]/50 transition-all">
                      <CardHeader>
                        <div
                          className={`w-14 h-14 rounded-lg bg-gradient-to-br ${club.color} flex items-center justify-center mb-4`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <CardTitle className="text-xl font-heading">
                          {club.name}
                        </CardTitle>
                        <CardDescription>{club.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Mission Statement */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <Card className="border-[#ff0066]/30 bg-gradient-to-br from-[#ff0066]/10 to-[#00d4ff]/10">
              <CardHeader>
                <CardTitle className="text-2xl font-heading gradient-text">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed text-lg">
                  To create an unparalleled platform that bridges the gap between theoretical
                  knowledge and practical application, fostering innovation, collaboration, and
                  excellence in technology. SALIESTIAL 2025 is where the technology era truly
                  begins.
                </p>
              </CardContent>
            </Card>
          </motion.section>
        </main>
      </div>
    </div>
  );
}

