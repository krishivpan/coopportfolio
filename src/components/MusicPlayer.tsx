import { useRef, useState, useEffect } from "react";

interface MusicPlayerProps {
  onPlayingChange: (playing: boolean) => void;
}

const FADE_DURATION = 1500; // ms — match your CSS transition duration in App.tsx
const FADE_INTERVAL = 16;   // ms between volume steps (~60fps)

const HINT_DURATION = 15000; // ms the "click me" hint stays visible before fading

export default function MusicPlayer({ onPlayingChange }: MusicPlayerProps) {
  const audioRef  = useRef<HTMLAudioElement | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const songs = [
    { src: "/audio/YUKON.mp3", cover: "/album-covers/SWAG.png", title: "YUKON" },
  ];

  const [index, setIndex]     = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint]   = useState(true);
  const [hintLeaving, setHintLeaving] = useState(false);

  useEffect(() => {
    onPlayingChange(isPlaying);
  }, [isPlaying, onPlayingChange]);

  // ── "Click me" hint on the play button ──────────────────────────────────────

  useEffect(() => {
    const startFade = setTimeout(() => setHintLeaving(true), HINT_DURATION);
    const unmount    = setTimeout(() => setShowHint(false), HINT_DURATION + 400);
    return () => {
      clearTimeout(startFade);
      clearTimeout(unmount);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    setHintLeaving(true);
    const unmount = setTimeout(() => setShowHint(false), 400);
    return () => clearTimeout(unmount);
  }, [isPlaying]);

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
        <img src="/images/ipod.png" className="ipod-frame" alt="iPod" />
        <button className="btn play" onClick={playPause} />
        <button className="btn next" onClick={next} />
        <button className="btn prev" onClick={prev} />

        {showHint && (
          <div className={`play-hint ${hintLeaving ? "play-hint--leaving" : ""}`} aria-hidden="true">
            <svg className="play-hint-arrow" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 84 C 20 78, 28 75, 40 72 C 70 65, 95 40, 81 10"
                stroke="#FDFDFD"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M66 24 L81 10 L92 26"
                stroke="#FDFDFD"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span className="play-hint-text">click me!</span>
          </div>
        )}
      </div>
      <audio ref={audioRef} src={songs[index].src} onEnded={next} />
    </div>
  );
}