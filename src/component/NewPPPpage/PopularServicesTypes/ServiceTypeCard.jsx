import React from "react";
import styles from "./ServiceTypeCard.module.css";
import H3 from "../UITypography/H3";
import Paragraph from "../UITypography/Paragrah";
import H4 from "../UITypography/H4";

function ServiceTypeCard({ data, active, onClick }) {
  const { icon, title, description, points } = data;

  return (
    <div
      onClick={onClick}
      className={`${styles.card} ${active ? styles.active : ""}`}
    >
      <div className={styles.iconWrap}>{icon}</div>

      <H4 className={styles.title}>{title}</H4>
    
      <Paragraph className={styles.desc}>{description}</Paragraph>

      <div className={styles.points}>
        {points.map((p, i) => (
          <div key={i} className={styles.point}>
            {p.icon}
            <span>{p.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceTypeCard;
