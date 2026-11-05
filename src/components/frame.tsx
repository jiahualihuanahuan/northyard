import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type FrameProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  transitionName?: string;
};

/**
 * Image frame with an optional reveal/fade. The image must never stay hidden:
 * server-rendered or cached images can finish loading before React attaches
 * onLoad, so we also check `img.complete`, treat errors as done, and force
 * visibility after a short timeout.
 */
export function Frame({ src, alt, className, imgClassName, priority, transitionName }: FrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) {
      setLoaded(true);
      return;
    }
    const t = window.setTimeout(() => setLoaded(true), 2500);
    return () => window.clearTimeout(t);
  }, [src]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.classList.add("is-in");
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      show();
      return;
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      show(); // already on screen: no reveal animation needed
      return;
    }
    el.classList.add("will-reveal");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        show();
        io.disconnect();
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("frame", className)}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={1728}
        height={1152}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={transitionName ? { viewTransitionName: transitionName } : undefined}
        className={cn(!loaded && "is-loading", imgClassName)}
      />
    </div>
  );
}
