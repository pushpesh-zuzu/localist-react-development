const CalendarCheckIcon = ({
  size = 50,
  strokeColor = "#00AFE3",
  bgColor = "#ffffff",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      className={className}
    >
      {/* Background */}
      <rect width="50" height="50" rx="25" fill={bgColor} />

      {/* Icon */}
      <path
        d="M37.25 22.6823H13.25M30.5833 12.0156V17.349M19.9167 12.0156V17.349M21.25 30.6823L23.9167 33.349L29.9167 27.349M19.65 38.6823H30.85C33.0902 38.6823 34.2103 38.6823 35.066 38.2463C35.8186 37.8628 36.4305 37.2509 36.814 36.4983C37.25 35.6426 37.25 34.5225 37.25 32.2823V21.0823C37.25 18.8421 37.25 17.722 36.814 16.8663C36.4305 16.1137 35.8186 15.5018 35.066 15.1183C34.2103 14.6823 33.0902 14.6823 30.85 14.6823H19.65C17.4098 14.6823 16.2897 14.6823 15.434 15.1183C14.6814 15.5018 14.0695 16.1137 13.686 16.8663C13.25 17.722 13.25 18.8421 13.25 21.0823V32.2823C13.25 34.5225 13.25 35.6426 13.686 36.4983C14.0695 37.2509 14.6814 37.8628 15.434 38.2463C16.2897 38.6823 17.4098 38.6823 19.65 38.6823Z"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CalendarCheckIcon;
