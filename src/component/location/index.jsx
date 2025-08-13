import React from "react";
import AccountantInLocation from "./AccountantInLocation/AccountantInLocation";
import HowWeWork from "./HowWeWorkLocation/HowWeWork";
import AveragePriceLocation from "./AveragePriceLocation/AveragePriceLocation";
// import PopularAccountingServices from "./PopularAccountingServices/PopularAccountingServices";
import PopularAccountant from "./PopularAccountant/PopularAccountant";
// import PopularCitiesLocation from "./PopularCitiesLocation/PopularCitiesLocation";
import { useParams } from "react-router-dom";
import {
  BREADCRUMB_LEVEL4_CONFIG,
  CONTENT_CONFIG_LEVEL4_TOP,
  CONTENT_LEVEL4_CONFIG_META,
  FIND_CONTENT_LEVEL4_CONFIG,
  HOW_WORK_LEVEL4,
  POPULAR_ACCOUNTS_COMPANIES,
  POPULAR_CITIES,
} from "../../constant/levelFourData";
import PopularCity from "../subCategory/famousCities/PopularCity";
import { Helmet } from "react-helmet-async";
import GetQuotesLocation from "../common/getQuotes/GetQuotesLocation";

const Location = () => {
  const { service, location } = useParams();
  function capitalizeFirstLetter(str) {
    if (!str) return ""; // agar empty ya undefined ho
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const findContents = FIND_CONTENT_LEVEL4_CONFIG[service];
  return (
    <>
      <Helmet>
        <title>{CONTENT_LEVEL4_CONFIG_META[service]?.title}</title>
        <meta
          name={CONTENT_LEVEL4_CONFIG_META[service]?.name}
          content={CONTENT_LEVEL4_CONFIG_META[service]?.content}
        />
      </Helmet>
      <AccountantInLocation
        defaultService={LEVEL4_SERVICES_NAME[service]}
        title={CONTENT_CONFIG_LEVEL4_TOP[service]?.title}
        breadcrumb={BREADCRUMB_LEVEL4_CONFIG[service]}
        locationsName={capitalizeFirstLetter(location)}
        findData={findContents}
      />
      <HowWeWork
        title={CONTENT_CONFIG_LEVEL4_TOP[service]?.title}
        HowWeWorkLocationData={HOW_WORK_LEVEL4[service]}
      />
      {/* <PopularAccountingServices PopularServicesData={POPULAR_SERVICE_DATA[service]} popularHeading='Fencing Services' /> */}
      <AveragePriceLocation
        title={CONTENT_CONFIG_LEVEL4_TOP[service]?.title}
        locationName={location}
        isNeedS
      />
      <PopularAccountant
        title={CONTENT_CONFIG_LEVEL4_TOP[service]?.title}
        PopularAccountantData={POPULAR_ACCOUNTS_COMPANIES[service]}
      />
      {/* <PopularCitiesLocation /> */}
      <PopularCity
        title={"Popular Cities in"}
        location={capitalizeFirstLetter(location)}
        POPULAR_CITIES={POPULAR_CITIES}
      />
      <GetQuotesLocation
        service={CONTENT_CONFIG_LEVEL4_TOP[service]?.title}
        location={capitalizeFirstLetter(location)}
      />
    </>
  );
};

export default Location;
