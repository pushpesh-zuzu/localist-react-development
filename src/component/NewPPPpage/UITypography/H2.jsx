import styles from "./Typography.module.css";

export default function H2({ children, className = "",style={} }) {
  return <h2 style={style} className={`${styles.inter} ${styles.h2} ${className}`}>{children}</h2>;
}
