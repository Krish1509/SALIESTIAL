"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Event } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

interface EventCardProps {
  event: Event;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden hover:border-[#00d4ff]/50 transition-all duration-300 group">
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff0066]/20 to-[#00d4ff]/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold opacity-20 font-heading">
              {event.name.charAt(0)}
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <div className="px-3 py-1 rounded-full bg-[#ff0066]/80 backdrop-blur-sm text-white text-sm font-semibold">
              {event.category}
            </div>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="gradient-text">{event.name}</CardTitle>
          <CardDescription>{event.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center gap-2 text-[#00d4ff]">
            <Trophy className="w-5 h-5" />
            <span className="font-semibold text-lg">{event.prizePool}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full !px-10 !py-4" variant="outline">
            Register Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

