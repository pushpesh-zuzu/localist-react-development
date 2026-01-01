import React from "react";
import styles from "./ProfessionalServiceInstallation.module.css";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragraph from "../UITypography/Paragrah";
import H5 from "../UITypography/H5";
import Button1 from "../UITypography/Button1";
import GetQuotesIcon from "../../../assets/ReactIcons/GetQuotesIcon";

function ProfessionalServiceInstallation({ topCards, included, avoid }) {
  return (
    <div className={styles.container}>
      {/* Heading */}
      <div className={styles.headingWrap}>
        <BlueBlackH2Heading
          blueText="Why Choose"
          blackText="Professional Driveway Installation?"
        />
        <Paragraph className={styles.subText}>
          Expert installation ensures quality, durability, and compliance with
          regulations
        </Paragraph>
      </div>

      {/* Top 4 cards */}
      <div className={styles.topGrid}>
        {topCards.map((item, i) => (
          <div key={i} className={styles.topCard}>
            <div className={styles.topIcon}>{item.icon}</div>
            <H5>{item.title}</H5>
            <Paragraph>{item.text}</Paragraph>
          </div>
        ))}
      </div>

      {/* Bottom 2 blocks */}
      <div className={styles.bottomGrid}>
        {/* Included */}
        <div className={styles.included}>
          <div className={styles.blockHeader}>
            {included.icon}
            <H5>{included.title}</H5>
          </div>

          <ul>
            {included.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>

        {/* Avoid */}
        <div className={styles.avoid}>
          <div className={styles.blockHeader}>
            {avoid.icon}
            <H5>{avoid.title}</H5>
          </div>

          <ul>
            {avoid.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <Button1 variant="secondary">
          Get Quotes Now <GetQuotesIcon color="white" />
        </Button1>
      </div>
    </div>
  );
}

export default ProfessionalServiceInstallation;
