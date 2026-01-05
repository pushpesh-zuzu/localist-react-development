import React from "react";
import styles from "./TreeSurgeryCostGuide.module.css";
import PaddingWrapper from "../PaddingWrapper/PaddingWrapper";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragraph from "../UITypography/Paragrah";
import GetCTAButton from "../UITypography/GetCTAButton";
import H5 from "../UITypography/H5";

function TreeSurgeryCostGuide({ CostGuidData = [] }) {
  return (
    <PaddingWrapper>
      <div className={styles.heading}>
        <BlueBlackH2Heading
          blueText="Tree Surgery Services"
          blackText=" Cost Guide"
          className={styles.headingText1}
        />

        <Paragraph className={styles.description}>
          Understanding the costs involved in driveway installation helps you
          budget effectively. Prices vary based on material, size, and
          complexity.
        </Paragraph>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <H5 className={styles.tableHeaderSpan}>Service</H5>
          <H5 className={styles.tableHeaderSpan}>Average Price</H5>
        </div>

        {CostGuidData?.map((item, index) => (
          <div key={index} className={styles.tableRow}>
            <Paragraph variant="secondary" className={styles.service}>
              {item.service}
            </Paragraph>
            <Paragraph variant="secondary" className={styles.price}>
              {item.price}
            </Paragraph>
          </div>
        ))}
      </div>

      <GetCTAButton
        onClick={() => {
          handleScrollToBottom();
        }}
      />
    </PaddingWrapper>
  );
}

export default TreeSurgeryCostGuide;
