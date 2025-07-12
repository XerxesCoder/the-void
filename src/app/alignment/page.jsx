"use client";
import { Button } from "@/components/ui/button";
import VoidWhiteScreen from "@/components/VoidWhiteScreen";
import { motion } from "framer-motion";

export default function Alignment() {
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
          Would you let go of your past to witness the infinite?
        </motion.h1>
        <motion.h1 className="text-lg sm:text-2xl " variants={fadeUpVariant}>
          Do you believe the Void watches… or waits?
        </motion.h1>
        <motion.h1 className="text-lg sm:text-2xl " variants={fadeUpVariant}>
          Are you one mind, or a reflection of many?
        </motion.h1>
      </motion.div>
    </main>
  );
}
