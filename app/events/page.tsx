"use client";

import { Sidebar } from "@/components/sidebar";
import { EventCard } from "@/components/event-card";
import { Starfield } from "@/components/starfield";
import { events } from "@/data/events";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  const [filter, setFilter] = useState<"all" | "technical" | "gaming">("all");

  const filteredEvents = events.filter(
    (event) => filter === "all" || event.category === filter
  );

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
              Events
            </h1>
            <p className="text-gray-400 text-lg">
              Compete, innovate, and win amazing prizes
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="flex items-center gap-2 !px-8 !py-3"
            >
              <Filter className="w-4 h-4" />
              All Events
            </Button>
            <Button
              variant={filter === "technical" ? "default" : "outline"}
              onClick={() => setFilter("technical")}
              className="!px-8 !py-3"
            >
              Technical
            </Button>
            <Button
              variant={filter === "gaming" ? "default" : "outline"}
              onClick={() => setFilter("gaming")}
              className="!px-8 !py-3"
            >
              Gaming
            </Button>
          </motion.div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No events found in this category.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

