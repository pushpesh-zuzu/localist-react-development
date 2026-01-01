import styles from "./InfoGridSection.module.css";
import H5 from "../../UITypography/H5";
import Paragraph from "../../UITypography/Paragrah";

export default function InfoGridSection({ title, icon, items }) {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        {icon}
        <H5>{title}</H5>
      </div>

      <div className={styles.cardList}>
        {items.map((item, index) => (
          <div key={index} className={styles.card}>
            <H5>{item.heading}</H5>
            <Paragraph bold={false}>{item.text}</Paragraph>
          </div>
        ))}
      </div>
    </div>
  );
}
