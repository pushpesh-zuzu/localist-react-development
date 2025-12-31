import styles from "./Button1.module.css";

const Button1 = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${styles.base}
        ${styles[variant]}
        ${disabled ? styles.disabled : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button1;
