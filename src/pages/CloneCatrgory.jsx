// import Accountants from "../component/category/accountants/CloneAccountants";
// import HowItWorks from "../component/category/howItWorks/CloneHowitWorks";
// import PopularCategories from "../component/category/popularCategories/ClonePopularCategories";
// import AllServicesComponent from "../component/category/allServices/CloneAllServices";
// import FindingBusinessProfessionals from "../component/category/findingBusinessProfessionals/CloneFindingBusinessProfessionals";
// import GetQuotes from "../component/common/getQuotes/GetQuotes";

// const CloneCategory = () => {

//     const propsData={
//         accountHeader:""
//     }
//   return (
//     <div>
//       <Accountants />
//       <FindingBusinessProfessionals />
//       <HowItWorks />
//       <PopularCategories />
//       <AllServicesComponent />
//       <GetQuotes message="from Business professional today" />
//     </div>
//   );
// };

// export default CloneCategory;

import Accountants from "../component/category/accountants/CloneAccountants";
import HowItWorks from "../component/category/howItWorks/CloneHowitWorks";
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
//AllServicesData
import bgImage from "../assets/Images/bgImage.svg";
import financeBg from "../assets/Images/financeImg.svg";
import { Helmet } from "react-helmet-async";
import BannerWithBreadCrum from "../component/category/ServicesHeroSection/BannerWithBreadCrum";
import Home from "../assets/Images/servicesLevels/Home.jpg";

const endpointCategoryMap = {
  // "financial-and-accounting": ["General Accounting"],
  "financial-and-accounting": ["Accounting", "Bookkeeping Services"],
  // "general-accounting": ["Accounting", "Bookkeeping Services"],
  business: [
    "Accounting",
    "Bookkeeping Services",
    "Business Consulting",
    "Social Media Marketing",
  ],
  home: [
    "General Builders",
    "Landscaping",
    "Property Extensions",
    "Architectural Services",
    "Fence & Gate Installation",
    "Driveway Installation",
    "Patio Services",
    "Home Insulation",
  ],
};
const endpointServiceMap = {
  // "financial-and-accounting": ["general Accounting"],
  "financial-and-accounting": ["Accounting", "Bookkeeping Services"],
  // "general-accounting": ["Accounting", "Bookkeeping Services"],
  business: [
    "Accounting",
    "Bookkeeping Services",
    "Business Consulting",
    "Social Media Marketing",
  ],
  home: [
    "Fence & Gate Installation",
    "Driveway Installation",
    "Patio Services",
    "Landscaping",
    "Artificial Grass Installation",
  ],
};

const breadcrumbHierarchy = {
  business: ["Business"],
  "financial-and-accounting": ["Business", "Financial and Accounting"],
  // "general-accounting": ["Business", "Financial and Accounting", "General Accounting"],
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

const CloneCategory = ({
  accountHeader,
  subHeader,
  bestText = `Best of all - it's completely free!`,
  routeName = "",
}) => {
  const location = useLocation();
  // Use includes instead of strict match

  const fullPath = location.pathname;
  const endpoint = fullPath.split("/").filter(Boolean).pop(); // e.g., 'accountants'

  const breadcrumbItems = breadcrumbHierarchy[endpoint] || [];

  const message = `from ${subHeader} professionals today`;

  ///// logics for popular categories

  const pathSegments = location.pathname.split("/").filter(Boolean); // ['en', 'gb', 'business']
  const endpoint1 = pathSegments[pathSegments.length - 1]; // e.g., 'business'

  const allowedTitles = endpointCategoryMap[endpoint1] || [];
  const filteredCategories = PopularCategoriesData.filter((item) =>
    allowedTitles.includes(item.title)
  );

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

  const howItWorksData = HowItWorksData[endpoint1] || HowItWorksData.business;
  return (
    <div>
      <Helmet>
        <title>
          Find Trusted Home & Garden Professionals Near Me - Localists
        </title>
        <meta
          name="description"
          content="Need help finding Home & Garden professionals, consultants, or expert local services near you? Get free quotes now at Localists. It's quick, easy & free."
        />
      </Helmet>
      {/* <Accountants
        header={accountHeader}
        subHeader={subHeader}
        panelImage={financeBg}
      /> */}
      <BannerWithBreadCrum
        header={accountHeader}
        subHeader={subHeader}
        accountHeader="Home and Garden"
        level={2}
        panelImage={Home}
        title="Home & Garden"
        para1="At Localists, we connect you with the right Home & Garden Professionals for your needs."
        para2="Not sure how to find the right Home & Garden Professionals? Simply tell us what you need help with and where you need it, and we’ll recommend the best Home & Garden Professionals near you. See what they offer, check out their reviews, and get free quotation for the work you require."
        para3={`It's super fast and easy!`}
      />

      {/* {endpoint !== routeName && (
        <div className={styles.findAccountInfoContainer}>
          <p className={styles.breadcrumb}>
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              const slug = item.toLowerCase().replace(/ /g, "-");

              return isLast ? (
                <span key={index} className={styles.active}>
                  {item}
                </span>
              ) : (
                <span key={index}>
                  <Link to={`/en/gb/${slug}`} className={styles.link}>
                    {item}
                  </Link>{" "}
                  <span style={{ color: "black", padding: "0 4px" }}>/</span>
                </span>
              );
            })}
          </p>
        </div>
      )} */}

      {/* <FindingBusinessProfessionals
        header={accountHeader}
        subHeader={subHeader}
        bestText={bestText}
      /> */}
      <HowItWorks
        howItWorksData={howItWorksData}
        header={accountHeader}
        subHeader={subHeader}
      />
      <PopularCategories data={filteredCategories} />
      <AllServicesComponent data={filteredAllServicesData} />
      <GetQuotes message={message} />
    </div>
  );
};

export default CloneCategory;
