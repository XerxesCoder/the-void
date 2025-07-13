"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function GalaxyButton({ galaxy, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer flex justify-center"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Simplified Outer Glow */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30"
        style={{
          background: `radial-gradient(circle, ${galaxy.colors[0]}60, transparent 70%)`,
          filter: "blur(20px)",
        }}
        animate={{
          scale: isHovered ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          ease: "easeInOut",
        }}
      />

      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Simplified Galaxy Ring - Single rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 opacity-0 transition-all ease-in-out group-hover:opacity-50"
          style={{
            borderColor: galaxy.colors[0],
            borderStyle: "dashed",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Reduced Stellar Particles - Only 12 instead of 40 */}
        {[...Array(60)].map((_, i) => {
          const angle = (i * 360) / 12;
          const radius = 25 + Math.random() * 30;
          const size = Math.random() * 1.5 + 0.5;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: "50%",
                top: "50%",
                background:
                  galaxy.colors[
                    Math.floor(Math.random() * galaxy.colors.length)
                  ],
                boxShadow: `0 0 ${size * 3}px ${galaxy.colors[0]}`,
              }}
              animate={{
                x: [
                  Math.cos((angle * Math.PI) / 180) * radius,
                  Math.cos(((angle + 180) * Math.PI) / 180) * (radius + 10),
                  Math.cos((angle * Math.PI) / 180) * radius,
                ],
                y: [
                  Math.sin((angle * Math.PI) / 180) * radius,
                  Math.sin(((angle + 180) * Math.PI) / 180) * (radius + 10),
                  Math.sin((angle * Math.PI) / 180) * radius,
                ],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 6 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Simplified Central Galaxy Core */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-20 h-20  rounded-full flex flex-col items-center justify-center relative transition-all duration-500"
            style={{
              background: `radial-gradient(circle at center, ${galaxy.colors[0]}20, rgba(13,13,13,0.95))`,
              backdropFilter: "blur(10px)",
              boxShadow: `inset 0 0 20px rgba(13,13,13,0.8), 0 0 20px ${galaxy.colors[0]}50`,
            }}
            animate={{
              boxShadow: [
                `inset 0 0 20px rgba(13,13,13,0.8), 0 0 20px ${galaxy.colors[0]}50`,
                `inset 0 0 25px rgba(13,13,13,0.9), 0 0 25px ${galaxy.colors[1]}60`,
                `inset 0 0 20px rgba(13,13,13,0.8), 0 0 20px ${galaxy.colors[0]}50`,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {/* Simplified Core Glow */}
            <motion.div
              className="absolute inset-3 rounded-full opacity-30"
              style={{
                background: `radial-gradient(circle, ${galaxy.colors[0]}, transparent)`,
                filter: "blur(5px)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Galaxy Info */}
            <div className="text-center z-20 space-y-0.5">
              <h3 className="text-white text-xs md:text-sm font-light tracking-[0.1em] uppercase">
                {galaxy.name}
              </h3>
 {/*              <p className="text-gray-400 text-xs opacity-80">{galaxy.type}</p> */}
            </div>

            {/* Single Ripple Effect */}
            <motion.div
              className="absolute inset-0 rounded-full border border-gray-400/20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
