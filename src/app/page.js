"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);
  const router = useRouter();

  const handleClick = () => {
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
             hover:animate-pulse
             transition-all duration-300 
             drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            onClick={handleClick}
          >
            FIND YOUR WAY
          </motion.p>
        )}
      </motion.div>

      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ scale: 0, borderRadius: "100%" }}
            animate={{ scale: 1, borderRadius: "0%" }}
            exit={{ scale: 0, borderRadius: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 bg-white z-50 flex items-center justify-center"
            onAnimationComplete={() => setIsParagraphVisible(true)}
          >
            <AnimatePresence>
              {isParagraphVisible && (
                <motion.p
                  initial={{ opacity: 0, filter: "blur(14px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(14px)" }}
                  transition={{ duration: 1.5 }}
                  className="text-black text-xl text-center font-bold sm:text-4xl md:text-5xl font-orbitron tracking-widest"
                  onAnimationComplete={() => {
                    setTimeout(() => {
                      setIsParagraphVisible(false);
                    }, 1000);
                    setTimeout(() => {
                      router.push("/landing?void=true");
                    }, 2000);
                  }}
                >
                  YOUR JOURNEY BEGINS NOW
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
