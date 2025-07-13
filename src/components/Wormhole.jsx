"use client";
import { motion } from "framer-motion";

export default function Wormhole({ visible }) {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: visible ? 0.8 : 0,
        scale: visible ? 1 : 0.5,
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-64 h-64">
        {/* Animated rings */}
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 rounded-full border border-purple-500"
            style={{ scale: 1 - ring * 0.3 }}
            animate={{
              rotate: 360,
              transition: {
                duration: 20 + ring * 5,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          />
        ))}
        {/* Swirling particles */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-900/50 to-transparent"
          animate={{
            rotate: [0, 360],
            transition: { duration: 30, repeat: Infinity, ease: "linear" },
          }}
        />
      </div>
    </motion.div>
  );
}
