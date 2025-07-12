"use client";
import { motion } from "framer-motion";
export default function VoidWhiteScreen() {
  return (
    <motion.div
      initial={{ scale: 1, borderRadius: "0%", filter: "blur(10px)" }}
      animate={{ scale: 0, borderRadius: "100%", filter: "blur(200px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="absolute inset-0 bg-white z-50 flex items-center justify-center"
    />
  );
}
