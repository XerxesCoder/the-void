"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function OverlaySequence({
  isClicked,
  nextURL,
  textCount,
  textArray,
}) {
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

    const selectedLines = getRandomLines(textArray, textCount);
    setTypewriterLines(selectedLines);

    let cancelled = false;
    const playSequence = async () => {
      for (let i = 0; i < selectedLines.length; i++) {
        if (cancelled) break;

        setCurrentLineIndex(i);
        setIsVisible(true);
        await new Promise((r) => setTimeout(r, 3000));
        setIsVisible(false);
        await new Promise((r) => setTimeout(r, 800));
      }

      if (!cancelled) {
        router.push(nextURL);
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
