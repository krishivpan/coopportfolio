import { useRef, useState } from "react";

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

const playPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
        audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Play failed:", err));
    } else {
        audio.pause();
        setIsPlaying(false);
    }
};

  const next = () => {
    const newIndex = (index + 1) % songs.length;
    setIndex(newIndex);

    setTimeout(() => {
      audioRef.current?.play();
    }, 0);

    setIsPlaying(true);
  };

  const prev = () => {
    const newIndex = (index - 1 + songs.length) % songs.length;
    setIndex(newIndex);

    setTimeout(() => {
      audioRef.current?.play();
    }, 0);

    setIsPlaying(true);
  };

  return (
    <div className="music-player">
      <div className="ipod-img">
        {/* 🎵 Album cover (behind) */}
        <img
          src={songs[index].cover}
          className="album-cover"
          alt="album cover"
        />

        {/* 🎧 iPod frame (on top) */}
        <img
          src="src/images/ipod.png"
          className="ipod-frame"
          alt="iPod"
        />

        {/* 🫥 Invisible buttons */}
        <button className="btn play" onClick={playPause} />
        <button className="btn next" onClick={next} />
        <button className="btn prev" onClick={prev} />
      </div>

      <audio
        ref={audioRef}
        src={songs[index].src}
        onEnded={next}
      />
    </div>
  );
}