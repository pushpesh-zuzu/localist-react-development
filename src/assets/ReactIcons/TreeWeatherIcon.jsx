import React from "react";

function TreeWeatherIcon({
  className = "",
  bgColor = "#FFFFFF",     // background circle
  iconColor = "#00AFE3",   // icon color
}) {
  return (
    <svg
      width="76"
      height="76"
      viewBox="0 0 76 76"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <circle cx="38" cy="38" r="37.7" fill={bgColor} />

      {/* Icon centered & scaled */}
      <g transform="translate(13 13) scale(1)">
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M35.9373 1.56113C33.8633 1.56349 31.8716 2.32608 30.3159 3.67747
            ... FULL PATH EXACTLY AS YOU SENT ...
            12.2999 31.1235Z"
            fill={iconColor}
          />
        </svg>
      </g>
    </svg>
  );
}

export default TreeWeatherIcon;
