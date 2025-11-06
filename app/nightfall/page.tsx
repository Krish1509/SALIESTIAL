"use client";

import { Sidebar } from "@/components/sidebar";
import { Starfield } from "@/components/starfield";
import { artists } from "@/data/artists";
import { schedule } from "@/data/schedule";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Clock, Calendar } from "lucide-react";

export default function NightfallPage() {
  return (
    <div className="min-h-screen bg-gradient-space relative">
      <Starfield />
      <div className="relative z-10 flex">
        <Sidebar />
        
        <main className="flex-1 p-4 md:p-8 lg:ml-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading gradient-text mb-4">
              Nightfall
            </h1>
            <p className="text-gray-400 text-lg">
              Cultural events and performances by renowned artists
            </p>
          </motion.div>

          {/* Artists Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold font-heading text-white mb-6 flex items-center gap-3">
              <Music className="w-8 h-8 text-[#ff0066]" />
              Featured Artists
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {artists.map((artist, index) => (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <Card className="overflow-hidden hover:border-[#ff0066]/50 transition-all">
                    <div className="relative h-64 w-full bg-gradient-to-br from-[#ff0066]/20 to-[#00d4ff]/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl font-bold opacity-20 font-heading">
                          {artist.name.charAt(0)}
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="glass rounded-lg p-3">
                          <p className="text-xs text-gray-400">Day {artist.day}</p>
                          <p className="text-sm text-[#00d4ff] font-semibold">
                            {artist.time}
                          </p>
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="gradient-text">{artist.name}</CardTitle>
                      <CardDescription>{artist.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Schedule Section */}
          <section>
            <h2 className="text-3xl font-bold font-heading text-white mb-6 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-[#00d4ff]" />
              3-Day Schedule
            </h2>
            <div className="space-y-6">
              {schedule.map((day, dayIndex) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: dayIndex * 0.2 }}
                >
                  <Card className="border-[#00d4ff]/30">
                    <CardHeader>
                      <CardTitle className="text-2xl font-heading text-[#00d4ff]">
                        {day.date}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {day.events.map((event, eventIndex) => (
                          <motion.div
                            key={eventIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: dayIndex * 0.2 + eventIndex * 0.05 }}
                            className="flex items-start gap-4 p-4 rounded-lg glass hover:bg-[#00d4ff]/5 transition-colors"
                          >
                            <div className="flex items-center gap-2 text-[#00d4ff] min-w-[100px]">
                              <Clock className="w-4 h-4" />
                              <span className="font-semibold">{event.time}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-white mb-1">
                                {event.title}
                              </h4>
                              {event.description && (
                                <p className="text-sm text-gray-400">
                                  {event.description}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

