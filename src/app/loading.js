"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden z-50">
      <div className="absolute inset-0  pointer-events-none z-10">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-indigo-900/20 to-black animate-pulse" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-3xl sm:text-5xl font-orbitron text-violet-300 tracking-widest mb-4"
      >
        THE VOID IS LISTENING{dots}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="z-10 text-sm sm:text-lg text-gray-400 font-mono italic"
      >
        Decoding cosmic frequencies...
      </motion.p>

      <motion.div
        className="absolute w-full h-[1px] bg-violet-500/20 blur-sm animate-pulse"
        initial={{ y: "-50%" }}
        animate={{ y: "100%" }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
    </div>
  );
}
