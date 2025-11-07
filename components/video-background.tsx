"use client";

import { useEffect, useRef } from "react";

export function VideoBackground() {
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Play mobile video
    if (mobileVideoRef.current) {
      mobileVideoRef.current.play().catch(() => {
        // Autoplay was prevented, which is fine
      });
    }
    // Play desktop video
    if (desktopVideoRef.current) {
      desktopVideoRef.current.play().catch(() => {
        // Autoplay was prevented, which is fine
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Mobile: Vertical video as-is */}
      <video
        ref={mobileVideoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover md:hidden"
        style={{ 
          filter: "brightness(0.7) contrast(1.1) saturate(1.2)",
          objectPosition: "center",
          opacity: 0.9
        }}
      >
        <source src="/verticalvideo.mp4" type="video/mp4" />
      </video>

      {/* Desktop: Rotated horizontal video */}
      <div className="hidden md:block absolute inset-0 overflow-hidden">
        <video
          ref={desktopVideoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute"
          style={{ 
            filter: "brightness(0.7) contrast(1.1) saturate(1.2)",
            opacity: 0.9,
            transform: "rotate(-90deg)",
            transformOrigin: "center center",
            width: "100vh",
            height: "100vw",
            top: "50%",
            left: "50%",
            marginTop: "-50vw",
            marginLeft: "-50vh",
            objectFit: "cover"
          }}
        >
          <source src="/verticalvideo.mp4" type="video/mp4" />
        </video>
      </div>

      <div 
        className="absolute inset-0" 
        style={{ 
          background: "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.05), rgba(0,0,0,0.15))" 
        }} 
      />
    </div>
  );
}


