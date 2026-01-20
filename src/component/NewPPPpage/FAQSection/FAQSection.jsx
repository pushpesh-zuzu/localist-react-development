import PaddingWrapper from "../PaddingWrapper/PaddingWrapper";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragraph from "../UITypography/Paragrah";
import styles from "./FAQSection.module.css";
import FAQComponent from "./FAQComponent";
import SendArrowIcon from "../../../assets/ReactIcons/SendArrowIcon";
import GetCTAButton from "../UITypography/GetCTAButton";
import { handleScrollToBottom } from "../../../utils/scroll";

const FAQSection = ({
  FrequentlyQuestion = [],
  description = `Get answers to common driveway installation questions`,
  background = "white",
}) => {
  return (
    <PaddingWrapper className={styles.customWapper} background={background}>
      <div className={styles.headingWrap}>
        <BlueBlackH2Heading
          blueText="Frequently "
          blackText="Asked Questions"
        />

        <Paragraph className={styles.subText}>{description}</Paragraph>
      </div>

      {FrequentlyQuestion.length ? (
        <FAQComponent FrequentlyQuestion={FrequentlyQuestion} />
      ) : (
        ""
      )}

      <GetCTAButton text="Get Free Estimates"
        onClick={() => {
          handleScrollToBottom();
        }}
      />
    </PaddingWrapper>
  );
};

export default FAQSection;
