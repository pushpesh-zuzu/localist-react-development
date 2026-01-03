import styles from "./TreeSurgeryRegionalGuide.module.css";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragraph from "../UITypography/Paragrah";
import PaddingWrapper from "../PaddingWrapper/PaddingWrapper";
import H4 from "../UITypography/H4";
import GetCTAButton from "../UITypography/GetCTAButton";
import { handleScrollToBottom } from "../../../utils/scroll";

const TreeSurgeryRegionalGuide = ({
  pricingData = [],
}) => {
  return (
    <PaddingWrapper background="#FAFAFA">
      {/* HEADING */}
      <div className={styles.headingWrap}>
        <BlueBlackH2Heading
          blueText="Regional"
          blackText="Tree Surgery Costs"
        />
      </div>

      {/* CARDS */}
      <div className={styles.cardGrid}>
        {pricingData.map((item, index) => (
          <div key={index} className={styles.card}>
            <Paragraph
              className={styles.region}
              title={item.region}
            >
              {item.region}
            </Paragraph>

            <div className={styles.rateRow}>
              <Paragraph className={styles.label}>Standard Rate</Paragraph>
              <H4 className={styles.price}>{item.price}</H4>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.ctaWrap}>
        <GetCTAButton onClick={handleScrollToBottom} />
      </div>
    </PaddingWrapper>
  );
};

export default TreeSurgeryRegionalGuide;
