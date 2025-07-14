"use client";
import GalaxyButton from "@/components/GalaxyButton";
import OverlaySequence from "@/components/OverlayPage/OverlaySequence";
import VoidScreenEnter from "@/components/VoidScreens/VoidScreenEnter";
import { GALAXIES } from "@/constants/galaxy";
import { pathsTexts } from "@/constants/OverlayTexts";
import {
  buttonContainer,
  containerVariants,
  fadeUpVariant,
  buttonVariant,
} from "@/lib/variants";
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

  return (
    <main className="w-full h-screen flex justify-center items-center relative overflow-hidden">
      <VoidScreenEnter />
      <motion.div
        className="max-w-7xl w-full text-center z-10 space-y-5 mt-6 sm:mt-0"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.p
          className="text-xl sm:text-3xl font-orbitron"
          variants={fadeUpVariant()}
        >
          ALIGNMENT COMPLETE.
        </motion.p>
        <motion.p
          className="text-lg sm:text-2xl font-orbitron"
          variants={fadeUpVariant()}
        >
          The VOID has opened its branches.
        </motion.p>
        <motion.p
          className="text-lg sm:text-2xl font-orbitron text-gray-300"
          variants={fadeUpVariant()}
        >
          Choose a galaxy.
        </motion.p>
        <motion.p
          className="text-lg sm:text-2xl font-orbitron text-gray-300"
          variants={fadeUpVariant()}
        >
          Each one whispers a different truth.
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mt-12 justify-items-center"
          variants={buttonContainer}
        >
          {GALAXIES.map((galaxy) => (
            <motion.div key={galaxy.name} variants={buttonVariant(4, 0.8)}>
              <GalaxyButton
                galaxy={galaxy}
                onClick={() => handleGalaxy(galaxy.slug)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <OverlaySequence
        isClicked={isClicked}
        nextURL={`/paths/${galaxyName}`}
        textCount={1}
        textArray={pathsTexts}
      />
    </main>
  );
}
