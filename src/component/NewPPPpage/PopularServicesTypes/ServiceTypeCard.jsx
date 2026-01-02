import React from "react";
import styles from "./ServiceTypeCard.module.css";
import H3 from "../UITypography/H3";
import Paragraph from "../UITypography/Paragrah";
import H4 from "../UITypography/H4";
import CheckCircleIcon from "../../../assets/ReactIcons/CheckCircleIcon";

function ServiceTypeCard({ data, active, onClick }) {
  const { icon, title, description, points,inActiveIcon } = data;

  return (
    <div
      onClick={onClick}
      className={`${styles.card} ${active ? styles.active : ""}`}
    >
      <div className={styles.iconWrap}>{active ? icon : inActiveIcon}</div>

      <H4 className={styles.title}>{title}</H4>
    
      <Paragraph className={styles.desc}>{description}</Paragraph>

      <div className={styles.points}>
        {points.map((p, i) => (
          <div key={i} className={styles.point}>
            {active ? <CheckCircleIcon color="white" /> : <CheckCircleIcon color="#00AFE3" />}
            <span>{p.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceTypeCard;
