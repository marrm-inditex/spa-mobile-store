import { useState } from "react";

type ImageLoaderProps = {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
};

export default function ImageLoader({
  src,
  alt,
  className = "h-full w-full object-contain",
  containerClassName = "relative h-64 w-full overflow-hidden",
}: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={containerClassName}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-linear-to-r from-stone-200 via-stone-100 to-stone-200 bg-size-[200%_100%]" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
}
