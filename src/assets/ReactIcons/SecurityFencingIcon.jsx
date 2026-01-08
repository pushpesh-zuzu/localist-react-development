import React from "react";

function SecurityFencingIcon({
  size = 76,
  bgColor = "#00AFE3",
  iconColor = "white",
  showBackground = true,
  strokeWidth = 1.46484,
  className = "",
  ...props
}) {
  const viewBoxSize = 76;
  const scale = size / viewBoxSize;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 76 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {showBackground && (
        <rect width="75.4286" height="75.4286" rx="37.7143" fill={bgColor} />
      )}
      <g clipPath="url(#clip0_10788_2107)">
        <mask
          id="mask0_10788_2107"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="12"
          y="12"
          width="51"
          height="51"
        >
          <path
            d="M12.7109 12.7109H62.7109V62.7109H12.7109V12.7109Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_10788_2107)">
          <path
            d="M13.4375 59.5312V31.0641C13.4375 30.5157 13.882 30.0712 14.4304 30.0712H16.1479C16.6963 30.0712 17.1407 30.5157 17.1407 31.0641V59.5312"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35.7109 59.5312V31.0641C35.7109 30.5157 36.1555 30.0712 36.7038 30.0712H38.718C39.2662 30.0712 39.7107 30.5157 39.7107 31.0641V59.5312"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M58.2734 59.5312V31.0641C58.2734 30.5157 58.718 30.0712 59.2663 30.0712H60.9838C61.5322 30.0712 61.9767 30.5157 61.9767 31.0641V59.5312"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23.3345 31.3288L20.2414 34.4219L17.1484 31.3288"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M29.5143 31.3288L26.4212 34.4219L23.3281 31.3288"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35.7017 31.3288L32.6086 34.4219L29.5156 31.3288"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.2414 40.6016L17.1484 37.5085L20.2414 34.4154L23.3345 37.5085L20.2414 40.6016Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.4212 40.6016L23.3281 37.5085L26.4212 34.4154L29.5143 37.5085L26.4212 40.6016Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32.6086 40.6016L29.5156 37.5085L32.6086 34.4154L35.7017 37.5085L32.6086 40.6016Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.2414 46.7891L17.1484 43.696L20.2414 40.6029L23.3345 43.696L20.2414 46.7891Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.4212 46.7891L23.3281 43.696L26.4212 40.6029L29.5143 43.696L26.4212 46.7891Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32.6086 46.7891L29.5156 43.696L32.6086 40.6029L35.7017 43.696L32.6086 46.7891Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.2414 52.9766L17.1484 49.8835L20.2414 46.7904L23.3345 49.8835L20.2414 52.9766Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.4212 52.9766L23.3281 49.8835L26.4212 46.7904L29.5143 49.8835L26.4212 52.9766Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32.6086 52.9766L29.5156 49.8835L32.6086 46.7904L35.7017 49.8835L32.6086 52.9766Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.2414 59.1641L17.1484 56.071L20.2414 52.9779L23.3345 56.071L20.2414 59.1641Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.4212 59.1641L23.3281 56.071L26.4212 52.9779L29.5143 56.071L26.4212 59.1641Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M29.5156 56.071L32.6086 52.9779L35.7017 56.071L32.6086 59.1641"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M45.8971 31.3288L42.804 34.4219L39.7109 31.3288"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M52.0767 31.3288L48.9837 34.4219L45.8906 31.3288"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M58.2643 31.3288L55.1712 34.4219L52.0781 31.3288"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42.804 40.6016L39.7109 37.5085L42.804 34.4154L45.8971 37.5085L42.804 40.6016Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M48.9837 40.6016L45.8906 37.5085L48.9837 34.4154L52.0767 37.5085L48.9837 40.6016Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M55.1712 40.6016L52.0781 37.5085L55.1712 34.4154L58.2643 37.5085L55.1712 40.6016Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42.804 46.7891L39.7109 43.696L42.804 40.6029L45.8971 43.696L42.804 46.7891Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M48.9837 46.7891L45.8906 43.696L48.9837 40.6029L52.0767 43.696L48.9837 46.7891Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M55.1712 46.7891L52.0781 43.696L55.1712 40.6029L58.2643 43.696L55.1712 46.7891Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42.804 52.9766L39.7109 49.8835L42.804 46.7904L45.8971 49.8835L42.804 52.9766Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M48.9837 52.9766L45.8906 49.8835L48.9837 46.7904L52.0767 49.8835L48.9837 52.9766Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M55.1712 52.9766L52.0781 49.8835L55.1712 46.7904L58.2643 49.8835L55.1712 52.9766Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42.804 59.1641L39.7109 56.071L42.804 52.9779L45.8971 56.071L42.804 59.1641Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M48.9837 59.1641L45.8906 56.071L48.9837 52.9779L52.0767 56.071L48.9837 59.1641Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M58.2643 56.071L55.1712 59.1641L52.0781 56.071L55.1712 52.9779"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M37.7109 17.7582V30.0703"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M37.7109 16.684V30.0703"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M60.125 16.684V30.0703"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.2891 16.684V30.0703"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.4971 22.6847C26.4971 25.7238 23.9881 28.1875 20.8931 28.1875C17.798 28.1875 15.2891 25.7238 15.2891 22.6847C15.2891 19.6455 17.798 17.1817 20.8931 17.1817C23.9881 17.1817 26.4971 19.6455 26.4971 22.6847Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.4971 22.6847C26.4971 25.7238 23.9881 28.1875 20.8931 28.1875C17.798 28.1875 15.2891 25.7238 15.2891 22.6847C15.2891 19.6455 17.798 17.1817 20.8931 17.1817C23.9881 17.1817 26.4971 19.6455 26.4971 22.6847Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32.2939 22.6847C32.2939 25.7238 29.785 28.1875 26.6899 28.1875C23.5949 28.1875 21.0859 25.7238 21.0859 22.6847C21.0859 19.6455 23.5949 17.1817 26.6899 17.1817C29.785 17.1817 32.2939 19.6455 32.2939 22.6847Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32.9454 17.2435C35.6412 17.6421 37.708 19.9265 37.708 22.6848C37.708 25.7239 35.199 28.1875 32.104 28.1875C29.009 28.1875 26.5 25.7239 26.5 22.6848C26.5 20.6096 27.6698 18.8027 29.3972 17.8652"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M48.9189 22.6847C48.9189 25.7238 46.41 28.1875 43.3149 28.1875C40.2199 28.1875 37.7109 25.7238 37.7109 22.6847C37.7109 19.6455 40.2199 17.1817 43.3149 17.1817C46.41 17.1817 48.9189 19.6455 48.9189 22.6847Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M48.9189 22.6847C48.9189 25.7238 46.41 28.1875 43.3149 28.1875C40.2199 28.1875 37.7109 25.7238 37.7109 22.6847C37.7109 19.6455 40.2199 17.1817 43.3149 17.1817C46.41 17.1817 48.9189 19.6455 48.9189 22.6847Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M51.8106 27.5043C51.0083 27.9397 50.0855 28.1875 49.104 28.1875C46.009 28.1875 43.5 25.7239 43.5 22.6847C43.5 19.6455 46.009 17.1818 49.104 17.1818C52.199 17.1818 54.7079 19.6455 54.7079 22.6847C54.7079 23.4604 54.5445 24.1983 54.2497 24.8677"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M60.1221 22.6847C60.1221 25.7238 57.6131 28.1875 54.5181 28.1875C51.423 28.1875 48.9141 25.7238 48.9141 22.6847C48.9141 19.6455 51.423 17.1817 54.5181 17.1817C57.6131 17.1817 60.1221 19.6455 60.1221 22.6847Z"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.8984 17.1797V15.885"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32.25 23.375H33.6148"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M43.3125 28.1875V29.2656"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M49.1094 17.1797V15.9303"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M60.1231 22.6875H58.4609"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.2891 22.6875H16.8221"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_10788_2107">
          <rect
            width="50"
            height="50"
            fill="white"
            transform="translate(12.7109 12.7109)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SecurityFencingIcon;