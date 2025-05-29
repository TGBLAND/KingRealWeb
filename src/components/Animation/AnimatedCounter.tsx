"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

export default function AnimatedCounter({
  end,
  suffix = "+",
  duration = 2,
  className = "",
}: {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (inView) setStartCount(true);
  }, [inView]);

  return (
    <div ref={ref} className={className}>
      {startCount ? (
        <CountUp end={end} duration={duration} suffix={suffix} />
      ) : (
        `0${suffix}`
      )}
    </div>
  );
}
