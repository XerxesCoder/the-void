"use client";
import { motion } from "framer-motion";
export default function VoidScreenExit() {
  return (
    <motion.div
      initial={{ scale: 0, borderRadius: "100%", filter: "blur(200px)" }}
      animate={{ scale: 1, borderRadius: "0%", filter: "blur(10px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="absolute inset-0 bg-gradient-to-br from-zinc-950  via-gray-950  to-black  z-50 flex items-center justify-center"
    />
  );
}
