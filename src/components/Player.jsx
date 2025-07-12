"use client";

import {
  Pause,
  Play,
  Rewind,
  FastForward,
  Maximize,
  Minimize2,
  Volume2,
  ListMusic,
  XIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { songs } from "@/constants/musics";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMinimized, setIsMinimized] = useState(true);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const updateProgress = () => {
    if (audioRef.current && audioRef.current.duration) {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleSongEnd = () => {
      handleNext();
    };

    progressIntervalRef.current = setInterval(updateProgress, 500);

    audio.addEventListener("ended", handleSongEnd);
    return () => {
      clearInterval(progressIntervalRef.current);
      if (audio) {
        audio.addEventListener("ended", handleSongEnd);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === songs.length - 1 ? 0 : prevIndex + 1
    );
    setProgress(0);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setProgress(0);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
  };

  const handleProgressChange = (progress) => {
    const newProgress = progress;
    setProgress(newProgress);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime =
        (newProgress / 100) * audioRef.current.duration;
    }
  };

  const handleVolumeChange = (volume) => {
    const newVolume = volume / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  const selectSong = (index) => {
    setCurrentSongIndex(index);
    setProgress(0);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
    setShowPlaylist(false);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].src}
        onLoadedMetadata={() => setProgress(0)}
      />
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-card-foreground/10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <motion.div
              className="relative overflow-hidden rounded-md w-full max-w-sm"
              layout
              style={{
                backgroundImage: `url(${songs[currentSongIndex].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 bg-black/30" />

              <div className="relative z-0 p-4 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <Button
                    onClick={togglePlaylist}
                    size={"icon"}
                    variant={"outline"}
                  >
                    <ListMusic />
                  </Button>
                  <Button
                    onClick={toggleMinimize}
                    size={"icon"}
                    variant={"outline"}
                  >
                    <Minimize2 />
                  </Button>
                </div>

                <div className="text-center mb-6 bg-white/50 rounded-2xl">
                  <h2 className="text-xl font-bold">
                    {songs[currentSongIndex].title}
                  </h2>
                  <p>{songs[currentSongIndex].artist}</p>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span>
                      {formatTime(audioRef.current?.currentTime || 0)}
                    </span>
                    <span>{formatTime(audioRef.current?.duration || 0)}</span>
                  </div>

                  <Slider
                    onValueChange={(value) => handleProgressChange(value[0])}
                    defaultValue={[progress]}
                    max={100}
                    min={0}
                  />
                </div>

                <div className="flex justify-center items-center space-x-8 mb-10">
                  <Button
                    onClick={handlePrevious}
                    size={"icon"}
                    className={"size-12"}
                    variant={"secondary"}
                  >
                    <Rewind className="text-white" />
                  </Button>

                  <Button
                    onClick={togglePlayPause}
                    size={"icon"}
                    className={"size-14"}
                  >
                    {isPlaying ? (
                      <Pause className="text-white" />
                    ) : (
                      <Play className="text-white" />
                    )}
                  </Button>

                  <Button
                    onClick={handleNext}
                    size={"icon"}
                    className={"size-12"}
                    variant={"secondary"}
                  >
                    <FastForward className="text-white" />
                  </Button>
                </div>

                <div className="flex items-center">
                  <Volume2 className="text-gray-300 mr-2" />
                  <span className="text-xs text-gray-300 mr-2 w-10">
                    {Math.round(volume * 100)}%
                  </span>

                  <Slider
                    onValueChange={(value) => handleVolumeChange(value[0])}
                    defaultValue={[volume * 100]}
                    max={100}
                    min={0}
                  />
                </div>
              </div>

              {/* Playlist */}
              {showPlaylist && (
                <div className="absolute inset-0 bg-card bg-opacity-80 z-10 overflow-y-auto p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Playlist</h3>
                    <Button
                      onClick={togglePlaylist}
                      size={"icon"}
                      variant={"destructive"}
                    >
                      <XIcon />
                    </Button>
                  </div>
                  <ul className="space-y-2">
                    {songs.map((song, index) => (
                      <li
                        key={index}
                        className={`p-3 rounded-lg cursor-pointer ${
                          currentSongIndex === index
                            ? "bg-primary text-white"
                            : "bg-card-foreground text-primary-foreground hover:bg-card-foreground/80 transition-all ease-in-out"
                        }`}
                        onClick={() => selectSong(index)}
                      >
                        <h3 className="font-medium ">{song.title}</h3>
                        <p className="text-sm ">{song.artist}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            className="fixed bottom-4 right-4 z-50"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <motion.div
              className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 w-44 h-16 bg-card"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative z-0 h-full p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handlePrevious}
                    size={"icon"}
                    className={"size-8"}
                    variant={"secondary"}
                  >
                    <Rewind size={16} className="text-white" />
                  </Button>

                  <Button onClick={togglePlayPause} size={"icon"}>
                    {isPlaying ? (
                      <Pause size={16} className="text-white" />
                    ) : (
                      <Play size={16} className="text-white" />
                    )}
                  </Button>

                  <Button
                    onClick={handleNext}
                    size={"icon"}
                    className={"size-8"}
                    variant={"secondary"}
                  >
                    <FastForward className="text-white" />
                  </Button>

                  <Button
                    onClick={toggleMinimize}
                    size={"icon"}
                    className={"size-6"}
                    variant={"ghost"}
                  >
                    <Maximize />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;
