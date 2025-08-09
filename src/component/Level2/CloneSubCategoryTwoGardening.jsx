import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import BannerWithBreadCrum from "../category/ServicesHeroSection/BannerWithBreadCrum";
import PopularCategories from "../category/popularCategories/ClonePopularCategories";
import AllServicesComponent from "../category/allServices/CloneAllServices";
import GetQuotes from "../common/getQuotes/GetQuotes";
import FenchandGet from "../../assets/Images/FenchandGet.jpg";
import PatioPatioServices from "../../assets/Images/PatioServices.jpg";
import DrivewayInstallation from "../../assets/Images/DrivewayInstallation.jpg";
import { AllServicesData } from "../../constant/CloneCategory";
import LandscapingGardeningBanner from "../../assets/Images/servicesLevels/banner/landscapingandgardeningBanner.jpg";

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
  "gardening-landscaping": ["Landscaping", "Artificial Grass Installation"],
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

const CloneSubCategoryTwoGardening = ({ accountHeader, subHeader }) => {
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
        <title>Local Gardening & Landscaping Experts Near Me - Localists</title>
        <meta
          name="description"
          content="Find expert gardening and landscaping professionals near you. From lawn care to full garden design, get free quotes from trusted local landscapers today."
        />
      </Helmet>
      <BannerWithBreadCrum
        header={accountHeader}
        subHeader={subHeader}
        accountHeader="Gardening & Landscaping"
        level={2}
        service={true}
        panelImage={LandscapingGardeningBanner}
        title="Gardening & Landscaping"
        breadcrumb={[{title :"Home & Garden",path:'/home'},{title :"Garden & Gardening"}]}
        para1={
          "Localists help you find the best Gardening & Landscaping Professionals near you and obtain free, no obligation quotes."
        }
        para2={
          "Our local Gardening & Landscaping Professionals are ready to help with any project you may have. Just tell us what you’re looking for, where you require the service, and Localists will do the rest. Get tailored matches of the best, qualified Gardening & Landscaping Professionals near you, compare services, check reviews, and obtain free, no obligation quotes. No time wasted - It’s that easy. Also, there’s no obligation to commit or hire, just helpful tools to guide your decision and make the hiring process quicker and easier."
        }
        para3={"Get started with Localists today!"}
      />
      <PopularCategories data={getFilterLevelTwoByKey("builders")} />
      <AllServicesComponent data={filteredAllServicesData} />
      <GetQuotes message={message} />
    </div>
  );
};

export default CloneSubCategoryTwoGardening;
