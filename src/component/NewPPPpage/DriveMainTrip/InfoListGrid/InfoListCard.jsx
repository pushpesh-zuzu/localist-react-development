import styles from "./InfoListCard.module.css";
import H5 from "../../UITypography/H5"
import Paragrah from "../../UITypography/Paragrah"

export default function InfoListCard({ title, icon, listIcon, items, theme = "primary" }) {
  return (
    <div className={`${styles.card} ${styles[theme]}`}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>{icon}</span>
        <H5>{title}</H5>
      </div>

      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.listItem}>
            <span className={styles.headerIcon}>{listIcon}</span>
            <div>
              {item.title && <H5>{title}</H5>}
              {item.description && <Paragrah bold={false}>{item.description}</Paragrah>}
              {item.text && <p>{item.text}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
