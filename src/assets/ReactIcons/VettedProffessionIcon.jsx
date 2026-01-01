import React from "react";

function VettedProffessionIcon({className=''}) {
  return (
    <div>
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
          d="M21 25.5642L24.1111 28.6753L30.3333 22.4531"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M24.072 38.3828C24.3671 38.555 24.5147 38.6411 24.723 38.6858C24.8847 38.7205 25.1205 38.7205 25.2822 38.6858C25.4905 38.6411 25.6381 38.555 25.9333 38.3828C28.5307 36.8675 35.6693 32.1076 35.6693 25.563V19.1864C35.6693 18.1204 35.6693 17.5874 35.4949 17.1293C35.3409 16.7245 35.0906 16.3633 34.7657 16.077C34.3979 15.7529 33.8989 15.5657 32.9007 15.1914L25.7517 12.5105C25.4745 12.4066 25.3359 12.3546 25.1933 12.334C25.0668 12.3157 24.9384 12.3157 24.8119 12.334C24.6693 12.3546 24.5307 12.4066 24.2535 12.5105L17.1045 15.1914C16.1063 15.5657 15.6073 15.7529 15.2395 16.077C14.9146 16.3633 14.6643 16.7245 14.5103 17.1293C14.3359 17.5874 14.3359 18.1204 14.3359 19.1864V25.563C14.3359 32.1076 21.4746 36.8675 24.072 38.3828Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

export default VettedProffessionIcon;
