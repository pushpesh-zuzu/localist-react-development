import styles from "./TreeSurgeryRegionalGuide.module.css";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragrah from '../UITypography/Paragrah';
import PaddingWrapper from "../PaddingWrapper/PaddingWrapper";
import H5 from '../UITypography/H5';
import GetCTAButton from "../UITypography/GetCTAButton";
import { handleScrollToBottom } from "../../../utils/scroll";
import TreeLocationPinIcon from "../../../assets/ReactIcons/TreeLocationPinIcon";

const TreeSurgeryRegionalGuide = ({
  pricingData = [],
  heading1="Regional",
  heading2 ="Tree Surgery Costs"
}) => {
  return (
    <PaddingWrapper background="#FAFAFA">
      {/* HEADING */}
      <div className={styles.headingWrap}>
        <BlueBlackH2Heading
          blueText={heading1}
          blackText={heading2}
        />
      </div>
      <div className={styles.grid}>
        {pricingData.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.header}>
              <span className={styles.icon}>
                <TreeLocationPinIcon clipPathId="clip1" size={18} />
              </span>
              <H5>{item.region}</H5>
            </div>

            <div className={styles.list}>
              {item.prices.map((price, i) => (
                <div key={i} className={styles.row}>
                  <Paragrah className={styles.label}>{price.label}</Paragrah>
                  <Paragrah className={styles.value} bold={false}>{price.value}</Paragrah>
                </div>
              ))}
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
