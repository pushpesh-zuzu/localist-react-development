import styles from "./Typography.module.css";

export default function ButtonText({ children, className = "" }) {
  return (
    <span className={`${styles.arial} ${styles.btn} ${className}`}>
      {children}
    </span>
  );
}
