import styles from "./Typography.module.css";

export default function H4({ children, className = "" }) {
  return <h4 className={`${styles.inter} ${styles.h4} ${className}`}>{children}</h4>;
}
