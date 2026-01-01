import React from "react";

function PlayIcon({className=''}) {
  return (
    <svg
      width="108"
      height="108"
      viewBox="0 0 108 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="53.5234"
        cy="53.5234"
        r="53.5234"
        fill="#00AFE3"
        fill-opacity="0.8"
      />
      <path
        d="M70.8281 51.7953C72.1615 52.5651 72.1615 54.4896 70.8281 55.2594L46.377 69.3763C45.0436 70.1461 43.377 69.1838 43.377 67.6442L43.377 39.4105C43.377 37.8709 45.0436 36.9086 46.377 37.6784L70.8281 51.7953Z"
        fill="white"
      />
    </svg>
  );
}

export default PlayIcon;
