interface VideoFrameProps {
  youtubeId: string;
  title: string;
  caption?: string;
}

// YouTube embed in a tilted polaroid frame, matching the sticky-note look
export default function VideoFrame({ youtubeId, title, caption }: VideoFrameProps) {
  return (
    <figure className="polaroid video-frame">
      <div className="video-frame-media">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      {caption && <figcaption className="video-frame-caption">{caption}</figcaption>}
    </figure>
  );
}
