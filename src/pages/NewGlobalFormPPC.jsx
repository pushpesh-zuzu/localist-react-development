import React from "react";
import HowItWorkNewPPC from "../component/NewPPPpage/HowItWorkNewPPC/HowItWorkNewPPC";
import FloatingButtonWrapper from "../component/NewPPPpage/FloatingButtonWrapper";
import { Helmet } from "react-helmet-async";
import CalonicalTags from "../component/common/CalonicalTags/CalonicalTags";
import HeroSectionDrivewaysNewPPC from "../component/NewPPPpage/HeroSection/HeroSectionDrivewaysNewPPC";

function NewGlobalFormPPC() {
  return (
    <FloatingButtonWrapper>
      {(heroRef, sectionsStartRef) => (
        <>
          <Helmet>
            <meta name="robots" content="noindex" />
          </Helmet>
          <CalonicalTags isRequiredjsonLd={false} />
          <div ref={heroRef}>
            <HeroSectionDrivewaysNewPPC
              heading0="Find Trusted"
              heading1="Home Improvement"
              heading2="Experts Near You"
              quoteText="Hire a Tradesperson"
              questionDescription="To find the ideal Driveway Installation specialist for your project, simply complete the quick form below."
              
            />
          </div>
          <div ref={sectionsStartRef}>
            <HowItWorkNewPPC />
          </div>
        </>
      )}
    </FloatingButtonWrapper>
  );
}

export default NewGlobalFormPPC;
