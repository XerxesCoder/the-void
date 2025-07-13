"use client";
import { INTERGALACTIC_LORE } from "@/constants/lores";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";



export default function LoreFragment() {
  const [currentLore, setCurrentLore] = useState(null);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        const randomLore =
          INTERGALACTIC_LORE[
            Math.floor(Math.random() * INTERGALACTIC_LORE.length)
          ];
        setCurrentLore(randomLore);
        setIsVisible(true);
      }, 1000); // Fade-out duration
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-md">
      <AnimatePresence>
        {isVisible && currentLore && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", damping: 12 }}
            className="p-4 bg-black/80 backdrop-blur-md border-l-4 border-purple-500 rounded-r-lg shadow-lg"
          >
            <motion.h3
              className="text-purple-400 font-mono text-sm mb-1"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentLore.title}
            </motion.h3>
            <motion.p
              className="text-white/80 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {currentLore.content}
            </motion.p>
            <motion.div
              className="absolute top-0 right-0 p-1 text-xs text-purple-300 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              onClick={() => setIsVisible(false)}
            >
              ✕
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual trigger button */}
      {!isVisible && (
        <motion.button
          onClick={() => {
            const randomLore =
              INTERGALACTIC_LORE[
                Math.floor(Math.random() * INTERGALACTIC_LORE.length)
              ];
            setCurrentLore(randomLore);
            setIsVisible(true);
          }}
          className="p-2 bg-purple-900/50 rounded-full border border-purple-700 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-xs text-purple-300">⚡ LORE</span>
        </motion.button>
      )}
    </div>
  );
}
