import styles from "./RegionalGuide.module.css";
import H2 from "../UITypography/H2";
import H4 from "../UITypography/H4";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragraph from "../UITypography/Paragrah";
import SendArrowIcon from "../../../assets/ReactIcons/SendArrowIcon";
import RegionPricing from "./RegionPricing";
import PaddingWrapper from "../PaddingWrapper/PaddingWrapper";
import GetCTAButton from "../UITypography/GetCTAButton";
import { handleScrollToBottom } from "../../../utils/scroll";

const RegionalGuide = () => {
  return (
    <PaddingWrapper background="#FCFCFC" className={styles.customWapper}>
      <div className={styles.headingWrap}>
        <BlueBlackH2Heading blueText="Regional" blackText="Pricing Guide" />

        <Paragraph className={styles.subText}>
          Average driveway installation costs across different UK regionss
        </Paragraph>
      </div>

      <RegionPricing />

      <div className={styles.bannerWrapper}>
        <div className={styles.banner}>
          <H4>UK Average for Standard Driveway (50m²)</H4>
          <H2 lassName={styles.price}>£4,500</H2>
          <Paragraph bold={true}>Budget: £3,800 | Premium: £8,800</Paragraph>
        </div>
      </div>

      <GetCTAButton
        onClick={() => {
          handleScrollToBottom()
        }}
      />
    </PaddingWrapper>
  );
};

export default RegionalGuide;
