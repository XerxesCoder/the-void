"use client";

import { createContext, useContext, useState, useRef } from "react";
import { soundEffetcs } from "@/constants/effects";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [currentSoundEffect, setCurrentSoundEffect] = useState(soundEffetcs[0]);
  const audioRef = useRef(null);

  const playEffect = (effectKey) => {
    const effect = soundEffetcs.find((eff) => eff.key === effectKey);

    if (effect) {
      setCurrentSoundEffect(effect);

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      }, 0);
    }
  };

  return (
    <SoundContext.Provider value={{ playEffect }}>
      {children}
      <audio ref={audioRef} src={currentSoundEffect.src} preload="auto" />
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
