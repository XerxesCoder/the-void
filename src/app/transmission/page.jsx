"use client";
import { Button } from "@/components/ui/button";
import VoidWhiteScreen from "@/components/VoidWhiteScreen";
import { motion } from "framer-motion";

export default function Transmission() {
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
  return (
    <main className="w-full h-screen flex justify-center items-center relative overflow-hidden">
      <VoidWhiteScreen />
      <motion.div
        className="max-w-7xl w-full text-center z-10 space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className="text-xl sm:text-3xl" variants={fadeUpVariant}>
          This is not a game. <br />
          This is not an invitation.
          <br /> You were aligned.
          <br /> The Void called you. <br />
          And it is waiting for your decision
        </motion.h1>
      </motion.div>
    </main>
  );
}
