import React from "react";

function QuicAlarmIcon({className=''}) {
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
        d="M37.7135 32.6094V40.776L42.8177 43.8385M37.7135 23.4219C28.1291 23.4219 20.3594 31.1916 20.3594 40.776C20.3594 50.3605 28.1291 58.1302 37.7135 58.1302C47.298 58.1302 55.0677 50.3605 55.0677 40.776C55.0677 31.1916 47.298 23.4219 37.7135 23.4219ZM37.7135 23.4219V17.2969M33.6302 17.2969H41.7969M54.7185 24.6306L51.656 21.5681L53.1873 23.0994M20.7085 24.6306L23.771 21.5681L22.2398 23.0994"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default QuicAlarmIcon;
