import React from "react";
import { Helmet } from "react-helmet-async";
import SearchAndFindAnAccountant from "../SearchAndFindAnAccountant";
import {
  AIRPORT_TRANSFER_FAQ,
  TRANSPORT_AVERAGE_PRICE,
  TRANSPORT_BREADCRUMB_CONFIG,
  TRANSPORT_CONFIG_TOP,
  TRANSPORT_CONTENT_CONFIG,
  TRANSPORT_FIND_SERVICE_CONTENT,
  TRANSPORT_HOW_IT_WORK,
  TRANSPORT_META,
  TRANSPORT_REGION_DATA,
  TRANSPORT_REVIEWS_DATA,
} from "./AirtportData";
import HowItWorks from "../../subCategory/workSteps/HowItWorks";
import FindServiceLevel3 from "../FindServiceLevel3";
import Frequently from "../../subCategory/Faq/Frequently";
import AveragePriceTransportServices from "../../subCategory/AveragePrice/AveragePriceTransportServices";
import Reviews from "../../subCategory/Reviews/Reviews";
import AirportTransfers from "../banners/AirportTransfers.webp";
import RegionsComponent from "../../subCategory/Regions/Regions";
import { transformData } from "../../../utils/allServicesUtils";
import GetQuotesLevel3 from "../GetQuotesLevel3";
import CalonicalTags from "../../common/CalonicalTags/CalonicalTags";

function AirportServices() {
  const transformed = transformData(TRANSPORT_REGION_DATA, "Airport Transfers");

  return (
    <>
      <Helmet>
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
      <CalonicalTags
        breadcrumb={TRANSPORT_BREADCRUMB_CONFIG["Airport Transfers"]}
        bannerImage={AirportTransfers}
      />
      <SearchAndFindAnAccountant
        title={TRANSPORT_CONFIG_TOP["Airport Transfers"]?.title}
        findingHeading={
          TRANSPORT_CONFIG_TOP["Airport Transfers"]?.findingHeading
        }
        breadcrumb={TRANSPORT_BREADCRUMB_CONFIG["Airport Transfers"]}
        // bannerImage={CONTENT_CONFIG_BANNER["Airport Transfers"]?.banner}
        bannerImage={AirportTransfers}
        para1={TRANSPORT_CONTENT_CONFIG["Airport Transfers"]?.para1}
        para2={TRANSPORT_CONTENT_CONFIG["Airport Transfers"]?.para2}
        defaultService={"Airport Transfers"}
        isNeedS={false}
      />
      <HowItWorks
        HowItWorksData={TRANSPORT_HOW_IT_WORK["Airport Transfers"]}
        title={TRANSPORT_CONFIG_TOP["Airport Transfers"]?.ctaText}
      />
      <RegionsComponent
        regionsData={transformed}
        //   category={slug} // Optional: if you need to know the category
      />
      <FindServiceLevel3
        contentBlocks={TRANSPORT_FIND_SERVICE_CONTENT["Airport Transfers"]}
        title={TRANSPORT_CONFIG_TOP["Airport Transfers"]?.ctaText}
      />
      <Frequently
        FrequentlyQuestion={AIRPORT_TRANSFER_FAQ["Airport Transfers"]}
      />
      <AveragePriceTransportServices
        title={TRANSPORT_CONFIG_TOP["Airport Transfers"]?.avgPriceTitle}
        RELTED_PRICE={TRANSPORT_AVERAGE_PRICE["Airport Transfers"]}
        // avg_price={CONTENT_CONFIG_TOP[slug]?.showSpeicialits}
        // showSpeicialits={CONTENT_CONFIG_TOP[slug]?.showSpeicialits}
        // isSingular={CONTENT_CONFIG_TOP[slug]?.isSingular}
        // monthlyText={CONTENT_CONFIG_TOP[slug]?.monthlyText}
      />
      <Reviews RELATED_REVIEW={TRANSPORT_REVIEWS_DATA["Airport Transfers"]} />
      <GetQuotesLevel3
        needSString={false}
        message={TRANSPORT_CONFIG_TOP["Airport Transfers"]?.ctaText}
      />
    </>
  );
}

export default AirportServices;
