"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center text-center px-6 bg-black">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 z-10 flex flex-col justify-center items-center text-center"
      >
        <motion.h1
          className="text-6xl sm:text-8xl font-orbitron mb-8 select-none text-white"
          variants={fadeUpVariant}
        >
          404
        </motion.h1>

        <motion.p
          className="text-xl sm:text-3xl max-w-lg font-orbitron text-white"
          variants={fadeUpVariant}
        >
          The Void did not anticipate your arrival.
        </motion.p>

        <motion.p
          className="text-md sm:text-xl max-w-md font-orbitron text-center text-gray-200"
          variants={fadeUpVariant}
        >
          ENTITY cannot locate this realm.
          <br />
          Return to the beginning... if you dare.
        </motion.p>

        <motion.button
          onClick={() => router.push("/")}
          className="px-6 py-3 border border-white text-white font-orbitron tracking-widest hover:bg-white hover:text-black transition cursor-pointer"
          variants={fadeUpVariant}
        >
          RETURN TO VOID
        </motion.button>
      </motion.div>
    </main>
  );
}
