"use client";

import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext} from "react";
import dynamic from "next/dynamic";
import { Button } from "./Button";
import { Badge } from "./Badge";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Minimize2} from "lucide-react";
import { cn } from "../../utils/cn";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  src?: string;
}

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  playlist: Track[];
  setPlaylist: (tracks: Track[]) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
};

interface AudioProviderProps {
  children: React.ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);

    // Find track in playlist or add it
    const trackIndex = playlist.findIndex((t) => t.id === track.id);
    if (trackIndex >= 0) {
      setCurrentIndex(trackIndex);
    } else {
      setPlaylist((prev) => [...prev, track]);
      setCurrentIndex(playlist.length);
    }
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const resumeTrack = () => {
    setIsPlaying(true);
  };

  const nextTrack = () => {
    if (playlist.length > 0 && currentIndex < playlist.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentTrack(playlist[nextIndex]);
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    if (playlist.length > 0 && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentTrack(playlist[prevIndex]);
      setIsPlaying(true);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        pauseTrack,
        resumeTrack,
        nextTrack,
        prevTrack,
        playlist,
        setPlaylist,
      }}
    >
      {children}
      <GlobalAudioPlayer />
    </AudioContext.Provider>
  );
}

function GlobalAudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    pauseTrack,
    resumeTrack,
    nextTrack,
    prevTrack,
    playlist,
  } = useAudio();
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Visual equalizer state
  const [audioData, setAudioData] = useState<number[]>(new Array(20).fill(0));
  const animationRef = useRef<number>();

  // Simulate audio progress and equalizer
  useEffect(() => {
    if (isPlaying && currentTrack) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= 180) {
            // 3 minutes demo duration
            pauseTrack();
            return 0;
          }
          return newTime;
        });
      }, 1000);

      // Simulate equalizer animation
      const animateEqualizer = () => {
        setAudioData((prev) => prev.map(() => Math.random() * 100));
        animationRef.current = requestAnimationFrame(animateEqualizer);
      };
      animateEqualizer();

      return () => {
        clearInterval(interval);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setAudioData(new Array(20).fill(0));
    }
  }, [isPlaying, currentTrack, pauseTrack]);

  useEffect(() => {
    if (currentTrack) {
      setDuration(180); // 3 minutes demo duration
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      resumeTrack();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!currentTrack) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50 transition-all duration-300",
        isMinimized ? "h-2" : "h-16"
      )}
    >
      {isMinimized ? (
        // Minimized view - just progress bar
        <div className="relative h-full">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
          <button
            onClick={() => setIsMinimized(false)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-white hover:text-primary-200"
          >
            ↓
          </button>
        </div>
      ) : (
        // Full view
        <div className="flex items-center justify-between h-full px-4">
          {/* Left side - Track info and controls */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            {/* Play/Pause */}
            <Button
              variant="glass"
              size="sm"
              onClick={togglePlay}
              className="flex-shrink-0"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>

            {/* Previous/Next */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevTrack}
                disabled={playlist.length === 0}
                className="p-1"
              >
                <SkipBack size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextTrack}
                disabled={playlist.length === 0}
                className="p-1"
              >
                <SkipForward size={14} />
              </Button>
            </div>

            {/* Track info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-basement text-foreground truncate">
                    {currentTrack.title}
                  </div>
                  <div className="text-xs text-muted-foreground font-kabel truncate">
                    {currentTrack.artist}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground font-kabel flex-shrink-0">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </div>
          </div>

          {/* Center - Visual Equalizer */}
          <div className="flex items-center justify-center space-x-1 px-4">
            {audioData.map((height, index) => (
              <div
                key={index}
                className="w-1 bg-gradient-to-t from-primary-500 to-secondary-500 rounded-full transition-all duration-75"
                style={{
                  height: `${Math.max(2, height * 0.3)}px`,
                  opacity: isPlaying ? 1 : 0.3,
                }}
              />
            ))}
          </div>

          {/* Right side - Volume and controls */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Volume */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="p-1"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </Button>
              <div className="w-16 h-1 bg-muted rounded-full">
                <div
                  className="h-full bg-primary-500 rounded-full transition-all"
                  style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                />
              </div>
            </div>

            {/* Now Playing badge */}
            <Badge variant="primary" className="text-xs">
              Now Playing
            </Badge>

            {/* Minimize button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="p-1"
            >
              <Minimize2 size={14} />
            </Button>
          </div>
        </div>
      )}

      {/* Progress bar at bottom */}
      {!isMinimized && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
