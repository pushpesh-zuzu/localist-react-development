import Paragraph from "../../UITypography/Paragrah";
import styles from "./InfoBadge.module.css";

export default function InfoBadge({ icon, text }) {
  return (
    <div className={styles.badge}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {/* <span className={styles.text}>{text}</span> */}
      <Paragraph variant="verysmall" bold={false} className={styles.text}>{text}</Paragraph>
    </div>
  );
}
