import { useRef, useState, useEffect } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songs = [
    {
      src: "/audio/YUKON.mp3",
      cover: "/album-covers/SWAG.png",
      title: "YUKON",
    },
  ];

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Runs after re-render so the audio element's src is already updated
  // before play() is called — fixes the race condition in next/prev.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(err => console.log("Play failed:", err));
    } else {
      audio.pause();
    }
  }, [index, isPlaying]);

  const playPause = () => {
    setIsPlaying(prev => !prev);
  };

  const next = () => {
    setIndex(i => (i + 1) % songs.length);
    setIsPlaying(true);
  };

  const prev = () => {
    setIndex(i => (i - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  return (
    <div className="music-player">
      <div className="ipod-img">
        <img
          src={songs[index].cover}
          className="album-cover"
          alt="album cover"
        />
        <img
          src="src/images/ipod.png"
          className="ipod-frame"
          alt="iPod"
        />
        <button className="btn play" onClick={playPause} />
        <button className="btn next" onClick={next} />
        <button className="btn prev" onClick={prev} />
      </div>

      <audio
        ref={audioRef}
        src={songs[index].src}
        onLoadedMetadata={() => {
            if (audioRef.current) {
            audioRef.current.volume = 0.5;
            }
        }}
        />
    </div>
  );
}