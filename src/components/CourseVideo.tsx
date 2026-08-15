interface Props {
  src: string;
  poster?: string;
  title: string;
  className?: string;
}

// Self-hosted from /public — served directly by Vercel's static asset
// CDN with native HTTP range-request support (seeking works, no
// extra infra). `preload="metadata"` keeps the initial page load
// light; the video body only downloads once someone hits play.
export function CourseVideo({ src, poster, title, className }: Props) {
  return (
    <div className={`rounded-xl overflow-hidden border border-gray-800 bg-black ${className ?? ''}`}>
      <video
        controls
        preload="metadata"
        poster={poster}
        className="w-full aspect-video"
        aria-label={title}
      >
        <source src={src} type="video/mp4" />
        Your browser doesn&apos;t support embedded video.{' '}
        <a href={src} className="underline">Download the video</a> instead.
      </video>
    </div>
  );
}
