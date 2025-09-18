import React, { useState, useEffect } from "react";

const CircularProgress = ({
  percentage = 60, // percent of the arc
  label = "Completed",
  size = 200,
  strokeWidth = 14,
  bgStrokeWidth = 4,
  progressColor = "#9082FF",
  arcBgColor = "#CFDFFF",
  dashedBg = true,
}) => {
  const [displayPercent, setDisplayPercent] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  useEffect(() => {
    setDisplayPercent(0);
    const duration = 900;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const val = Math.round(progress * percentage);
      setDisplayPercent(val);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    return () => {};
  }, [percentage]);

  const strokeDashoffset =
    circumference - (displayPercent / 100) * circumference;

  return (
    <div className=" rounded-3xl  p-9 flex flex-col items-center justify-center min-w-[220px] min-h-[220px] relative">
      <svg width={size} height={size} className="block">
        {/* Dotted/dashed background circle */}
        {dashedBg && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={arcBgColor}
            strokeWidth={bgStrokeWidth}
            strokeDasharray="4 8"
          />
        )}
        {/* Progress arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${progressColor}55)` }}
          className="transition-all ease-linear"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center">
        <div className="text-4xl font-extrabold text-[#160783] tracking-tight mb-1">
          {displayPercent}%
        </div>
        <div className="text-base font-Open text-[#9082FF] font-semibold">
          {label}
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
