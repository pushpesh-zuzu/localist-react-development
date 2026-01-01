import React from "react";

function ThrashIcon({ className = "" }) {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="60" height="60" rx="30" fill="#00AFE3" />
      <path
        d="M25.375 16.125H34.625M16.125 20.75H43.875M40.7917 20.75L39.7105 36.9672C39.5483 39.4004 39.4672 40.6169 38.9417 41.5394C38.479 42.3515 37.7812 43.0044 36.9401 43.412C35.9847 43.875 34.7654 43.875 32.3269 43.875H27.6731C25.2346 43.875 24.0153 43.875 23.0599 43.412C22.2188 43.0044 21.521 42.3515 21.0583 41.5394C20.5328 40.6169 20.4517 39.4004 20.2895 36.9672L19.2083 20.75M26.9167 27.6875V35.3958M33.0833 27.6875V35.3958"
        stroke="white"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ThrashIcon;
