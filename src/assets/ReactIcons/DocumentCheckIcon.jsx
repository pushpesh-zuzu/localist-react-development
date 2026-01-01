const DocumentCheckIcon = ({
  size = 50,
  bgColor = "#00AFE3",
  strokeColor = "#ffffff",
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
        d="M36.1693 26.0469V18.4469C36.1693 16.2067 36.1693 15.0866 35.7333 14.2309C35.3498 13.4783 34.7379 12.8663 33.9852 12.4828C33.1296 12.0469 32.0095 12.0469 29.7693 12.0469H21.2359C18.9957 12.0469 17.8756 12.0469 17.02 12.4828C16.2673 12.8663 15.6554 13.4783 15.2719 14.2309C14.8359 15.0866 14.8359 16.2067 14.8359 18.4469V32.3135C14.8359 34.5538 14.8359 35.6739 15.2719 36.5295C15.6554 37.2822 16.2673 37.8941 17.02 38.2776C17.8756 38.7135 18.9957 38.7135 21.2359 38.7135H25.5026M28.1693 24.0469H20.1693M22.8359 29.3802H20.1693M30.8359 18.7135H20.1693M28.8359 34.7135L31.5026 37.3802L37.5026 31.3802"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DocumentCheckIcon;
