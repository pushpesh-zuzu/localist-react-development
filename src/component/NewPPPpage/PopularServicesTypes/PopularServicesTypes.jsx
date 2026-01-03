import React, { useState } from "react";
import styles from "./PopularServicesTypes.module.css";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragraph from "../UITypography/Paragrah";
import Button1 from "../UITypography/Button1";
import ServiceTypeCard from "./ServiceTypeCard";
import PaddingWrapper from "../PaddingWrapper/PaddingWrapper";
import { handleScrollToBottom } from "../../../utils/scroll";
import GetCTAButton from "../UITypography/GetCTAButton";

function PopularServicesTypes({
  heading1 = "Popular",
  heading2 = "Driveway Types",
  data = [],
  description = `Explore our comprehensive range of driveway installation options to
          find the perfect solution for your property`,
}) {
  const [active, setActive] = useState(0);
  return (
    <PaddingWrapper background="#FAFAFA">
      <div className={styles.headingWrap}>
        <BlueBlackH2Heading blueText={heading1} blackText={heading2} />

        <Paragraph variant="medium" className={styles.subText}>
          {description}
        </Paragraph>
      </div>

      {/* Cards */}
      <div className={styles.grid}>
        {data.length > 0 &&
          data?.map((item, index) => (
            <ServiceTypeCard
              key={index}
              data={item}
              active={index === active}
              onMouseEnter={() => setActive(index)}
            />
          ))}
      </div>

      {/* CTA */}
      {/* <div className={styles.cta}>
        <Button1 onClick={()=>{handleScrollToBottom()}} className={styles.button} variant="warning">
          Get a Free Quotes Now <GetQuotesIcon color="white" />
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

export default PopularServicesTypes;
