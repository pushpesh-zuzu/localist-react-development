import React from "react";
// import AccountantInLocation from "./AccountantInLocation/AccountantInLocation";
// import HowWeWork from "./HowWeWorkLocation/HowWeWork";
// import AveragePriceLocation from "./AveragePriceLocation/AveragePriceLocation";
// import PopularAccountant from "./PopularAccountant/PopularAccountant";
// import GetQuotes from "../common/getQuotes/GetQuotes";
import { useParams } from "react-router-dom";
import {
  BREADCRUMB_LEVEL5_CONFIG,
  CONTENT_CONFIG_LEVEL5_TOP,
  CONTENT_LEVEL5_CONFIG_META,
  FIND_CONTENT_LEVEL5_CONFIG,
  HOW_WORK_LEVEL5,
  OTHER_SERVICES_DATA_LEVEL5,
  POPULAR_SERVICES_LEVEL5_COMPANIES,
} from "../../constant/subLocation";
import PopularCity from "../subCategory/famousCities/PopularCity";
import { Helmet } from "react-helmet-async";
import GetQuotesLocation from "../common/getQuotes/GetQuotesLocation";
import AccountantInLocation from "../location/AccountantInLocation/AccountantInLocation";
import HowWeWork from "../location/HowWeWorkLocation/HowWeWork";
import PopularAccountant from "../location/PopularAccountant/PopularAccountant";
import NearbyPlaces from "./NearByPlace";
import RegionsComponent from "../subCategory/Regions/Regions";
import Slider from "../common/slider/Slider";
const transformFenceInstallersData = (rawData, id) => {
  return rawData[id]?.map((region) => ({
    key: region.id, // Convert id to key
    [region.title]: region.items, // Create dynamic key with region title
  }));
};
const regionsData = {
  "fence-installers": [
    {
      id: 3,
      title: "North West England",
      items: ["Cheshire", "Greater Manchester", "Lancashire", "Merseyside"],
    },
  ],
}

const SubLocation = () => {
  const { service, location, subLocation } = useParams();
  function capitalizeFirstLetter(str) {
    if (!str) return ""; // agar empty ya undefined ho
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const findContents = FIND_CONTENT_LEVEL5_CONFIG[service];
    const transformedData = transformFenceInstallersData(regionsData, service);

  return (
    <>
      <Helmet>
        <title>{CONTENT_LEVEL5_CONFIG_META[service]?.title}</title>
        <meta
          name={CONTENT_LEVEL5_CONFIG_META[service]?.name}
          content={CONTENT_LEVEL5_CONFIG_META[service]?.content}
        />
      </Helmet>
      <AccountantInLocation
        title={CONTENT_CONFIG_LEVEL5_TOP[service]?.title}
        breadcrumb={BREADCRUMB_LEVEL5_CONFIG[service]}
        locationsName={capitalizeFirstLetter(subLocation)}
        findData={findContents}
      />
      <HowWeWork
        heading="Localist"
        title={CONTENT_CONFIG_LEVEL5_TOP[service]?.title}
        HowWeWorkLocationData={HOW_WORK_LEVEL5[service]}
      />
        <PopularAccountant
          title={CONTENT_CONFIG_LEVEL5_TOP[service]?.title}
          PopularAccountantData={POPULAR_SERVICES_LEVEL5_COMPANIES[service]}
        />
        <RegionsComponent heading="NearBy" regionsData={transformedData} />
         <Slider
        sliderdata={OTHER_SERVICES_DATA_LEVEL5[service]}
        title="You May Be Interested In"
        blueTitle="Other Services "
      />
      {/* <AveragePriceLocation
        title={CONTENT_CONFIG_LEVEL4_TOP[service]?.title}
        locationName={location}
        isNeedS
      /> */}
      {/* <PopularCity
        title={"Popular Cities in"}
        location={capitalizeFirstLetter(location)}
        POPULAR_CITIES={POPULAR_CITIES}
      /> */}
      <GetQuotesLocation
        service={CONTENT_CONFIG_LEVEL5_TOP[service]?.title}
        location={capitalizeFirstLetter(subLocation)}
      />
    </>
  );
};

export default SubLocation;
