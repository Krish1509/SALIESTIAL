"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set event date - January 2026
  const eventDate = new Date("2026-01-15T00:00:00").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-5">
      <div className="flex items-center gap-2 text-[#00d4ff] mb-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
        <span className="text-xs sm:text-sm font-semibold font-space uppercase tracking-wider">Event Starts In</span>
      </div>
      <div className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap justify-center">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotateY: 0
            }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ 
              scale: 1.1,
              rotateY: 5,
              z: 50
            }}
            className="flex flex-col items-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-[#ff0066] to-[#00d4ff] flex items-center justify-center glass border border-[#00d4ff]/30 shadow-lg"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0, 212, 255, 0.3)",
                  "0 0 30px rgba(255, 0, 102, 0.4)",
                  "0 0 20px rgba(0, 212, 255, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-white">
                {unit.value.toString().padStart(2, "0")}
              </span>
            </motion.div>
            <span className="text-[10px] sm:text-xs md:text-sm text-white/70 mt-2 uppercase tracking-wider font-space">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

