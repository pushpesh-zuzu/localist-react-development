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
import { PopularCategoriesData } from "../constant/CloneCategory";
import { AllServicesData } from "../constant/CloneCategory";
//AllServicesData


const endpointCategoryMap = {
  // "financial-and-accounting": ["General Accounting"],
  "financial-and-accounting":["Accounting", "Bookkeeping Services"],
  "general-accounting": ["Accounting", "Bookkeeping Services"],

  business: ["Accounting", "Bookkeeping Services", "Business Consulting", "Social Media Marketing"],
};
const endpointServiceMap = {
  // "financial-and-accounting": ["general Accounting"],
  "financial-and-accounting":["Accounting", "Bookkeeping Services"],
  "general-accounting": ["Accounting", "Bookkeeping Services"],
  "business": ["Accounting", "Bookkeeping Services", "Business Consulting", "Social Media Marketing"],
};




const breadcrumbHierarchy = {
  business: ["Business"],
  "financial-and-accounting": ["Business", "Financial and Accounting"],
  "general-accounting": ["Business", "Financial and Accounting", "General Accounting"],
  accountants: ["Business", "Financial and Accounting", "General Accounting", "Accounting"],
  "bookkeeping-services": ["Business", "Financial and Accounting", "General Accounting", "Bookkeeping Services"]
};










const CloneCategory = ({ accountHeader, subHeader }) => {
  const location = useLocation();
  const fullPath = location.pathname;
  const endpoint = fullPath.split("/").filter(Boolean).pop(); // e.g., 'accountants'

  const breadcrumbItems = breadcrumbHierarchy[endpoint] || [];

  const message = `from ${subHeader} professionals today`;


///// logics for popular categories

const pathSegments = location.pathname.split("/").filter(Boolean); // ['en', 'gb', 'business']
const endpoint1 = pathSegments[pathSegments.length - 1]; // e.g., 'business'

const allowedTitles = endpointCategoryMap[endpoint1] || [];
const filteredCategories = PopularCategoriesData.filter(item =>
  allowedTitles.includes(item.title)
);

const allowedServices = endpointServiceMap[endpoint] || [];

const filteredAllServicesData = AllServicesData
  .map(categoryObj => {
    const [category, services] = Object.entries(categoryObj)[1]
      ? Object.entries(categoryObj)[1]
      : [null, []];
    
    const filteredServices = services.filter(service =>
      allowedServices.includes(service)
    );

    if (filteredServices.length > 0) {
      return { key: categoryObj.key, [category]: filteredServices };
    }
    return null;
  })
  .filter(Boolean);




  return (
    <div>
      <Accountants header={accountHeader} subHeader={subHeader} />

      {endpoint !== "business" && (
  <div className={styles.findAccountInfoContainer}>
    <p className={styles.breadcrumb}>
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        const slug = item.toLowerCase().replace(/ /g, "-");

        return isLast ? (
          <span key={index} className={styles.active}>{item}</span>
        ) : (
          <span key={index}>
          <Link to={`/en/gb/${slug}`} className={styles.link}>{item}</Link>{" "}
          <span style={{ color:'black' ,padding: "0 4px" }}>/</span>
        </span>
        );
      })}
    </p>
  </div>
)}


      <FindingBusinessProfessionals header={accountHeader} subHeader={subHeader} />
      <HowItWorks header={accountHeader} subHeader={subHeader} />
      <PopularCategories data={filteredCategories} />
      <AllServicesComponent data={filteredAllServicesData} />
      <GetQuotes message={message} />
    </div>
  );
};

export default CloneCategory;
