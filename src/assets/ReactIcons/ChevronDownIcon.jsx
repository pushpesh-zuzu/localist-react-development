const ChevronDownIcon = ({
  width = 16,
  height = 8,
  stroke = "#253238",
  strokeWidth = 2.66667,
  className = "",
  style = {},
  onClick,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 19 11"
      fill="none"
      className={className}
      style={style}
      onClick={onClick}
    >
      <path
        d="M1.33594 1.33594L9.33594 9.33594L17.3359 1.33594"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronDownIcon;
