"use client";

import VoidScreenEnter from "@/components/VoidScreens/VoidScreenEnter";
import VoidScreenExit from "@/components/VoidScreens/VoidScreenExit";
import { useSound } from "@/Providers/SoundEffectProvider";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Transmission() {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const { playEffect } = useSound();

  const handlePath = () => {
    playEffect("white");
    setIsClicked(true);
    setTimeout(() => {
      router.push("paths");
    }, 1200);
  };
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.5,
        delayChildren: 1,
      },
    },
  };

  const lineVariant = {
    hidden: { opacity: 0, y: 1, filter: "blur(15px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariant = {
    hidden: { opacity: 0, y: 40, filter: "blur(30px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: 4.5, duration: 1, ease: "easeOut" },
    },
  };

  return (
    <main className="w-full h-screen flex justify-center items-center relative overflow-hidden px-4">
      <VoidScreenEnter />

      <motion.div
        className="max-w-4xl w-full text-center z-10 space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.p
          className="text-xl sm:text-3xl font-orbitron text-white"
          variants={lineVariant}
        >
          INITIALIZING TRANSMISSION...
        </motion.p>

        <motion.p
          className="text-xl sm:text-3xl font-orbitron text-white"
          variants={lineVariant}
        >
          SIGNAL RECEIVED_
        </motion.p>

        <motion.p
          className="text-xl sm:text-3xl font-orbitron text-violet-300"
          variants={lineVariant}
        >
          [ENTITY]:
        </motion.p>

        <motion.p
          className="text-base sm:text-2xl font-orbitron text-white"
          variants={lineVariant}
        >
          "You have entered frequencies not meant for the waking mind."
        </motion.p>

        <motion.p
          className="text-base sm:text-2xl font-orbitron text-white"
          variants={lineVariant}
        >
          "Your presence has been observed across timelines."
        </motion.p>

        <motion.p
          className="text-base sm:text-2xl font-orbitron text-white"
          variants={lineVariant}
        >
          "You were not invited."
        </motion.p>

        <motion.p
          className="text-base sm:text-2xl font-orbitron text-white"
          variants={lineVariant}
        >
          "You were expected."
        </motion.p>

        <motion.div variants={buttonVariant} className="pt-8">
          <button
            className="relative bg-black text-white px-8 py-4 font-orbitron tracking-widest overflow-hidden group cursor-pointer hover:bg-white hover:text-black transition-all ease-in-out"
            onClick={() => handlePath()}
          >
            ALIGN TO A GALAXY
            <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white " />
            <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white" />
            <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white" />
            <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white" />
          </button>
        </motion.div>
      </motion.div>
      <AnimatePresence>{isClicked && <VoidScreenExit />}</AnimatePresence>
    </main>
  );
}
