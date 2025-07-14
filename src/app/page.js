"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useSound } from "@/Providers/SoundEffectProvider";
import OverlaySequence from "@/components/Landing/Overlay";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const letter = {
  hidden: { y: -100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,

    transition: { type: "spring", damping: 30, stiffness: 220 },
  },
};

export default function Home() {
  const heading = "WELCOME TO THE VOID";
  const [showParagraph, setShowParagraph] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { playEffect } = useSound();

  const handleClick = () => {
    playEffect("enter");
    setIsClicked(true);
  };

  return (
    <main className="w-full h-screen flex justify-center items-center relative overflow-hidden">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="max-w-7xl w-full text-center z-10"
      >
        <h1 className="text-2xl sm:text-5xl xl:text-[5rem] tracking-widest font-orbitron ">
          {heading.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letter}
              className={`inline-block ${char === " " ? "w-[1rem]" : ""}`}
              onAnimationComplete={() => {
                if (char == "V") {
                  setShowParagraph(true);
                }
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {showParagraph && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(30px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute bottom-[30%] left-1/2 -translate-x-1/2 z-50"
            onClick={handleClick}
          >
            <div className="relative group cursor-pointer px-8 py-4">
              <div className="absolute inset-0 rounded-lg border border-white/30 group-hover:border-white transition-all duration-500 ease-in-out z-10" />
              <div className="bg-gray-950 group-hover:bg-gray-950/50 backdrop-blur-md absolute inset-0 rounded-lg "/>
              <p className="relative z-10 text-lg sm:text-2xl xl:text-4xl font-orbitron font-semibold text-white tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                FIND YOUR WAY
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      <OverlaySequence isClicked={isClicked} />
    </main>
  );
}
