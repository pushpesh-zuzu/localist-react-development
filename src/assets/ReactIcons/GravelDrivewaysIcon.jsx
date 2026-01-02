import React from "react";

function GravelDrivewaysIcon({
  className = "",
  bgColor = "#00AFE3",
  strokeColor = "white",
  fillColor = "white",
  width = "76",
  height = "76",
  strokeWidth = "4"
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
      
      <g clipPath="url(#clip0_9384_9648)">
        {/* Main triangle outline */}
        <path
          d="M35.6113 19.7881C36.6716 17.9519 39.3215 17.9519 40.3818 19.7881L58.375 50.9531C59.4352 52.7895 58.1097 55.085 55.9893 55.085H20.0039C17.8835 55.085 16.558 52.7895 17.6182 50.9531L35.6113 19.7881Z"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Inner filled shape */}
        <path
          d="M32.1169 33.4617C24.7362 36.09 17.8354 52.6162 17.5312 53.442H58.548C57.6262 50.2733 54.953 42.7894 51.6345 38.2035C47.4865 32.4712 39.4976 30.8334 32.1169 33.4617Z"
          fill={fillColor}
        />
      </g>
      
      <defs>
        <clipPath id="clip0_9384_9648">
          <rect
            width="53"
            height="53"
            fill="white"
            transform="translate(11.5 11.6562)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default GravelDrivewaysIcon;