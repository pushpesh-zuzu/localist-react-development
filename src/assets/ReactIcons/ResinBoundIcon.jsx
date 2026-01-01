import React from "react";

function ResinBoundIcon({ className = "" }) {
  return (
    <svg
      width="76"
      height="76"
      viewBox="0 0 76 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="75.4286" height="75.4286" rx="37.7143" fill="#00AFE3" />
      <path
        d="M38 53.4609L20.5 32.8984L25.483 21.9609H50.517L55.5 32.8984L38 53.4609Z"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M27.4202 34.9375L33.6007 27.0625L39.7812 34.9375"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M39.7857 34.9375L44.014 29.55L48.2422 34.9375"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M22.5234 35.9375H52.8114" stroke="white" stroke-width="4" />
    </svg>
  );
}

export default ResinBoundIcon;
