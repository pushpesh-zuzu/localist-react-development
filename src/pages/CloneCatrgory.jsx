import Accountants from "../component/category/accountants/CloneAccountants";
import HowItWorks from "../component/category/howItWorks/CloneHowitWorks";
import PopularCategories from "../component/category/popularCategories/ClonePopularCategories";
import AllServicesComponent from "../component/category/allServices/CloneAllServices";
import FindingBusinessProfessionals from "../component/category/findingBusinessProfessionals/CloneFindingBusinessProfessionals";
import GetQuotes from "../component/common/getQuotes/GetQuotes";

const CloneCategory = () => {
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

export default CloneCategory;
