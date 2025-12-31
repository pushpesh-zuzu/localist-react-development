import styles from "./Paragraph.module.css";

export default function Paragraph({
  children,
  className = "",
  bold = true,
  variant = "primary",
  dangerouslySetInnerHTML,
}) {
  const weightClass = bold ? styles.bold : styles.normal;

  if (dangerouslySetInnerHTML) {
    return (
      <p
        className={`
          ${styles.base}
          ${styles[variant]}
          ${weightClass}
          ${className}
        `}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      />
    );
  }

  return (
    <p
      className={`
        ${styles.base}
        ${styles[variant]}
        ${weightClass}
        ${className}
      `}
    >
      {children}
    </p>
  );
}
