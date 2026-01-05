import React from "react";

function RetailWallIcon({
  className = "",
  bgColor = "#00AFE3",
  strokeColor = "white",
  width = "76",
  height = "76",
  strokeWidth = "1.46484"
}) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 76 76" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="75.4286" height="75.4286" rx="37.7143" fill={bgColor}/>
      <mask 
        id="mask0_10381_9765" 
        style={{maskType: "luminance"}} 
        maskUnits="userSpaceOnUse" 
        x="12" 
        y="12" 
        width="51" 
        height="51"
      >
        <path 
          d="M62.6621 62.6621V12.7598H12.7598V62.6621H62.6621Z" 
          fill="white" 
          stroke="white" 
          strokeWidth="0.0976562"
        />
      </mask>
      <g mask="url(#mask0_10381_9765)">
        <path 
          d="M53.1836 57.5781H61.9727V50.2539H57.5781M17.832 50.2539H13.4375V57.5781H51.7187" 
          stroke={strokeColor} 
          strokeWidth={strokeWidth} 
          strokeMiterlimit="22.926"
        />
        <path 
          d="M60.4191 33.4081C60.8958 35.2432 59.5009 37.0703 57.5827 37.0703M17.8367 37.0703C15.9185 37.0703 14.5236 35.2432 15.0003 33.4081" 
          stroke={strokeColor} 
          strokeWidth={strokeWidth} 
          strokeMiterlimit="22.926"
        />
        <path 
          d="M38.4375 44.3984H61.9727V37.0743H44.8646M13.4375 42.2013V44.3984H36.9727M30.5529 37.0743H13.4375V40.7364" 
          stroke={strokeColor} 
          strokeWidth={strokeWidth} 
          strokeMiterlimit="22.926"
        />
        <path 
          d="M38.4375 31.2109H61.9727V23.8867H23.6913M22.2265 23.8867H13.4375V31.2109H36.9727" 
          stroke={strokeColor} 
          strokeWidth={strokeWidth} 
          strokeMiterlimit="22.926"
        />
        <path 
          d="M15.0003 46.5964C14.5236 48.4314 15.9185 50.2586 17.8367 50.2586C19.7865 50.2586 20.7934 51.7969 22.5729 51.7969C24.3524 51.7969 25.3593 50.2586 27.3091 50.2586C29.2589 50.2586 30.2659 51.7969 32.0453 51.7969C33.8248 51.7969 34.8318 50.2586 36.7816 50.2586H57.5827C59.5009 50.2586 60.8958 48.4314 60.4191 46.5964" 
          stroke={strokeColor} 
          strokeWidth={strokeWidth} 
          strokeMiterlimit="22.926"
        />
        <path 
          d="M45.3713 33.4091L37.7052 40.8281L30.0391 33.4091" 
          stroke={strokeColor} 
          strokeWidth={strokeWidth} 
          strokeMiterlimit="22.926"
        />
        <path 
          d="M37.7109 59.7812V62.7109" 
          stroke={strokeColor} 
          strokeWidth={strokeWidth} 
          strokeMiterlimit="22.926"
        />
        <path 
          d="M37.7109 19.498V21.6953M37.7109 12.7109V15.8359" 
          stroke={strokeColor} 
          strokeWidth={strokeWidth} 
          strokeMiterlimit="22.926"
        />
        <path 
          d="M35.5078 15.0977H39.9023V19.4922H35.5078V15.0977Z" 
          stroke={strokeColor} 
          strokeWidth={strokeWidth} 
          strokeMiterlimit="22.926"
        />
        <path 
          d="M15.6406 41.4648H17.1055M15.6406 28.2813H17.1055M59.0488 26.8163H54.6543M53.1895 26.8163H51.7246M59.0488 39.9999H54.6543M53.1895 39.9999H51.7246M59.0488 53.1835H54.6543M53.1895 53.1835H51.7246M56.7171 34.1405H58.1819M56.7171 47.3242H58.1819M39.3042 35.2083L40.3569 34.1896M15.6406 54.6484H17.1055" 
          stroke={strokeColor} 
          strokeWidth={strokeWidth} 
          strokeMiterlimit="2.613"
        />
      </g>
    </svg>
  );
}

export default RetailWallIcon;