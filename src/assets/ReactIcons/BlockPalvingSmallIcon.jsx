import React from "react";

function BlockPalvingSmallIcon({className=''}) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clip-path="url(#clip0_9384_10094)">
        <mask id="path-3-inside-1_9384_10094" fill="white">
          <rect
            x="4.91406"
            y="5.1875"
            width="19.6212"
            height="19.6212"
            rx="0.899218"
          />
        </mask>
        <rect
          x="4.91406"
          y="5.1875"
          width="19.6212"
          height="19.6212"
          rx="0.899218"
          stroke="#00AFE3"
          stroke-width="3.59687"
          mask="url(#path-3-inside-1_9384_10094)"
        />
        <path
          d="M6.11719 14.9375H23.1496"
          stroke="#00AFE3"
          stroke-width="1.79844"
        />
        <path
          d="M14.6406 6.42188L14.6406 23.4543"
          stroke="#00AFE3"
          stroke-width="1.79844"
        />
      </g>
      <defs>
        <clipPath id="clip0_9384_10094">
          <rect width="30" height="30" rx="15" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default BlockPalvingSmallIcon;
