import React from "react";

function TarmacSmallIcon({ className = "" }) {
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
      <g clip-path="url(#clip0_9416_8850)">
        <path
          d="M11.0107 5.38672H19.2168C20.9343 5.38694 22.3758 6.68116 22.5605 8.38867L23.833 20.1621C24.048 22.1513 22.49 23.8876 20.4893 23.8877H9.73828C7.73751 23.8877 6.17859 22.1513 6.39355 20.1621L7.66699 8.38867C7.8518 6.68107 9.29315 5.38678 11.0107 5.38672Z"
          fill="#00AFE3"
          stroke="#00AFE3"
          stroke-width="2.24247"
        />
        <path
          d="M15.0312 5.57031L15.0312 17.2554L15.0312 28.9406"
          stroke="white"
          stroke-width="2.24247"
          stroke-dasharray="2.8 2.8"
        />
      </g>
      <defs>
        <clipPath id="clip0_9416_8850">
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

export default TarmacSmallIcon;
