import React from "react";

function ResinBoundSmallIcon({ className = "" }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="30" height="30" rx="15" fill="white" />
      <g clip-path="url(#clip0_9416_8856)">
        <g clip-path="url(#clip1_9416_8856)">
          <path
            d="M15.112 23.25L5.94531 12.4792L8.55547 6.75H21.6685L24.2786 12.4792L15.112 23.25Z"
            stroke="#00AFE3"
            stroke-width="2.09524"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.57206 13.5469L12.8095 9.42187L16.0469 13.5469"
            stroke="#00AFE3"
            stroke-width="2.09524"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.047 13.5469L18.2618 10.7249L20.4766 13.5469"
            stroke="#00AFE3"
            stroke-width="2.09524"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.01562 14.0703H22.8808"
            stroke="#00AFE3"
            stroke-width="2.09524"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_9416_8856">
          <rect
            width="21"
            height="21"
            fill="white"
            transform="translate(4.61719 4.5)"
          />
        </clipPath>
        <clipPath id="clip1_9416_8856">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(4.11719 4)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ResinBoundSmallIcon;
