"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function GalaxyButton({ galaxy, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-32 h-32 flex items-center justify-center cursor-pointer"
    >
      <motion.div
        className="absolute w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle, ${galaxy.coreColor}33 0%, transparent 70%)`,
          filter: "blur(30px)",
        }}
        animate={{
          opacity: hovered ? 0.6 : 0.2,
          scale: hovered ? 1.2 : 1,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-full h-full rounded-full border-2 border-dashed opacity-60"
        style={{ borderColor: galaxy.colors[1] }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      />

      <motion.div
        className="relative z-10 w-16 h-16 rounded-full shadow-lg"
        style={{
          background: `radial-gradient(circle at center, ${galaxy.coreColor}, ${galaxy.colors[2]}40)`,
          boxShadow: `0 0 20px ${galaxy.coreColor}, inset 0 0 30px ${galaxy.coreColor}`,
        }}
        animate={{
          scale: hovered ? 1.1 : 1,
          boxShadow: hovered
            ? `0 0 30px ${galaxy.colors[0]}, inset 0 0 40px ${galaxy.colors[1]}`
            : `0 0 20px ${galaxy.coreColor}, inset 0 0 30px ${galaxy.coreColor}`,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white text-xs sm:text-sm font-orbitron uppercase tracking-widest text-center">
          {galaxy.name}
        </div>
      </motion.div>
    </motion.div>
  );
}
