import React from "react";

function FastResponseIcon({ className = "" }) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="50" height="50" rx="25" fill="#00AFE3" />
      <path
        d="M21.3646 31.849H14.0313M18.0313 24.5156H12.0312M21.3646 17.1823H14.6979M32.0313 12.5156L23.236 24.829C22.8467 25.374 22.6521 25.6465 22.6605 25.8737C22.6678 26.0715 22.7627 26.2558 22.9194 26.3767C23.0994 26.5156 23.4342 26.5156 24.104 26.5156H30.6979L29.3646 36.5156L38.1598 24.2023C38.5491 23.6573 38.7438 23.3848 38.7353 23.1576C38.728 22.9598 38.6331 22.7755 38.4765 22.6545C38.2965 22.5156 37.9616 22.5156 37.2918 22.5156H30.6979L32.0313 12.5156Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default FastResponseIcon;
