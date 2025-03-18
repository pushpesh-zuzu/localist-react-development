import Accountants from "../component/category/accountants/Accountants";
import HowItWorks from "../component/category/howItWorks/HowItWorks";
import PopularCategories from "../component/category/popularCategories/PopularCategories";
import AllServicesComponent from "../component/category/allServices/AllServices";
import FindingBusinessProfessionals from "../component/category/findingBusinessProfessionals/FindingBusinessProfessionals";
import GetQuotes from "../component/common/getQuotes/GetQuotes";

const Category = () => {
  return (
    <div>
      <Accountants />
      <FindingBusinessProfessionals />
      <HowItWorks />
      <PopularCategories />
      <AllServicesComponent />
      <GetQuotes message="from Business professional today" />
    </div>
  );
};

export default Category;
