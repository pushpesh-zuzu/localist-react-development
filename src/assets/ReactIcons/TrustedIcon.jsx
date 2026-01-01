import React from "react";

function TrustedIcon({className=""}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.75806 15.5161C12.0427 15.5161 15.5161 12.0427 15.5161 7.75806C15.5161 3.4734 12.0427 0 7.75806 0C3.4734 0 0 3.4734 0 7.75806C0 12.0427 3.4734 15.5161 7.75806 15.5161Z"
        fill="white"
      />
      <path
        d="M4.26562 7.7571L6.59304 10.0845L11.2479 5.42969"
        stroke="#00AFE3"
        stroke-width="1.55161"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default TrustedIcon;
