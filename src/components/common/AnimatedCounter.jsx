import React, { useEffect, useMemo, useState } from "react";

export default function AnimatedCounter({ to = 0, duration = 900, suffix = "" }) {
  const [val, setVal] = useState(0);

  const steps = useMemo(() => {
    const fps = 30;
    const totalSteps = Math.max(1, Math.round((duration / 1000) * fps));
    return totalSteps;
  }, [duration]);

  useEffect(() => {
    let raf = null;
    let start = null;

    const animate = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const next = Math.round(p * to);
      setVal(next);
      if (p < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => raf && cancelAnimationFrame(raf);
  }, [to, duration]);

  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}
