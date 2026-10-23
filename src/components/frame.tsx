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

export function Frame({ src, alt, className, imgClassName, priority, transitionName }: FrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      el.classList.add("will-reveal");
      inner = requestAnimationFrame(() => {
        const io = new IntersectionObserver(
          ([entry]) => {
            if (!entry?.isIntersecting) return;
            el.classList.add("is-in");
            io.disconnect();
          },
          { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
        );
        io.observe(el);
        el.dataset.io = "1";
        (el as HTMLDivElement & { _io?: IntersectionObserver })._io = io;
      });
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
      const io = (el as HTMLDivElement & { _io?: IntersectionObserver })._io;
      io?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={cn("frame", className)}>
      <img
        src={src}
        alt={alt}
        width={1728}
        height={1152}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={transitionName ? { viewTransitionName: transitionName } : undefined}
        className={cn(!loaded && "is-loading", imgClassName)}
      />
    </div>
  );
}
