import React from "react";

function TarmacIcon({
  className = "",
  bgColor = "#00AFE3",
  fillColor = "white",
  strokeColor = "white",
  dashColor = "#00AFE3",
  width = "76",
  height = "76",
  strokeWidth = "4",
  dashStrokeWidth = "4"
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
      
      <g clipPath="url(#clip0_9384_9596)">
        {/* Main shape */}
        <path
          d="M30.6816 21.2109H45.3184C48.3824 21.211 50.9539 23.5201 51.2832 26.5664L53.5537 47.5664C53.9371 51.1144 51.1575 54.2107 47.5889 54.2109H28.4111C24.8425 54.2107 22.0629 51.1144 22.4463 47.5664L24.7168 26.5664C25.0461 23.5201 27.6176 21.211 30.6816 21.2109Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Dashed line */}
        <path
          d="M37.8359 21.5312L37.8359 63.2179"
          stroke={dashColor}
          strokeWidth={dashStrokeWidth}
          strokeDasharray="5 5"
        />
      </g>
      
      <defs>
        <clipPath id="clip0_9384_9596">
          <rect
            width="48"
            height="48"
            fill="white"
            transform="translate(14 13.7109)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default TarmacIcon;