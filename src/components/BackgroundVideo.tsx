export default function BackgroundVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline          // required for autoplay on iOS
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover", // scales to fill any screen, crops edges if needed
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      {/* WebM first — better compression, supported by Chrome/Firefox */}
      <source src="/videos/justin-dance.webm" type="video/webm" />
      {/* MP4 fallback — Safari + older browsers */}
    </video>
  );
}