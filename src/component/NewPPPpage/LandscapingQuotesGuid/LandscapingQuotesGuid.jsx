import styles from "./LandscapingQuotesGuid.module.css";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragraph from "../UITypography/Paragrah";
import H5 from "../UITypography/H5";
import SettingIcon from "../../../assets/ReactIcons/SettingIcon";
import VettedProffessionIcon from "../../../assets/ReactIcons/VettedProffessionIcon";
import FastTimeIcon from "../../../assets/ReactIcons/FastTimeIcon";
import { handleScrollToBottom } from "../../../utils/scroll";
import PaddingWrapper from "../PaddingWrapper/PaddingWrapper";
import GetCTAButton from "../UITypography/GetCTAButton";
function LandscapingQuotesGuid({
  heading1="How it",
  heading2="Works",
  heading = "What to Expect From a Professional Driveway Installation",
  description = `Get competitive home improvements quotes from leading suppliers in 3 simples step!`,
  steps,
}) {

  const defaultSteps = [
    {
      icon: <SettingIcon className={styles.icon} />,
      text: "Fill in your details for your project",
    },
    {
      icon: <VettedProffessionIcon className={styles.icon} />,
      text: "Receive quotes from professionals",
    },
    {
      icon: <FastTimeIcon className={styles.icon} />,
      text: "Compare your quotes and enjoy great savings",
    },
    
  ];

  const stepsToRender = steps && steps.length ? steps : defaultSteps;

  return (
    <PaddingWrapper className={styles.container}>
      <div className={styles.headingWrap}>
        <BlueBlackH2Heading
          blueText={heading1}
          blackText={heading2}
          className={styles.heading}
        />

        <Paragraph variant="medium" className={styles.subText}>
          {description}
        </Paragraph>
      </div>

 

      {/* Features */}
      <div className={styles.features}>
        <div className={styles.featureCard}>
          <SettingIcon className={styles.icon} />
          <H5 className={styles.wordText1}>
            Site survey and measurements
          </H5>
        </div>

        <div className={styles.featureCard}>
          <VettedProffessionIcon className={styles.icon} />
          <H5 className={styles.wordText2}>Groundworks and excavation</H5>
        </div>

        <div className={styles.featureCard}>
          <FastTimeIcon className={styles.icon} />
          <H5 className={styles.wordText3}>
            Sub-base and drainage preparatio
          </H5>
        </div>

         <div className={styles.featureCard}>
          <FastTimeIcon className={styles.icon} />
          <H5 className={styles.wordText4}>
            Materials (paving, stone, concrete, timber, etc.)
          </H5>
        </div>

         <div className={styles.featureCard}>
          <FastTimeIcon className={styles.icon} />
          <H5 className={styles.wordText5}>
            Labour and machinery
          </H5>
        </div>
         <div className={styles.featureCard}>
          <FastTimeIcon className={styles.icon} />
          <H5 className={styles.wordText6}>Waste removal and site clearance
          </H5>
        </div>
      </div>

      

      {/* CTA */}
      {/* <div className={styles.cta}>
        <Button1
          onClick={() => {
            handleScrollToBottom();
          }}
          variant="warning"
          className={styles.button}
        >
          Get A Free Quotes Now <GetQuotesIcon color="white" />{" "}
        </Button1>
      </div> */}
      <GetCTAButton
        onClick={() => {
          handleScrollToBottom();
        }}
      />
    </PaddingWrapper>
  );
}

export default LandscapingQuotesGuid;
