import styles from "./Typography.module.css";

export default function H5({ children, className = "" }) {
  return <h5 className={`${styles.inter} ${styles.h5} ${className}`}>{children}</h5>;
}
