"use client";

import { INTERGALACTIC_LORE } from "@/constants/lores";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function LoreFragment() {
  const [currentLore, setCurrentLore] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const showRandomLore = () => {
    const randomLore =
      INTERGALACTIC_LORE[Math.floor(Math.random() * INTERGALACTIC_LORE.length)];
    setCurrentLore(randomLore);
    setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    setTimeout(() => {
      setIsVisible(false);
    }, 7000);
  };

  useEffect(() => {
    showRandomLore();
  }, [pathname]);

  /*   useEffect(() => {
    const interval = setInterval(() => {
      showRandomLore();
    }, 25000);

    return () => clearInterval(interval);
  }, []); */

  return (
    <div className="fixed top-6 left-1 z-50 max-w-sm sm:max-w-md">
      <AnimatePresence>
        {isVisible && currentLore && (
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative p-5 bg-gray-950 backdrop-blur-lg border-l-4 border-violet-600 shadow-2xl rounded-r-2xl"
          >
            <motion.h3
              className="text-violet-400 font-orbitron uppercase tracking-wide text-xs mb-1 animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              TRANSMISSION RECEIVED
            </motion.h3>
            <motion.p
              className="text-gray-200 text-sm leading-snug"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-purple-500 font-semibold block mb-1">
                {currentLore.title}
              </span>
              {currentLore.content}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
