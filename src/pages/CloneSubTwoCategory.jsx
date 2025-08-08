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

//AllServicesData
import bgImage from "../assets/Images/bgImage.svg";
import financeBg from "../assets/Images/financeImg.svg";
import { Helmet } from "react-helmet-async";

const popularFilterLevelTwo = [
  {
    builders: [
      {
        id: 1,
        title: "Fence & Gate Installation",
        image: WebDesignImage,
      },
      {
        id: 2,
        title: "Driveway Installation",
        image: TaxPreparationImage,
      },
      {
        id: 3,
        title: "Patio Services",
        image: SocialMediaImage,
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

const CloneSubTwoCategory = ({
  accountHeader,
  subHeader,
  bestText = `Best of all - it's completely free!`,
  routeName = "",
}) => {
  const location = useLocation();
  // Use includes instead of strict match
  const panelImage = location.pathname.includes("/en/gb/business")
    ? bgImage
    : location.pathname.includes("/en/gb/financial-and-accounting")
    ? financeBg
    : "";

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
      <Accountants
        header={accountHeader}
        subHeader={subHeader}
        panelImage={bgImage}
      />

      {endpoint !== routeName && (
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
      )}

      <FindingBusinessProfessionals
        header={accountHeader}
        subHeader={subHeader}
        bestText={bestText}
      />
      <PopularCategories data={getFilterLevelTwoByKey("builders")} />
      <AllServicesComponent data={filteredAllServicesData} />
      <GetQuotes message={message} />
    </div>
  );
};

export default CloneSubTwoCategory;
