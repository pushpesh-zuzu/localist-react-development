import React from "react";
import styles from "./TreeSurgeryCostGuide.module.css";
import PaddingWrapper from "../PaddingWrapper/PaddingWrapper";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragraph from "../UITypography/Paragrah";
import GetCTAButton from "../UITypography/GetCTAButton";
import H5 from "../UITypography/H5";

function TreeSurgeryCostGuide({
  CostGuidData = [],
  heading1 = "Tree Surgery Services",
  headding2 = "Cost Guide",
  description = `Understanding the costs involved in driveway installation helps you
          budget effectively. Prices vary based on material, size, and
          complexity.`,
  maxWidth = "800px",
}) {
  return (
    <PaddingWrapper>
      <div className={styles.heading}>
        <BlueBlackH2Heading
          blueText={heading1}
          blackText={headding2}
          className={styles.headingText1}
        />

        <Paragraph className={styles.description}>{description}</Paragraph>
      </div>

      <div className={styles.tableWrapper} style={{ maxWidth: maxWidth }}>
        <div className={styles.tableHeader}>
          <H5 className={styles.tableHeaderSpan}>Service</H5>
          <H5 className={styles.tableHeaderSpan}>Average Price</H5>
        </div>

        {CostGuidData?.map((item, index) => (
          <div key={index} className={styles.tableRow}>
            <Paragraph variant="secondary" className={styles.service}>
              {item.service}{" "}
              {item.description && (
                <span className={styles.description}>{item.description}</span>
              )}
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
