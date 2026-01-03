import React from "react";
import styles from "./HowItWorkNewPPC.module.css";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragraph from "../UITypography/Paragrah";
import Button1 from "../UITypography/Button1";
import H3 from "../UITypography/H3";
import H5 from "../UITypography/H5";
import SettingIcon from "../../../assets/ReactIcons/SettingIcon";
import VettedProffessionIcon from "../../../assets/ReactIcons/VettedProffessionIcon";
import FastTimeIcon from "../../../assets/ReactIcons/FastTimeIcon";
import GetQuotesIcon from "../../../assets/ReactIcons/GetQuotesIcon";
import PlayIcon from "../../../assets/ReactIcons/PlayIcon";
import ThreeBusinessPerson from "./three-business-people-meeting.webp";
import { handleScrollToBottom } from "../../../utils/scroll";
import PaddingWrapper from "../PaddingWrapper/PaddingWrapper";
import GetCTAButton from "../UITypography/GetCTAButton";
function HowItWorkNewPPC({
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
          blueText="How it"
          blackText="works"
          className={styles.heading}
        />
        {/* <H3
          className={styles.topLabel}
          style={{ color: "#253238", marginBottom: "12px" }}
        >
          {heading}
        </H3> */}

        <Paragraph variant="medium" className={styles.subText}>
          {description}
        </Paragraph>
      </div>

      {/* Video */}
      {/* <div className={styles.videoWrapper}>
        <img src={ThreeBusinessPerson} className={styles.videoImg} />
        <PlayIcon className={styles.playBtn} />
      </div> */}

      {/* Features */}
      {/* <div className={styles.features}>
        <div className={styles.featureCard}>
          <SettingIcon className={styles.icon} />
          <H5 className={styles.wordText}>
            Fill in your details for your project
          </H5>
        </div>

        <div className={styles.featureCard}>
          <VettedProffessionIcon className={styles.icon} />
          <H5 className={styles.wordText}>Receive quotes from professionals</H5>
        </div>

        <div className={styles.featureCard}>
          <FastTimeIcon className={styles.icon} />
          <H5 className={styles.wordTextLast}>
            Compare your quotes and enjoy great savings
          </H5>
        </div>
      </div> */}

      <div className={styles.features}>
        {stepsToRender.map((step, index) => (
          <div key={index} className={styles.featureCard}>
            {step.icon}
            <H5 className={styles.wordText}>{step.text}</H5>
          </div>
        ))}
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

export default HowItWorkNewPPC;
