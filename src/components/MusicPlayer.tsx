import { useRef, useState, useEffect } from "react";

interface MusicPlayerProps {
  onPlayingChange: (playing: boolean) => void;
}

const FADE_DURATION = 1500; // ms — match your CSS transition duration in App.tsx
const FADE_INTERVAL = 16;   // ms between volume steps (~60fps)

export default function MusicPlayer({ onPlayingChange }: MusicPlayerProps) {
  const audioRef  = useRef<HTMLAudioElement | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const songs = [
    { src: "/audio/YUKON.mp3", cover: "/album-covers/SWAG.png", title: "YUKON" },
  ];

  const [index, setIndex]     = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    onPlayingChange(isPlaying);
  }, [isPlaying, onPlayingChange]);

  // ── Fade helpers ────────────────────────────────────────────────────────────

  const clearFade = () => {
    if (fadeTimer.current !== null) {
      clearInterval(fadeTimer.current);
      fadeTimer.current = null;
    }
  };

  const fadeIn = () => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFade();
    audio.volume = 0;
    audio.play().catch(err => console.log("Play failed:", err));

    const steps     = FADE_DURATION / FADE_INTERVAL;
    const increment = 1 / steps;

    fadeTimer.current = setInterval(() => {
      if (!audioRef.current) return clearFade();
      const next = Math.min(audioRef.current.volume + increment, 1);
      audioRef.current.volume = next;
      if (next >= 1) clearFade();
    }, FADE_INTERVAL);
  };

  const fadeOut = (onComplete?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFade();

    const steps     = FADE_DURATION / FADE_INTERVAL;
    const decrement = 1 / steps;

    fadeTimer.current = setInterval(() => {
      if (!audioRef.current) return clearFade();
      const next = Math.max(audioRef.current.volume - decrement, 0);
      audioRef.current.volume = next;
      if (next <= 0) {
        clearFade();
        audioRef.current.pause();
        onComplete?.();
      }
    }, FADE_INTERVAL);
  };

  // ── Drive audio from state ──────────────────────────────────────────────────

  useEffect(() => {
    if (isPlaying) {
      fadeIn();
    } else {
      fadeOut();
    }
    // Cleanup fade if component unmounts mid-fade
    return clearFade;
  }, [index, isPlaying]);

  // ── Controls ────────────────────────────────────────────────────────────────

  const playPause = () => setIsPlaying(prev => !prev);
  const next = () => { setIndex(i => (i + 1) % songs.length); setIsPlaying(true); };
  const prev = () => { setIndex(i => (i - 1 + songs.length) % songs.length); setIsPlaying(true); };

  return (
    <div className="music-player">
      <div className="ipod-img">
        <img src={songs[index].cover} className="album-cover" alt="album cover" />
        <img src="src/images/ipod.png" className="ipod-frame" alt="iPod" />
        <button className="btn play" onClick={playPause} />
        <button className="btn next" onClick={next} />
        <button className="btn prev" onClick={prev} />
      </div>
      <audio ref={audioRef} src={songs[index].src} onEnded={next} />
    </div>
  );
}