import React from "react";
import { Helmet } from "react-helmet-async";
import SearchAndFindAnAccountant from "../SearchAndFindAnAccountant";
import {
  ACCOUNTING_FAQ,
  ACCOUNTING_AVERAGE_PRICE,
  ACCOUNTING_BREADCRUMB_CONFIG,
  ACCOUNTING_CONFIG_TOP,
  ACCOUNTING_CONTENT_CONFIG,
  ACCOUNTING_FIND_SERVICE_CONTENT,
  ACCOUNTING_HOW_IT_WORK,
  ACCOUNTING_REGION_DATA,
  ACCOUNTING_REVIEWS_DATA,
} from "./AccountingData";
import HowItWorks from "../../subCategory/workSteps/HowItWorks";
import FindServiceLevel3 from "../FindServiceLevel3";
import Frequently from "../../subCategory/Faq/Frequently";
import Reviews from "../../subCategory/Reviews/Reviews";
import AccountingBanner from "../banners/AccountingBanner.webp";
import RegionsComponent from "../../subCategory/Regions/Regions";
import { transformData } from "../../../utils/allServicesUtils";
import GetQuotesLevel3 from "../GetQuotesLevel3";
import AveragePrice from "../../subCategory/AveragePrice/AveragePrice";
import CalonicalTags from "../../common/CalonicalTags/CalonicalTags";

function Accounting() {
  const transformed = transformData(
    ACCOUNTING_REGION_DATA,
    "accountants-near-me"
  );

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <script>
          {`
            gtag('event', 'conversion', {
              'send_to': 'AW-17528251553/iVB9CJjZsZMbEKHJj6ZB',
              'value': 1.0,
              'currency': 'GBP'
            });
          `}
        </script>
      </Helmet>
      <CalonicalTags breadcrumb={ACCOUNTING_BREADCRUMB_CONFIG["accountants-near-me"]}/>
      <SearchAndFindAnAccountant
        title={ACCOUNTING_CONFIG_TOP["accountants-near-me"]?.title}
        findingHeading={
          ACCOUNTING_CONFIG_TOP["accountants-near-me"]?.findingHeading
        }
        breadcrumb={
          ACCOUNTING_BREADCRUMB_CONFIG["accountants-near-me"]
        }
        // bannerImage={CONTENT_CONFIG_BANNER["accountants-near-me"]?.banner}
        bannerImage={AccountingBanner}
        para1={ACCOUNTING_CONTENT_CONFIG["accountants-near-me"]?.para1}
        para2={ACCOUNTING_CONTENT_CONFIG["accountants-near-me"]?.para2}
        para3={ACCOUNTING_CONTENT_CONFIG["accountants-near-me"]?.para3}
        defaultService={"accountants-near-me"}
        isNeedS={false}
      />
      <HowItWorks
        HowItWorksData={ACCOUNTING_HOW_IT_WORK["accountants-near-me"]}
        title={ACCOUNTING_CONFIG_TOP["accountants-near-me"]?.ctaText}
      />
      <RegionsComponent
        regionsData={transformed}
        //   category={slug} // Optional: if you need to know the category
      />
      <FindServiceLevel3
        contentBlocks={
          ACCOUNTING_FIND_SERVICE_CONTENT["accountants-near-me"]
        }
        title={ACCOUNTING_CONFIG_TOP["accountants-near-me"]?.ctaText}
      />
      <Frequently
        FrequentlyQuestion={ACCOUNTING_FAQ["accountants-near-me"]}
      />
      <AveragePrice
        title={
          ACCOUNTING_CONFIG_TOP["accountants-near-me"]?.avgPriceTitle
        }
        RELTED_PRICE={ACCOUNTING_AVERAGE_PRICE["accountants-near-me"]}
        // avg_price={ACCOUNTING_CONFIG_TOP["accountants-near-me"]?.showSpeicialits}
        // showSpeicialits={
        //   ACCOUNTING_CONFIG_TOP["accountants-near-me"]?.showSpeicialits
        // }
        // isSingular={CONTENT_CONFIG_TOP[slug]?.isSingular}
        // monthlyText={CONTENT_CONFIG_TOP[slug]?.monthlyText}
      />
      <Reviews
        RELATED_REVIEW={ACCOUNTING_REVIEWS_DATA["accountants-near-me"]}
      />
      <GetQuotesLevel3
        needSString={false}
        message={ACCOUNTING_CONFIG_TOP["accountants-near-me"]?.ctaText}
      />
    </>
  );
}

export default Accounting;
