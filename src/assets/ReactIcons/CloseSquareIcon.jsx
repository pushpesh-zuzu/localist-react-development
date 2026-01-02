const CloseSquareIcon = ({
  size = 26,
  strokeColor = "#ffffff",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      className={className}
    >
      {/* Cross */}
      <path
        d="M8.72656 17.368L17.2647 8.63281"
        stroke={strokeColor}
        strokeWidth="2.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.2734 17.368L8.73532 8.63281"
        stroke={strokeColor}
        strokeWidth="2.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Square */}
      <path
        d="M17.55 3.25H8.45C6.62983 3.25 5.71974 3.25 5.02453 3.60423C4.413 3.91582 3.91582 4.413 3.60423 5.02453C3.25 5.71974 3.25 6.62983 3.25 8.45V17.55C3.25 19.3702 3.25 20.2803 3.60423 20.9755C3.91582 21.587 4.413 22.0842 5.02453 22.3958C5.71974 22.75 6.62983 22.75 8.45 22.75H17.55C19.3702 22.75 20.2803 22.75 20.9755 22.3958C21.587 22.0842 22.0842 21.587 22.3958 20.9755C22.75 20.2803 22.75 19.3702 22.75 17.55V8.45C22.75 6.62983 22.75 5.71974 22.3958 5.02453C22.0842 4.413 21.587 3.91582 20.9755 3.60423C20.2803 3.25 19.3702 3.25 17.55 3.25Z"
        stroke={strokeColor}
        strokeWidth="2.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseSquareIcon;
