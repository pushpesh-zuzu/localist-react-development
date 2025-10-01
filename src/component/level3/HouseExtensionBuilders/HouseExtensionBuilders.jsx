import React from "react";
import { Helmet } from "react-helmet-async";
import SearchAndFindAnAccountant from "../SearchAndFindAnAccountant";
import {
  AIRPORTHOUSE_EXTENSION_BUILDERS__FAQ,
  HOUSE_EXTENSION_BUILDERS_AVERAGE_PRICE,
  HOUSE_EXTENSION_BUILDERS_BREADCRUMB_CONFIG,
  HOUSE_EXTENSION_BUILDERS_CONFIG_TOP,
  HOUSE_EXTENSION_BUILDERS_CONTENT_CONFIG,
  HOUSE_EXTENSION_BUILDERS_FIND_SERVICE_CONTENT,
  HOUSE_EXTENSION_BUILDERS_HOW_IT_WORK,
  HOUSE_EXTENSION_BUILDERS_REGION_DATA,
  HOUSE_EXTENSION_BUILDERS_REVIEWS_DATA,
} from "./HouseExtensionBuildersData";
import HowItWorks from "../../subCategory/workSteps/HowItWorks";
import FindServiceLevel3 from "../FindServiceLevel3";
import Frequently from "../../subCategory/Faq/Frequently";
import AveragePriceTransportServices from "../../subCategory/AveragePrice/AveragePriceTransportServices";
import Reviews from "../../subCategory/Reviews/Reviews";
import AirportTransfers from "../banners/AirportTransfers.webp";
import RegionsComponent from "../../subCategory/Regions/Regions";
import { transformData } from "../../../utils/allServicesUtils";
import GetQuotesLevel3 from "../GetQuotesLevel3";
import AveragePrice from "../../subCategory/AveragePrice/AveragePrice";

function HouseExtensionBuilders() {
  const transformed = transformData(
    HOUSE_EXTENSION_BUILDERS_REGION_DATA,
    "property-extensions-near-me"
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
        title={
          HOUSE_EXTENSION_BUILDERS_CONFIG_TOP["property-extensions-near-me"]
            ?.title
        }
        findingHeading={
          HOUSE_EXTENSION_BUILDERS_CONFIG_TOP["property-extensions-near-me"]
            ?.findingHeading
        }
        breadcrumb={
          HOUSE_EXTENSION_BUILDERS_BREADCRUMB_CONFIG[
            "property-extensions-near-me"
          ]
        }
        // bannerImage={CONTENT_CONFIG_BANNER["property-extensions-near-me"]?.banner}
        bannerImage={AirportTransfers}
        para1={
          HOUSE_EXTENSION_BUILDERS_CONTENT_CONFIG["property-extensions-near-me"]
            ?.para1
        }
        para2={
          HOUSE_EXTENSION_BUILDERS_CONTENT_CONFIG["property-extensions-near-me"]
            ?.para2
        }
        para3={
          HOUSE_EXTENSION_BUILDERS_CONTENT_CONFIG["property-extensions-near-me"]
            ?.para3
        }
        defaultService={"property-extensions-near-me"}
        isNeedS={false}
      />
      <HowItWorks
        HowItWorksData={
          HOUSE_EXTENSION_BUILDERS_HOW_IT_WORK["property-extensions-near-me"]
        }
        title={
          HOUSE_EXTENSION_BUILDERS_CONFIG_TOP["property-extensions-near-me"]
            ?.ctaText
        }
      />
      <RegionsComponent
        regionsData={transformed}
        //   category={slug} // Optional: if you need to know the category
      />
      <FindServiceLevel3
        contentBlocks={
          HOUSE_EXTENSION_BUILDERS_FIND_SERVICE_CONTENT[
            "property-extensions-near-me"
          ]
        }
        title={
          HOUSE_EXTENSION_BUILDERS_CONFIG_TOP["property-extensions-near-me"]
            ?.ctaText
        }
      />
      <Frequently
        FrequentlyQuestion={
          AIRPORTHOUSE_EXTENSION_BUILDERS__FAQ["property-extensions-near-me"]
        }
      />
      <AveragePrice
        title={
          HOUSE_EXTENSION_BUILDERS_CONFIG_TOP["property-extensions-near-me"]
            ?.avgPriceTitle
        }
        RELTED_PRICE={
          HOUSE_EXTENSION_BUILDERS_AVERAGE_PRICE["property-extensions-near-me"]
        }
        // avg_price={HOUSE_EXTENSION_BUILDERS_CONFIG_TOP["property-extensions-near-me"]?.showSpeicialits}
        showSpeicialits={
          HOUSE_EXTENSION_BUILDERS_CONFIG_TOP["property-extensions-near-me"]
            ?.showSpeicialits
        }
        // isSingular={CONTENT_CONFIG_TOP[slug]?.isSingular}
        // monthlyText={CONTENT_CONFIG_TOP[slug]?.monthlyText}
      />
      <Reviews
        RELATED_REVIEW={
          HOUSE_EXTENSION_BUILDERS_REVIEWS_DATA["property-extensions-near-me"]
        }
      />
      <GetQuotesLevel3
        needSString={false}
        message={
          HOUSE_EXTENSION_BUILDERS_CONFIG_TOP["property-extensions-near-me"]
            ?.ctaText
        }
      />
    </>
  );
}

export default HouseExtensionBuilders;
