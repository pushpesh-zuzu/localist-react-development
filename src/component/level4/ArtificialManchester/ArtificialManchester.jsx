import React from "react";
import AccountantInLocation from "../AccountantInLocation/AccountantInLocation";
import HowWeWork from "../HowWeWorkLocation/HowWeWork";
import AveragePriceLocation from "../AveragePriceLocation/AveragePriceLocation";
// import PopularAccountingServices from "./PopularAccountingServices/PopularAccountingServices";
import PopularAccountant from "../PopularAccountant/PopularAccountant";
// import PopularCitiesLocation from "./PopularCitiesLocation/PopularCitiesLocation";
import { Helmet } from "react-helmet-async";
import {
  ARTIFICIAL_MANCHESTER_BANNER,
  ARTIFICIAL_MANCHESTER_BREADCRUMB_LEVEL4_CONFIG,
  ARTIFICIAL_MANCHESTER_CONTENT_CONFIG_LEVEL4_TOP,
  ARTIFICIAL_MANCHESTER_CONTENT_QUESTION_CONTENT_BLOCK,
  ARTIFICIAL_MANCHESTER_FIND_CONTENT_LEVEL4_CONFIG,
  ARTIFICIAL_MANCHESTER_HOW_WORK_LEVEL4,
  ARTIFICIAL_MANCHESTER_LEVEL4_SERVICES_NAME,
  ARTIFICIAL_MANCHESTER_OTHER_SERVICES_DATA,
  ARTIFICIAL_MANCHESTER_POPULAR_ACCOUNTS_COMPANIES,
  ARTIFICIAL_MANCHESTER_POPULAR_CITIES_LEVEL4,
  ARTIFICIAL_MANCHESTER_REGIONS,
} from "./ArtificialManchesterData";
import PopularCity from "../../subCategory/famousCities/PopularCity";
import GetQuotesLocation from "../../common/getQuotes/GetQuotesLocation";
import RegionsComponent from "../../subCategory/Regions/Regions";
import Slider from "../../common/slider/Slider";
import FindServiceLevel4 from "../FindServiceLevel4/FindServiceLevel4";

const transformFenceInstallersData = (rawData, id) => {
  return rawData[id]?.map((region) => ({
    key: region.id,
    title: region.title,
    items: region.items.map((item) => ({
      name: item.name,
      path: item.path,
    })),
  }));
};
const ArtificialManchester = () => {
  const transformedData = transformFenceInstallersData(
    ARTIFICIAL_MANCHESTER_REGIONS["artificial-grass-installers-near-me"],
    "manchester"
  );

  function capitalizeFirstLetter(str) {
    if (!str) return "";

    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const findContents =
    ARTIFICIAL_MANCHESTER_FIND_CONTENT_LEVEL4_CONFIG[
      "artificial-grass-installers-near-me"
    ]?.["manchester"];

  return (
    <>
      <Helmet>
        <title>Artificial Grass Installers Manchester | Localists.com</title>
        <meta
          name="description"
          content="Looking for artificial grass fitters in Manchester? Then look no further! Click to get 5 instant quotes from artificial grass installers in Manchester… "
        />
      </Helmet>

      <AccountantInLocation
        bgImage={
          ARTIFICIAL_MANCHESTER_BANNER["artificial-grass-installers-near-me"]?.[
            "manchester"
          ]
        }
        defaultService={
          ARTIFICIAL_MANCHESTER_LEVEL4_SERVICES_NAME[
            "artificial-grass-installers-near-me"
          ]
        }
        title={
          ARTIFICIAL_MANCHESTER_CONTENT_CONFIG_LEVEL4_TOP[
            "artificial-grass-installers-near-me"
          ]?.["manchester"]?.title
        }
        findAccoundTitle={
          ARTIFICIAL_MANCHESTER_CONTENT_CONFIG_LEVEL4_TOP[
            "artificial-grass-installers-near-me"
          ]?.["manchester"]?.findAccoundTitle
        }
        breadcrumb={
          ARTIFICIAL_MANCHESTER_BREADCRUMB_LEVEL4_CONFIG[
            "artificial-grass-installers-near-me"
          ]?.["manchester"]
        }
        locationsName={capitalizeFirstLetter("manchester")}
        findData={findContents}
      />

      <HowWeWork
        title={
          ARTIFICIAL_MANCHESTER_CONTENT_CONFIG_LEVEL4_TOP[
            "artificial-grass-installers-near-me"
          ]?.["manchester"]?.title
        }
        HowWeWorkLocationData={
          ARTIFICIAL_MANCHESTER_HOW_WORK_LEVEL4[
            "artificial-grass-installers-near-me"
          ]?.["manchester"]
        }
      />

      {/* <PopularAccountingServices PopularServicesData={POPULAR_SERVICE_DATA['artificial-grass-installers-near-me']} popularHeading='Fencing Services' /> */}
      <FindServiceLevel4
        contentBlocks={
          ARTIFICIAL_MANCHESTER_CONTENT_QUESTION_CONTENT_BLOCK[
            "artificial-grass-installers-near-me"
          ]?.["manchester"]
        }
        title={
          ARTIFICIAL_MANCHESTER_CONTENT_CONFIG_LEVEL4_TOP[
            "artificial-grass-installers-near-me"
          ]?.["manchester"]?.title
        }
      />
      <RegionsComponent
        regionsData={transformedData}
        category={"manchester"} // Optional: if you need to know the category
        heading="NearBy"
      />

      {/* <AveragePriceLocation
        title={
          ARTIFICIAL_MANCHESTER_CONTENT_CONFIG_LEVEL4_TOP[
            "artificial-grass-installers-near-me"
          ]?.["manchester"]?.title
        }
        locationName={capitalizeFirstLetter("manchester")}
        isNeedS
      /> */}

      {/* <PopularAccountant
        title={
          ARTIFICIAL_MANCHESTER_CONTENT_CONFIG_LEVEL4_TOP[
            "artificial-grass-installers-near-me"
          ]?.["manchester"]?.title
        }
        PopularAccountantData={
          ARTIFICIAL_MANCHESTER_POPULAR_ACCOUNTS_COMPANIES[
            "artificial-grass-installers-near-me"
          ]?.["manchester"]
        }
      /> */}

      {/* <PopularCitiesLocation /> */}
      {/* <PopularCity
        title={"Popular Cities in"}
        location={capitalizeFirstLetter("manchester")}
        sliderdata={
          ARTIFICIAL_MANCHESTER_POPULAR_CITIES_LEVEL4[
            "artificial-grass-installers-near-me"
          ]?.["manchester"]
        }
      /> */}
      <Slider
        sliderdata={
          ARTIFICIAL_MANCHESTER_OTHER_SERVICES_DATA[
            "artificial-grass-installers-near-me"
          ]?.["manchester"]
        }
        title="you may be interested in"
        blueTitle="Other services "
      />
      <GetQuotesLocation
        service={
          ARTIFICIAL_MANCHESTER_CONTENT_CONFIG_LEVEL4_TOP[
            "artificial-grass-installers-near-me"
          ]?.["manchester"]?.findAccoundTitle
        }
        needSString={false}
      />
    </>
  );
};

export default ArtificialManchester;
