import styles from "./Typography.module.css";

export default function H3({ children, className = "", style = {} }) {
  return (
    <h3
      style={style}
      className={`${styles.inter} ${styles.h3} ${className}`}
    >
      {children}
    </h3>
  );
}