import React from "react";
import styles from "./ProfessionalServiceInstallation.module.css";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragraph from "../UITypography/Paragrah";
import H5 from "../UITypography/H5";
import Button1 from "../UITypography/Button1";
import GetQuotesIcon from "../../../assets/ReactIcons/GetQuotesIcon";
import PaddingWrapper from "../PaddingWrapper/PaddingWrapper";
import { handleScrollToBottom } from "../../../utils/scroll";
import GetCTAButton from "../UITypography/GetCTAButton";

function ProfessionalServiceInstallation({
  topCards,
  heading = "Driveway Installation",
}) {
  return (
    // <div className={styles.container}>
    //   {/* Heading */}
    //   <div className={styles.headingWrap}>
    //     <BlueBlackH2Heading
    //       blueText="Why Choose"
    //       blackText=""
    //     />
    //     <Paragraph className={styles.subText}>
    //       Expert installation ensures quality, durability, and compliance with
    //       regulations
    //     </Paragraph>
    //   </div>
    <PaddingWrapper background="#FAFAFA">
      {/* Heading */}
      <div className={styles.headingWrap}>
        <BlueBlackH2Heading
          blueText="Why Choose"
          blackText={`Professional ${heading}?`}
        />

        <Paragraph variant="medium" className={styles.subText}>
          Expert installation ensures quality, durability, and compliance with regulations
        </Paragraph>
      </div>
      {/* Top 4 cards */}
      <div className={styles.topGrid}>
        {topCards.map((item, i) => (
          <div key={i} className={styles.topCard}>
            <div className={styles.topIcon}>{item.icon}</div>
            <H5>{item.title}</H5>
           <div className={styles.textdescription}>
             <Paragraph className={styles.subText} variant="medium">{item.text}</Paragraph>
           </div>
          </div>
        ))}
      </div>

      {/* Bottom 2 blocks */}
      {/* <div className={styles.bottomGrid}>
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
      </div> */}

      {/* CTA */}
      <GetCTAButton
        onClick={() => {
          handleScrollToBottom()
        }}
      />
    </PaddingWrapper>
  );
}

export default ProfessionalServiceInstallation;
