import styles from "./Typography.module.css";

export default function H2({ children, className = "" }) {
  return <h2 className={`${styles.inter} ${styles.h2} ${className}`}>{children}</h2>;
}
