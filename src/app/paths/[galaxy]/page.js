"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { GALAXIES } from "@/constants/galaxy";
import VoidScreenEnter from "@/components/VoidScreens/VoidScreenEnter";
import OverlaySequenceEntity from "@/components/Entity/OverlayEntity";
import { useSound } from "@/Providers/SoundEffectProvider";

export default function GalaxyDetail() {
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname?.split("/").pop() ?? "";
  const galaxy = GALAXIES.find((g) => g.slug === slug);
  const { name, type, description, lore, colors } = galaxy;
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { playEffect } = useSound();
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.5,
        delayChildren: 1.1,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 5, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const handleClick = () => {
    setIsClicked(true);
    playEffect("white");
    setTimeout(() => {
      setIsRedirecting(true);
    }, 3000);
  };
  useEffect(() => {
    if (!galaxy) {
      router.replace("/not-found");
      return;
    }
  }, [galaxy, router]);

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center px-4 text-center">
      <VoidScreenEnter />
      <motion.div
        className="max-w-4xl z-10 flex flex-col justify-center items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-5xl font-orbitron tracking-widest mb-4 text-white"
          variants={fadeUp}
        >
          {name.toUpperCase()}
        </motion.h1>

        <motion.h2
          className="text-2xl font-mono text-gray-200 mb-6 italic"
          variants={fadeUp}
        >
          {type}
        </motion.h2>

        <motion.p className="text-lg text-gray-100 mb-8" variants={fadeUp}>
          {description}
        </motion.p>

        <motion.p
          className="text-md text-gray-300 max-w-3xl whitespace-pre-line"
          variants={fadeUp}
        >
          {lore}
        </motion.p>
        <div className="mt-12 flex justify-center items-center min-h-[60px]">
          <AnimatePresence mode="wait">
            {!isClicked ? (
              <motion.button
                key="button"
                onClick={() => handleClick()}
                className="px-6 py-3 border border-violet-300 text-violet-300 font-orbitron tracking-widest cursor-pointer hover:bg-violet-300 hover:text-black transition-all"
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: { delay: 3.5, duration: 0.8 },
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(40px)",
                  transition: { delay: 0, duration: 0.5 },
                }}
              >
                REDIRECT TO ENTITY
              </motion.button>
            ) : (
              <motion.p
                key="text"
                className="text-xl text-violet-300 font-orbitron tracking-wide"
                initial={{ opacity: 0, filter: "blur(25px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(25px)" }}
                transition={{ duration: 0.5 }}
              >
                Redirecting to ENTITY...
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <OverlaySequenceEntity isClicked={isRedirecting} galaxyName={slug} />
    </main>
  );
}
