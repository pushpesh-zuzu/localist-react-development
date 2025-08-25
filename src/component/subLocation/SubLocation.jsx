import React from "react";
import { useParams } from "react-router-dom";
import {
  BannerImageLevel5,
  BREADCRUMB_LEVEL5_CONFIG,
  CONTENT_CONFIG_LEVEL5_TOP,
  CONTENT_LEVEL5_CONFIG_META,
  FIND_CONTENT_LEVEL5_CONFIG,
  FIND_SERVICE_CONTENT_LEVEL5,
  HOW_WORK_LEVEL5,
  LEVEL5_SERVICES_NAME,
  OTHER_SERVICES_DATA_LEVEL5,
  POPULAR_SERVICES_LEVEL5_COMPANIES,
} from "../../constant/subLocation";
import PopularCity from "../subCategory/famousCities/PopularCity";
import { Helmet } from "react-helmet-async";
import GetQuotesLocation from "../common/getQuotes/GetQuotesLocation";
import AccountantInLocation from "../location/AccountantInLocation/AccountantInLocation";
import HowWeWork from "../location/HowWeWorkLocation/HowWeWork";
import PopularAccountant from "../location/PopularAccountant/PopularAccountant";
import RegionsComponent from "../subCategory/Regions/Regions";
import Slider from "../common/slider/Slider";
import FindAnAccountant from "../../component/subCategory/Accountant/FindAnAccountant";

const transformFenceInstallersData = (rawData, locationKey) => {
  return rawData?.[locationKey]?.map((region) => ({
    key: region.id, // Convert id to key
    [region.title]: region.items, // Dynamic key with region title
  }));
};
const regionsData = {
  "fence-installers": {
    warrington: [
      {
        id: 3,
        title: "North West England",
        items: [
          "Chester",
          "Ellesmere Port",
          "Nantwich",
          "Winsford",
          "Neston",
          "Runcorn",
          "Frodsham",
        ],
      },
    ],
  },
};

const SubLocation = () => {
  const { service, location, subLocation } = useParams();
  function capitalizeFirstLetter(str) {
    if (!str) return ""; // agar empty ya undefined ho
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const findContents = FIND_CONTENT_LEVEL5_CONFIG[service]?.[subLocation];
  const transformedData = transformFenceInstallersData(
    regionsData[service],
    subLocation
  );
  const contentBlocks = FIND_SERVICE_CONTENT_LEVEL5[service]?.subLocation;

  return (
    <>
      <Helmet>
        <title>
          {CONTENT_LEVEL5_CONFIG_META[service]?.[subLocation]?.title}
        </title>
        <meta
          name={CONTENT_LEVEL5_CONFIG_META[service]?.[subLocation]?.name}
          content={CONTENT_LEVEL5_CONFIG_META[service]?.[subLocation]?.content}
        />
         <link
          rel="preload"
          href={BannerImageLevel5[service]?.[subLocation]}
          as="image"
        />
      </Helmet>
      <AccountantInLocation
       bgImage={BannerImageLevel5[service]?.[subLocation]}
        defaultService={LEVEL5_SERVICES_NAME[service]}
        title={CONTENT_CONFIG_LEVEL5_TOP[service]?.[subLocation]?.title}
        breadcrumb={BREADCRUMB_LEVEL5_CONFIG[service]?.[subLocation]}
        locationsName={capitalizeFirstLetter(subLocation)}
        findData={FIND_CONTENT_LEVEL5_CONFIG[service]?.[subLocation]}
      />

      <HowWeWork
        heading="Localist"
        title={CONTENT_CONFIG_LEVEL5_TOP[service]?.[subLocation]?.title}
        HowWeWorkLocationData={HOW_WORK_LEVEL5[service]?.[subLocation]}
      />

      <PopularAccountant
        title={CONTENT_CONFIG_LEVEL5_TOP[service]?.[subLocation]?.title}
        PopularAccountantData={
          POPULAR_SERVICES_LEVEL5_COMPANIES[service]?.[subLocation]
        }
      />
      <RegionsComponent heading="NearBy" regionsData={transformedData} />
      <FindAnAccountant
        contentBlocks={FIND_SERVICE_CONTENT_LEVEL5[service]?.[subLocation]}
        title={CONTENT_CONFIG_LEVEL5_TOP[service]?.[subLocation]?.mainTitle}
      />

      <Slider
        sliderdata={OTHER_SERVICES_DATA_LEVEL5[service]?.[subLocation]}
        title="You May Be Interested In"
        blueTitle="Other Services "
      />

      <GetQuotesLocation
        service={CONTENT_CONFIG_LEVEL5_TOP[service]?.[subLocation]?.title}
        location={capitalizeFirstLetter(subLocation)}
      />
    </>
  );
};

export default SubLocation;
