import SendArrowIcon from "../icons/SendArrowIcon";
import styles from "./PrimaryButton.module.css";

export default function PrimaryButton({
  children,
  onClick,
  className = "",
  showIcon = true,
  disabled = false,
}) {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.text}>{children}</span>

      {showIcon && (
        <span className={styles.icon}>
          <SendArrowIcon size={16} />
        </span>
      )}
    </button>
  );
}
