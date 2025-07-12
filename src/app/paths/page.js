"use client";
import { Button } from "@/components/ui/button";
import VoidWhiteScreen from "@/components/VoidWhiteScreen";
import { motion } from "framer-motion";

export default function Paths() {
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
        staggerChildren: 0.15,
        delayChildren: 2.5,
      },
    },
  };

  const buttonVariant = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
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
          You Have Entered The Void
        </motion.h1>
        <motion.h1 className="text-lg sm:text-2xl " variants={fadeUpVariant}>
          Choose Your PATH
        </motion.h1>
        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 mt-6"
          variants={buttonContainer}
          initial="hidden"
          animate="show"
        >
          {["Nebula", "Andromeda", "Milky Way", "Eye of GOD", "PX-64"].map(
            (label, index) => (
              <motion.div key={index} variants={buttonVariant}>
                <Button variant={"outline"}>{label}</Button>
              </motion.div>
            )
          )}
        </motion.div>
      </motion.div>
    </main>
  );
}
