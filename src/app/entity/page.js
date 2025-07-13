"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useState } from "react";
import { motion } from "framer-motion";
import TheEntity from "@/components/Entity";
import VoidScreenEnter from "@/components/VoidScreens/VoidScreenEnter";
import { useSearchParams } from "next/navigation";
import { GALAXIES } from "@/constants/galaxy";
export default function Entity() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [isResponding, setIsResponding] = useState(false);
  const galaxySlug = searchParams.get("galaxy");
  const galaxyObject = GALAXIES.find((glx) => glx.slug == galaxySlug);

  const handleSubmit = async () => {
    await new Promise((resolve) => {
      setIsResponding(true);
      setTimeout(() => {
        resolve();
      }, 3500);
    });
    setResponse({
      text: "I am the cosmic echo of all that was and will be. Your question resonates across 13.7 billion years.",
      isGenerating: false,
    });
    setIsResponding(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, filter: "blur(140px)" },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 1.2,
      },
    },
  };

  const childFade = {
    hidden: { opacity: 0, y: 5 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <main className="w-full h-screen bg-black relative">
      <VoidScreenEnter />
      <Canvas
        camera={{
          position: [0, 0, 130],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <TheEntity
          isResponding={isResponding}
          galaxy={galaxyObject.name}
          galaxycolors={galaxyObject.colors}
          coreColorHex={galaxyObject.coreColor}
        />
        <OrbitControls />
        <Stars radius={200} depth={50} count={5555} factor={4} />
      </Canvas>

      <motion.div
        className="absolute bottom-10 left-0 right-0 mx-auto w-full max-w-2xl px-4 z-20"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={childFade}
          className="bg-black/50 backdrop-blur-2xl p-6 rounded-xl border border-violet-800 shadow-[0_0_20px_#7c3aed55]"
        >
          {response ? (
            <motion.p
              key="response"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-violet-300 mb-4 font-mono"
            >
              {response.text}
            </motion.p>
          ) : (
            <motion.p
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-violet-500 mb-4 font-mono italic"
            >
              Ask your question to the cosmic consciousness...
            </motion.p>
          )}

          <motion.div variants={childFade} className="flex gap-3">
            <motion.input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-gray-950 text-white px-4 py-2 rounded-lg border border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200 shadow-[0_0_12px_#6b21a855]"
              placeholder="What is the nature of existence?"
            />
            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-violet-700 to-indigo-900 text-white px-6 py-2 rounded-lg shadow-lg border border-violet-500 hover:shadow-[0_0_20px_#7c3aedaa] transition-all font-orbitron tracking-widest"
            >
              ASK
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
