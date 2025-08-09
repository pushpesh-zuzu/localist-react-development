import Accountants from "../component/category/accountants/CloneAccountants";
import PopularCategories from "../component/category/popularCategories/ClonePopularCategories";
import AllServicesComponent from "../component/category/allServices/CloneAllServices";
import FindingBusinessProfessionals from "../component/category/findingBusinessProfessionals/CloneFindingBusinessProfessionals";
import GetQuotes from "../component/common/getQuotes/GetQuotes";
import styles from "./clonecategory.module.css";
import { useLocation, Link } from "react-router-dom";
import {
  HowItWorksData,
  PopularCategoriesData,
} from "../constant/CloneCategory";
import { AllServicesData } from "../constant/CloneCategory";
import SocialMediaImage from "../assets/Images/SocialMediaImage.svg";
import WebDesignImage from "../assets/Images/WebDesignImage.svg";
import TaxPreparationImage from "../assets/Images/TaxPreparationImage.svg";

import bgImage from "../assets/Images/bgImage.svg";
import financeBg from "../assets/Images/financeImg.svg";
import { Helmet } from "react-helmet-async";
import BannerWithBreadCrum from "../component/category/ServicesHeroSection/BannerWithBreadCrum";
import FenchandGet from "../assets/Images/FenchandGet.jpg";
import PatioPatioServices from "../assets/Images/PatioServices.jpg";
import DrivewayInstallation from "../assets/Images/DrivewayInstallation.jpg";
import Builders from "../assets/Images/servicesLevels/Builders.jpg";

const popularFilterLevelTwo = [
  {
    builders: [
      {
        id: 1,
        title: "Fence & Gate Installation",
        image: FenchandGet,
      },
      {
        id: 2,
        title: "Driveway Installation",
        image: DrivewayInstallation,
      },
      {
        id: 3,
        title: "Patio Services",
        image: PatioPatioServices,
      },
    ],
  },
];

const endpointServiceMap = {
  home: [
    "Fence & Gate Installation",
    "Driveway Installation",
    "Patio Services",
    "Landscaping",
    "Artificial Grass Installation",
  ],
  builders: [
    "Fence & Gate Installation",
    "Driveway Installation",
    "Patio Services",
  ],
};

const breadcrumbHierarchy = {
  business: ["Business"],
  "financial-and-accounting": ["Business", "Financial and Accounting"],
  accountants: [
    "Business",
    "Financial and Accounting",
    "General Accounting",
    "Accounting",
  ],
  "bookkeeping-services": [
    "Business",
    "Financial and Accounting",
    "General Accounting",
    "Bookkeeping Services",
  ],
};

const CloneSubTwoCategory = ({
  accountHeader,
  subHeader,
  bestText = `Best of all - it's completely free!`,
  routeName = "",
}) => {
  const location = useLocation();
  const fullPath = location.pathname;
  const endpoint = fullPath.split("/").filter(Boolean).pop(); // e.g., 'accountants'
  console.log(endpoint, "endpointendpointendpoint");
  const breadcrumbItems = breadcrumbHierarchy[endpoint] || [];

  const message = `from ${subHeader} professionals today`;

  const allowedServices = endpointServiceMap[endpoint] || [];

  const filteredAllServicesData = AllServicesData.map((categoryObj) => {
    const [category, services] = Object.entries(categoryObj)[1]
      ? Object.entries(categoryObj)[1]
      : [null, []];

    const filteredServices = services.filter((service) =>
      allowedServices.includes(service)
    );

    if (filteredServices.length > 0) {
      return { key: categoryObj.key, [category]: filteredServices };
    }
    return null;
  }).filter(Boolean);
  function getFilterLevelTwoByKey(key) {
    const match = popularFilterLevelTwo.find((group) => group[key]);
    return match ? match[key] : [];
  }

  return (
    <div>
      <Helmet>
        <title>
          Builders Near Me | Find Local Professional Builders - Localists
        </title>
        <meta
          name="description"
          content="Find the best builder near you. Get free quotes from trusted local builders for home extensions, renovations, and new builds. Start your project today."
        />
      </Helmet>
      <BannerWithBreadCrum
        header={accountHeader}
        LevelOneTwoTitle={subHeader}
        accountHeader="Builders"
        level={2}
        service={true}
        panelImage={Builders}
        title="Builders"
        breadcrumb=" Home & Garden / Builders / Fence & Gate Installation"
        para1={
          "Localists help you find the best Builders Professionals near you and obtain free, no obligation quotes"
        }
        para2={
          "Our local Builders Professionals are ready to help with any project you may have. Just tell us what you’re looking for, where you require the service, and Localists will do the rest. Get tailored matches of the best, qualified Builders Professionals near you, compare services, check reviews, and obtain free, no obligation quotes. No time wasted - It’s that easy. Also, there’s no obligation to commit or hire, just helpful tools to guide your decision and make the hiring process quicker and easier"
        }
        para3={"Get started with Localists today!"}
      />
      <PopularCategories data={getFilterLevelTwoByKey("builders")} />
      <AllServicesComponent data={filteredAllServicesData} />
      <GetQuotes message={message} />
    </div>
  );
};

export default CloneSubTwoCategory;
