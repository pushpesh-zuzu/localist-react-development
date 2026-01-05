import React from "react";

function ExpertInstallationIcon({
  className = "",
  bgColor = "#00AFE3",
  strokeColor = "white",
  width = "76",
  height = "76",
  strokeWidth = "4",
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
      <rect width="75.4286" height="75.4286" rx="37.7143" fill={bgColor} />
      <path
        d="M28.4193 33.3634L18.8359 38.1551L37.3169 47.3956C37.5683 47.5213 37.694 47.5842 37.8259 47.6089C37.9427 47.6308 38.0625 47.6308 38.1793 47.6089C38.3112 47.5842 38.4369 47.5213 38.6883 47.3956L57.1693 38.1551L47.5859 33.3634M28.4193 42.9468L18.8359 47.7384L37.3169 56.9789C37.5683 57.1046 37.694 57.1675 37.8259 57.1922C37.9427 57.2141 38.0625 57.2141 38.1793 57.1922C38.3112 57.1675 38.4369 57.1046 38.6883 56.9789L57.1693 47.7384L47.5859 42.9468M18.8359 28.5718L37.3169 19.3313C37.5683 19.2056 37.694 19.1427 37.8259 19.118C37.9427 19.0961 38.0625 19.0961 38.1793 19.118C38.3112 19.1427 38.4369 19.2056 38.6883 19.3313L57.1693 28.5718L38.6883 37.8122C38.4369 37.938 38.3112 38.0008 38.1793 38.0256C38.0625 38.0475 37.9427 38.0475 37.8259 38.0256C37.694 38.0008 37.5683 37.938 37.3169 37.8122L18.8359 28.5718Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ExpertInstallationIcon;
