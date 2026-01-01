import React from "react";
import styles from "./CostGuide.module.css";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragraph from "../UITypography/Paragrah";
import Button1 from "../UITypography/Button1";
import H3 from "../UITypography/H3";
import H5 from "../UITypography/H5";
import GetQuotesIcon from "../../../assets/ReactIcons/GetQuotesIcon";
import PaddingWrapper from "../PaddingWrapper/PaddingWrapper";
import H4 from "../UITypography/H4";

function CostGuide({ pricing = [], factors = [], icons = {} }) {
  const renderIcon = (key, className = "") => {
    const Icon = icons[key];
    if (!Icon) return null;
    return <Icon className={className} />;
  };

  return (
    <PaddingWrapper>
      {/* Heading */}
      <div className={styles.headingWrap}>
        <BlueBlackH2Heading
          blueText="Driveway Installation"
          blackText="Cost Guide"
        />

        <Paragraph variant="secondary" className={styles.subText}>
          Understanding the costs involved in driveway installation helps you
          budget effectively. Prices vary based on material, size, and
          complexity.
        </Paragraph>
      </div>

      <div className={styles.grid}>
        {/* Left - Pricing */}
        <div className={styles.left}>
          {pricing.map((item, index) => (
            <div key={index} className={styles.priceCard}>
              <div className={styles.priceHeader}>
                <div className={styles.priceTitle}>
                  {renderIcon(item.icon, styles.priceIcon)}
                  <H5>{item.title}</H5>
                </div>
                <H4 className={styles.price}>{item.price}</H4>
              </div>

              <Paragraph variant="secondary" className={styles.priceDesc}>
                {item.description}
              </Paragraph>
            </div>
          ))}
        </div>

        {/* Right - Factors */}
        <div className={styles.right}>
          <H4 className={styles.factorTitle}>Cost Factors to Consider</H4>

          <div className={styles.factorList}>
            {factors.map((item, index) => (
              <div key={index} className={styles.factorItem}>
                <div className={styles.factorIcon}>
                  {renderIcon(item.icon, styles.factorIconSvg)}
                </div>
                <div>
                  <H5 className={styles.factorPrice}>{item.title}</H5>
                  <Paragraph variant="secondary" className={styles.priceDesc}>{item.description}</Paragraph>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <Button1 className={styles.button} variant="secondary">
          Get Quotes Now <GetQuotesIcon color="white" />
        </Button1>
      </div>
    </PaddingWrapper>
  );
}

export default CostGuide;
