import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import musicList from "../../json/music-list.json";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const basePath = "public/music-assets";
  const [songIndex, setSongIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(new Audio()); // Create a new Audio instance

  const handlePrevSong = () => {
    setSongIndex((prev) => (prev > 0 ? prev - 1 : musicList.length - 1));
  };

  const handleNextSong = () => {
    setSongIndex((prev) => (prev < musicList.length - 1 ? prev + 1 : 0));
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsMusicPlaying(true);
    } else {
      audio.pause();
      setIsMusicPlaying(false);
    }
  };

  const handleSongEnd = () => {
    handleNextSong(); // Automatically play the next song when the current one ends
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Update the audio source
      audio.src = `${basePath}/${musicList[songIndex]?.audioSrc}`;
      audio.load(); // Load the new audio source
  
      // Automatically play only if isMusicPlaying is true
      if (isMusicPlaying) {
        audio.play();
      }
  
      // Add event listener for when the song ends
      audio.addEventListener("ended", handleSongEnd);
  
      // Clean up the event listener when the component unmounts or songIndex changes
      return () => {
        audio.pause(); // Pause the audio when cleaning up
        audio.removeEventListener("ended", handleSongEnd);
      };
    }
  }, [songIndex, basePath, isMusicPlaying]);
  

  return (
    <MusicPlayerContext.Provider
      value={{
        basePath,
        songIndex,
        setSongIndex,
        isMusicPlaying,
        setIsMusicPlaying,
        audioRef,
        handlePrevSong,
        handleNextSong,
        handlePlayPause,
        handleSongEnd,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
