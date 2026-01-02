import React, { useState } from "react";
import styles from "./PopularServicesTypes.module.css";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragraph from "../UITypography/Paragrah";
import Button1 from "../UITypography/Button1";
import ServiceTypeCard from "./ServiceTypeCard";
import PaddingWrapper from "../PaddingWrapper/PaddingWrapper";
import GetQuotesIcon from "../../../assets/ReactIcons/GetQuotesIcon";
import { handleScrollToBottom } from "../../../utils/scroll";

function PopularServicesTypes({ data = [] }) {
  const [active, setActive] = useState(0);
  return (
    <PaddingWrapper background="#FCFCFC">
      <div className={styles.headingWrap}>
        <BlueBlackH2Heading blueText="Popular" blackText="Driveway Types" />

        <Paragraph variant="medium" className={styles.subText}>
          Explore our comprehensive range of driveway installation options to
          find the perfect solution for your property
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
              onClick={() => setActive(index)}
            />
          ))}
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <Button1 onClick={()=>{handleScrollToBottom()}} className={styles.button} variant="warning">
          Get a Free Quotes Now <GetQuotesIcon color="white" />
        </Button1>
      </div>
    </PaddingWrapper>
  );
}

export default PopularServicesTypes;
