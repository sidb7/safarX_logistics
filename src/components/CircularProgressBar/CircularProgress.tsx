import React, { useState, useEffect } from "react";

const CircularProgress = ({
  percentage = 50,
  size = 270,
  strokeWidth = 24,
  circleStrokeWidth = 10,
  circleColor = "#e2e8f0",
  progressColor = "#7CCA62",
  label = "Completed",
}) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);

  // Calculate dimensions
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const center = size / 2;

  useEffect(() => {
    // Reset displayPercentage and animate to new percentage
    setDisplayPercentage(0); // Start from 0
    const increment = percentage / 100; // Controls the speed of increment
    let currentPercentage = 0;

    const interval = setInterval(() => {
      // Incrementally update displayPercentage and keep in sync with circle
      currentPercentage += increment;
      setDisplayPercentage(Math.min(currentPercentage, percentage));

      if (currentPercentage >= percentage) {
        clearInterval(interval); // Stop the interval when target is reached
      }
    }, 10); // Adjust this delay for speed as needed

    return () => clearInterval(interval);
  }, [percentage]); // Re-run animation whenever `percentage` changes

  const strokeDashoffset =
    circumference - (displayPercentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform rotate-180" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={circleColor}
          strokeWidth={circleStrokeWidth}
        />

        {/* Progress circle */}
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
          className="transition-all ease-linear"
          transform={`rotate(-60 ${center} ${center})`}
        />
      </svg>

      {/* Percentage text with customizable label */}
      <div className="absolute items-center flex flex-col gap-y-3">
        <div className="text-4xl font-bold leading-5 ">
          {Math.round(displayPercentage)}%
        </div>
        <div className="text-lg font-Open text-[#8F8E9E] font-semibold leading-6">
          {label}
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
