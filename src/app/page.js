"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
    transition: { type: "spring", damping: 12, stiffness: 200 },
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
          <motion.p
            initial={{ opacity: 0, filter: "blur(14px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute bottom-[30%] left-1/2 -translate-x-1/2 
             text-lg sm:text-2xl xl:text-4xl 
             cursor-pointer 
             font-orbitron font-semibold
             animate-pulse
             drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            onClick={handleClick}
          >
            FIND YOUR WAY
          </motion.p>
        )}
      </motion.div>

      <OverlaySequence isClicked={isClicked} />
    </main>
  );
}
