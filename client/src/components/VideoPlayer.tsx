import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  title?: string;
  description?: string;
}

export default function VideoPlayer({ src, poster, className = "", title, description }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleLoadStart = () => {
      if (!video.paused) setIsLoading(true);
    };
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };
    const handleCanPlay = () => setIsLoading(false);
    const handleSeeking = () => setIsLoading(true);
    const handleSeeked = () => setIsLoading(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("seeking", handleSeeking);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("seeking", handleSeeking);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(err => console.error("Error playing video:", err));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = Number(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const val = Number(e.target.value);
    setVolume(val);
    video.volume = val;
    const muted = val === 0;
    setIsMuted(muted);
    video.muted = muted;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    video.muted = nextMute;
    if (!nextMute && volume === 0) {
      setVolume(0.5);
      video.volume = 0.5;
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => console.error(err));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(err => console.error(err));
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl border border-[oklch(0.78_0.16_85/15%)] bg-black group select-none shadow-[0_4px_30px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Aspect Ratio Box */}
      <div className="relative aspect-video w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
            <Loader2 className="w-12 h-12 text-[oklch(0.78_0.16_85)] animate-spin" />
          </div>
        )}

        {/* Big play button overlay (displays when paused) */}
        <AnimatePresence>
          {!isPlaying && !isLoading && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={togglePlay}
              className="absolute w-20 h-20 rounded-full bg-[oklch(0.78_0.16_85)] text-slate-950 flex items-center justify-center shadow-[0_0_30px_oklch(0.78_0.16_85/40%)] hover:scale-110 active:scale-95 transition-all duration-300 z-10"
              style={{ top: "calc(50% - 40px)", left: "calc(50% - 40px)" }}
            >
              <Play size={32} className="ml-1 fill-current" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Dynamic Glass Controls Overlay */}
        <AnimatePresence>
          {(isHovered || !isPlaying) && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2 z-20"
            >
              {/* Title & Desc (optional) */}
              {(title || description) && (
                <div className="px-1 text-left hidden sm:block">
                  {title && <h4 className="text-[oklch(0.94_0.01_85)] font-bold text-sm tracking-wide font-display">{title}</h4>}
                  {description && <p className="text-[oklch(0.58_0.015_85)] text-xs font-body mt-0.5 line-clamp-1">{description}</p>}
                </div>
              )}

              {/* Progress Slider */}
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10 hover:bg-white/20 transition-colors slider-gold"
                  style={{
                    background: `linear-gradient(to right, oklch(0.78_0.16_85) 0%, oklch(0.78_0.16_85) ${(currentTime / (duration || 1)) * 100}%, rgba(255, 255, 255, 0.1) ${(currentTime / (duration || 1)) * 100}%, rgba(255, 255, 255, 0.1) 100%)`
                  }}
                />
              </div>

              {/* Bottom Buttons Row */}
              <div className="flex items-center justify-between text-white/90">
                <div className="flex items-center gap-4">
                  {/* Play/Pause */}
                  <button onClick={togglePlay} className="hover:text-[oklch(0.78_0.16_85)] transition-colors p-1" aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                  </button>

                  {/* Volume Group */}
                  <div className="flex items-center gap-2 group/volume">
                    <button onClick={toggleMute} className="hover:text-[oklch(0.78_0.16_85)] transition-colors p-1" aria-label={isMuted ? "Unmute" : "Mute"}>
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 rounded-full appearance-none bg-white/25 cursor-pointer slider-gold-sm opacity-60 group-hover/volume:opacity-100 transition-opacity"
                    />
                  </div>

                  {/* Time indicator */}
                  <span className="text-xs font-mono-lux tracking-wide text-zinc-400">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Fullscreen */}
                  <button onClick={toggleFullscreen} className="hover:text-[oklch(0.78_0.16_85)] transition-colors p-1" aria-label="Toggle Fullscreen">
                    {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
