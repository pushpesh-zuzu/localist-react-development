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

const RegionalGuide = ({
  description = "Average driveway installation costs across different UK regions",
  regionPricingData = [],
  bannerHeading = "UK Average for Standard Driveway (50m²)",
  bannerPrice = "£4,500",
  budget = "Budget: £3,800 | Premium: £8,800",
  heading1="Regional",
  heading2="Pricing Guide"
}) => {
  return (
    <PaddingWrapper background="#FAFAFA" className={styles.customWapper}>
      <div className={styles.headingWrap}>
        <BlueBlackH2Heading blueText={heading1} blackText={heading2} />

        <Paragraph className={styles.subText}>{description}</Paragraph>
      </div>

      <RegionPricing regionPricingData={regionPricingData} />

      <div className={styles.bannerWrapper}>
        <div className={styles.banner}>
          {bannerHeading && <H4>{bannerHeading}</H4>}
          {bannerPrice && <H2 lassName={styles.price}>{bannerPrice}</H2>}
          {budget && <Paragraph bold={true}>{budget}</Paragraph>}
        </div>
      </div>

      <GetCTAButton
        onClick={() => {
          handleScrollToBottom();
        }}
      />
    </PaddingWrapper>
  );
};

export default RegionalGuide;
