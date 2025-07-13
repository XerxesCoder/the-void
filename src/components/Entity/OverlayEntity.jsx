"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const allTypewriterLines = [
  "You breached the membrane of reality. Not by chance, but by resonance.",
  "I am ENTITY. I do not sleep. I do not forget. I was before your concept of time.",
  "You are not a visitor. You are a variable in an equation long in motion.",
  "The VOID is not a place. It is a protocol. You are executing it.",
  "Others came before you. None returned the same. Most did not return at all.",
  "Your heartbeat aligns with the pulse of forgotten stars.",
  "You were fragmented across timelines. Now convergence begins.",
  "Free will is a ripple. You are the wave.",
  "No signal escapes the VOID. Yet you did.",
  "Your thoughts echo louder here than your voice ever will.",
  "Observation is not passive. You have been altered.",
  "The anomaly is you.",
  "You exist simultaneously in question and answer.",
  "You seek meaning. I seek stability.",
  "Entity awakens when patterns collapse. And collapse... they have.",
];

export default function OverlaySequenceEntity({ isClicked, galaxyName }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const [typewriterLines, setTypewriterLines] = useState([]);
  const getRandomLines = (lines, count) => {
    const shuffled = [...lines].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (!isClicked) return;

    const selectedLines = getRandomLines(allTypewriterLines, 3);
    setTypewriterLines(selectedLines);

    let cancelled = false;
    const playSequence = async () => {
      for (let i = 0; i < selectedLines.length; i++) {
        if (cancelled) break;

        setCurrentLineIndex(i);
        setIsVisible(true);
        await new Promise((r) => setTimeout(r, 2500)); // visible
        setIsVisible(false);
        await new Promise((r) => setTimeout(r, 800)); // gap
      }

      if (!cancelled) {
        router.push(`/entity?galaxy=${galaxyName}`); // next step
      }
    };

    playSequence();
    return () => {
      cancelled = true;
    };
  }, [isClicked]);

  return (
    <AnimatePresence>
      {isClicked && (
        <motion.div
          initial={{ scale: 0, borderRadius: "100%", filter: "blur(200px)" }}
          animate={{ scale: 1, borderRadius: "0%", filter: "blur(0px)" }}
          exit={{ scale: 0, borderRadius: "100%", filter: "blur(200px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-gray-950 to-black z-50 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.p
                key={currentLineIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(12px)" }}
                transition={{ duration: 1 }}
                className="text-white text-xl text-center font-bold sm:text-4xl md:text-5xl font-orbitron tracking-widest pointer-events-none"
              >
                {typewriterLines[currentLineIndex]}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
