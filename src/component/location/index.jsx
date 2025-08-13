import React from "react";
import AccountantInLocation from "./AccountantInLocation/AccountantInLocation";
import HowWeWork from "./HowWeWorkLocation/HowWeWork";
import AveragePriceLocation from "./AveragePriceLocation/AveragePriceLocation";
// import PopularAccountingServices from "./PopularAccountingServices/PopularAccountingServices";
import PopularAccountant from "./PopularAccountant/PopularAccountant";
// import PopularCitiesLocation from "./PopularCitiesLocation/PopularCitiesLocation";
import { useParams } from "react-router-dom";
import {
  BannerImageLevel4,
  BREADCRUMB_LEVEL4_CONFIG,
  CONTENT_CONFIG_LEVEL4_TOP,
  CONTENT_LEVEL4_CONFIG_META,
  FIND_CONTENT_LEVEL4_CONFIG,
  HOW_WORK_LEVEL4,
  LEVEL4_SERVICES_NAME,
  POPULAR_ACCOUNTS_COMPANIES,
  POPULAR_CITIES_LEVEL4,
} from "../../constant/levelFourData";
import PopularCity from "../subCategory/famousCities/PopularCity";
import { Helmet } from "react-helmet-async";
import GetQuotesLocation from "../common/getQuotes/GetQuotesLocation";

const Location = () => {
  const { service, location } = useParams();

function capitalizeFirstLetter(str) {
  if (!str) return "";
  
  return str
    .split('-') 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' '); 
}

  const findContents = FIND_CONTENT_LEVEL4_CONFIG[service]?.[location];

  return (
    <>
      <Helmet>
        <title>{CONTENT_LEVEL4_CONFIG_META[service]?.[location]?.title}</title>
        <meta
          name={CONTENT_LEVEL4_CONFIG_META[service]?.[location]?.name}
          content={CONTENT_LEVEL4_CONFIG_META[service]?.[location]?.content}
        />
      </Helmet>

      <AccountantInLocation
      bgImage={BannerImageLevel4[service]?.[location]}
        defaultService={LEVEL4_SERVICES_NAME[service]}
        title={CONTENT_CONFIG_LEVEL4_TOP[service]?.[location]?.title}
        breadcrumb={BREADCRUMB_LEVEL4_CONFIG[service]?.[location]}
        locationsName={capitalizeFirstLetter(location)}
        findData={findContents}
      />

      <HowWeWork
        title={CONTENT_CONFIG_LEVEL4_TOP[service]?.[location]?.title}
        HowWeWorkLocationData={HOW_WORK_LEVEL4[service]?.[location]}
      />

      {/* <PopularAccountingServices PopularServicesData={POPULAR_SERVICE_DATA[service]} popularHeading='Fencing Services' /> */}

      <AveragePriceLocation
        title={CONTENT_CONFIG_LEVEL4_TOP[service]?.[location]?.title}
        locationName={capitalizeFirstLetter(location)}
        isNeedS
      />

      <PopularAccountant
        title={CONTENT_CONFIG_LEVEL4_TOP[service]?.[location]?.title}
        PopularAccountantData={POPULAR_ACCOUNTS_COMPANIES[service]?.[location]}
      />

      {/* <PopularCitiesLocation /> */}
      <PopularCity
        title={"Popular Cities in"}
        location={capitalizeFirstLetter(location)}
        sliderdata={POPULAR_CITIES_LEVEL4[service]?.[location]}
      />

      <GetQuotesLocation
        service={CONTENT_CONFIG_LEVEL4_TOP[service]?.[location]?.title}
        location={capitalizeFirstLetter(location)}
      />
    </>
  );
};

export default Location;
