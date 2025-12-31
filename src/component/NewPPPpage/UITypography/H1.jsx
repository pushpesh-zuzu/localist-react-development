import styles from "./Typography.module.css";

export default function H1({ children, className = "" }) {
  return (
    <h1 className={`${styles.inter} ${styles.h1} ${className}`}>{children}</h1>
  );
}
