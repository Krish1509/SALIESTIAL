"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-1 sm:gap-1.5 md:gap-2">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1
            }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            className="flex flex-col items-center"
          >
            <motion.div
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg bg-black/60 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg"
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(0, 212, 255, 0.6)"
              }}
            >
              <span className="text-sm sm:text-base md:text-lg font-bold font-heading text-white">
                {unit.value.toString().padStart(2, "0")}
              </span>
            </motion.div>
            <span className="text-[7px] sm:text-[8px] md:text-[9px] text-white/80 mt-0.5 uppercase tracking-wider font-heading font-semibold">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

