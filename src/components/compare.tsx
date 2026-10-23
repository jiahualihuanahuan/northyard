import { useRef, useState } from "react";

type CompareProps = {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
  transitionName?: string;
};

export function Compare({ before, after, beforeLabel, afterLabel, alt, transitionName }: CompareProps) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const [x, setX] = useState(52);

  function setFrom(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    let next = ((clientX - rect.left) / rect.width) * 100;
    if (Math.abs(next - 50) < 2.2) next = 50;
    setX(Math.min(94, Math.max(6, next)));
  }

  return (
    <div
      ref={ref}
      className="compare"
      role="slider"
      tabIndex={0}
      aria-valuemin={6}
      aria-valuemax={94}
      aria-valuenow={Math.round(x)}
      aria-label={`${beforeLabel} / ${afterLabel}`}
      onPointerDown={(event) => {
        drag.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        setFrom(event.clientX);
      }}
      onPointerMove={(event) => {
        if (drag.current) setFrom(event.clientX);
      }}
      onPointerUp={() => {
        drag.current = false;
      }}
      onPointerCancel={() => {
        drag.current = false;
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") setX((v) => Math.max(6, v - 4));
        if (event.key === "ArrowRight") setX((v) => Math.min(94, v + 4));
      }}
    >
      <img
        className="compare-img"
        src={after}
        alt={alt}
        draggable={false}
        style={transitionName ? { viewTransitionName: transitionName } : undefined}
      />
      <div className="compare-clip" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
        <img className="compare-img" src={before} alt="" draggable={false} />
      </div>
      <div className="compare-bar" style={{ left: `${x}%` }}>
        <span className="compare-knob" aria-hidden="true">
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path d="M5 1 1 5l4 4M13 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
      </div>
      <span className="compare-tag eyebrow left-4">{beforeLabel}</span>
      <span className="compare-tag eyebrow right-4">{afterLabel}</span>
    </div>
  );
}
