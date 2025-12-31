import styles from "./Typography.module.css";

export default function H3({ children, className = "" }) {
  return <h3 className={`${styles.inter} ${styles.h3} ${className}`}>{children}</h3>;
}
