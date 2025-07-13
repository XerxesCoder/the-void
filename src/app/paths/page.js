"use client";
import GalaxyButton from "@/components/NebulaButton";
import OverlaySequencePaths from "@/components/Path/OverlayPaths";
import VoidScreenEnter from "@/components/VoidScreens/VoidScreenEnter";
import { GALAXIES } from "@/constants/galaxy";
import { useSound } from "@/Providers/SoundEffectProvider";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Paths() {
  const [isClicked, setIsClicked] = useState(false);
  const [galaxyName, setGalaxyName] = useState("");
  const { playEffect } = useSound();

  const handleGalaxy = (galaxy) => {
    setGalaxyName(galaxy);
    playEffect("white");
    setIsClicked(true);
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

  const fadeUpVariant = {
    hidden: { opacity: 0, filter: "blur(14px)" },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const buttonVariant = {
    hidden: { opacity: 0, filter: "blur(20px)", y: 30 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <main className="w-full h-screen flex justify-center items-center relative overflow-hidden">
      <VoidScreenEnter />
      <motion.div
        className="max-w-7xl w-full text-center z-10 space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.p
          className="text-xl sm:text-3xl font-orbitron"
          variants={fadeUpVariant}
        >
          ALIGNMENT COMPLETE.
        </motion.p>
        <motion.p
          className="text-lg sm:text-2xl font-orbitron"
          variants={fadeUpVariant}
        >
          The VOID has opened its branches.
        </motion.p>
        <motion.p
          className="text-lg sm:text-2xl font-orbitron text-gray-300"
          variants={fadeUpVariant}
        >
          Choose a galaxy. Each one whispers a different truth.
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mt-12"
          variants={buttonContainer}
        >
          {GALAXIES.map((galaxy, index) => (
            <motion.div key={galaxy.name} variants={buttonVariant}>
              <GalaxyButton
                galaxy={galaxy}
                onClick={() => handleGalaxy(galaxy.slug)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <OverlaySequencePaths isClicked={isClicked} galaxyName={galaxyName} />
    </main>
  );
}
