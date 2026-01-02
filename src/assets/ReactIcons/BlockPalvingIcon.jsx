import React from "react";

function BlockPavingIcon({
  className = "",
  bgColor = "white",
  strokeColor = "#00AFE3",
  width = "76",
  height = "76"
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 76 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <rect width="75.4286" height="75.4286" rx="37.7143" fill={bgColor} />
      
      {/* Square outline */}
      <mask id="path-2-inside-1_9384_9357" fill="white">
        <rect x="19.5" y="19.2109" width="37" height="37" rx="1.69567" />
      </mask>
      <rect
        x="19.5"
        y="19.2109"
        width="37"
        height="37"
        rx="1.69567"
        stroke={strokeColor}
        strokeWidth="6.78267"
        mask="url(#path-2-inside-1_9384_9357)"
      />
      
      {/* Horizontal line */}
      <path
        d="M21.7734 37.5859H53.8918"
        stroke={strokeColor}
        strokeWidth="3.39134"
      />
      
      {/* Vertical line */}
      <path
        d="M37.8359 21.5312L37.8359 53.6496"
        stroke={strokeColor}
        strokeWidth="3.39134"
      />
    </svg>
  );
}

export default BlockPavingIcon;