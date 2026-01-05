import React from "react";

const CuttingToolIcon = ({
  size = 76,
  bgColor = "#00AFE3",
  strokeColor = "#FFFFFF",
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 76 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect
        width="75.4286"
        height="75.4286"
        rx="37.7143"
        fill={bgColor}
      />

      <g clipPath="url(#clip0)">
        <path d="M21.142 29.558L26.7333 23.9668" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24.2045 32.6291L26.441 30.3926" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M41.185 49.6232L43.4215 47.3867" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M44.3842 52.8157L49.9755 47.2227" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path
          d="M22.5826 42.4648C22.4707 42.5767 18.0376 53.8598 18.0376 53.8598C17.6579 54.7766 18.6795 55.9005 19.6721 55.4945C19.6721 55.4945 31.0141 51.1186 31.1262 51.0066"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M19.7612 49.4922L24.0679 53.7989" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path
          d="M55.7617 21.4955L51.7883 17.5221C50.5922 16.326 48.653 16.326 47.4569 17.5221L22.5502 42.4288L31.1642 51.0428L55.7617 26.4452C57.1286 25.0784 57.1286 22.8624 55.7617 21.4955Z"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M36.2325 24.2822L28.0581 16.1074L17.8178 26.3477L25.9922 34.522" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M39.0912 47.621L47.5297 56.0593L57.7699 45.8195L49.3315 37.3809" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M27.4721 47.3619L47.7756 27.0566" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>

      <defs>
        <clipPath id="clip0">
          <rect width="42" height="42" fill="white" transform="translate(16.7143 14.9688)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CuttingToolIcon;
