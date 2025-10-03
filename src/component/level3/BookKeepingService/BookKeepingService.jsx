import React from "react";
import { Helmet } from "react-helmet-async";
import SearchAndFindAnAccountant from "../SearchAndFindAnAccountant";
import {
  BOOKKEEPING_SERVICE_FAQ,
  BOOKKEEPING_SERVICE_AVERAGE_PRICE,
  BOOKKEEPING_SERVICE_BREADCRUMB_CONFIG,
  BOOKKEEPING_SERVICE_CONFIG_TOP,
  BOOKKEEPING_SERVICE_CONTENT_CONFIG,
  BOOKKEEPING_SERVICE_FIND_SERVICE_CONTENT,
  BOOKKEEPING_SERVICE_HOW_IT_WORK,
  BOOKKEEPING_SERVICE_REGION_DATA,
  BOOKKEEPING_SERVICE_REVIEWS_DATA,
} from "./BookKeepingServiceData";
import HowItWorks from "../../subCategory/workSteps/HowItWorks";
import FindServiceLevel3 from "../FindServiceLevel3";
import Frequently from "../../subCategory/Faq/Frequently";
import Reviews from "../../subCategory/Reviews/Reviews";
import BookkeepingServices from "../banners/BookkeepingServices.webp";
import RegionsComponent from "../../subCategory/Regions/Regions";
import { transformData } from "../../../utils/allServicesUtils";
import GetQuotesLevel3 from "../GetQuotesLevel3";
import AveragePrice from "../../subCategory/AveragePrice/AveragePrice";

function BookKeepingService() {
  const transformed = transformData(
    BOOKKEEPING_SERVICE_REGION_DATA,
    "bookkeepers-near-me"
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
      <SearchAndFindAnAccountant
        title={BOOKKEEPING_SERVICE_CONFIG_TOP["bookkeepers-near-me"]?.title}
        findingHeading={
          BOOKKEEPING_SERVICE_CONFIG_TOP["bookkeepers-near-me"]?.findingHeading
        }
        breadcrumb={
          BOOKKEEPING_SERVICE_BREADCRUMB_CONFIG["bookkeepers-near-me"]
        }
        // bannerImage={CONTENT_CONFIG_BANNER["bookkeepers-near-me"]?.banner}
        bannerImage={BookkeepingServices}
        para1={BOOKKEEPING_SERVICE_CONTENT_CONFIG["bookkeepers-near-me"]?.para1}
        para2={BOOKKEEPING_SERVICE_CONTENT_CONFIG["bookkeepers-near-me"]?.para2}
        defaultService={"bookkeepers-near-me"}
        isNeedS={false}
      />
      <HowItWorks
        HowItWorksData={BOOKKEEPING_SERVICE_HOW_IT_WORK["bookkeepers-near-me"]}
        title={BOOKKEEPING_SERVICE_CONFIG_TOP["bookkeepers-near-me"]?.ctaText}
      />
      <RegionsComponent
        regionsData={transformed}
        //   category={slug} // Optional: if you need to know the category
      />
      <FindServiceLevel3
        contentBlocks={
          BOOKKEEPING_SERVICE_FIND_SERVICE_CONTENT["bookkeepers-near-me"]
        }
        title={BOOKKEEPING_SERVICE_CONFIG_TOP["bookkeepers-near-me"]?.ctaText}
      />
      <Frequently
        FrequentlyQuestion={BOOKKEEPING_SERVICE_FAQ["bookkeepers-near-me"]}
      />
      <AveragePrice
        title={
          BOOKKEEPING_SERVICE_CONFIG_TOP["bookkeepers-near-me"]?.avgPriceTitle
        }
        RELTED_PRICE={BOOKKEEPING_SERVICE_AVERAGE_PRICE["bookkeepers-near-me"]}
        // avg_price={BOOKKEEPING_SERVICE_CONFIG_TOP["bookkeepers-near-me"]?.showSpeicialits}
        showSpeicialits={
          BOOKKEEPING_SERVICE_CONFIG_TOP["bookkeepers-near-me"]?.showSpeicialits
        }
        // isSingular={CONTENT_CONFIG_TOP[slug]?.isSingular}
        // monthlyText={CONTENT_CONFIG_TOP[slug]?.monthlyText}
      />
      <Reviews
        RELATED_REVIEW={BOOKKEEPING_SERVICE_REVIEWS_DATA["bookkeepers-near-me"]}
      />
      <GetQuotesLevel3
        needSString={false}
        message={BOOKKEEPING_SERVICE_CONFIG_TOP["bookkeepers-near-me"]?.ctaText}
      />
    </>
  );
}

export default BookKeepingService;
