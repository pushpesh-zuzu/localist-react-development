const UserCheckIcon = ({
  size = 17,
  color = "#00AFE3",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size * 15) / 17} /* maintain aspect ratio */
      viewBox="0 0 17 15"
      fill="none"
      className={className}
    >
      <path
        d="M8.25 10.125H4.875C3.82833 10.125 3.30499 10.125 2.87914 10.2542C1.92034 10.545 1.17003 11.2953 0.87918 12.2541C0.75 12.68 0.75 13.2033 0.75 14.25M11.25 12L12.75 13.5L15.75 10.5M10.125 4.125C10.125 5.98896 8.61396 7.5 6.75 7.5C4.88604 7.5 3.375 5.98896 3.375 4.125C3.375 2.26104 4.88604 0.75 6.75 0.75C8.61396 0.75 10.125 2.26104 10.125 4.125Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserCheckIcon;
