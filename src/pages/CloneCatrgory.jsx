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

const CloneCategory = ({accountHeader,subHeader}) => {
//  console.log(accountHeader)
// console.log(subHeader)
const message=`from ${subHeader} professionals today`
  return (
    <div>
      <Accountants header={accountHeader} subHeader={subHeader}/>
      <FindingBusinessProfessionals header={accountHeader} subHeader={subHeader}/>
      <HowItWorks header={accountHeader} subHeader={subHeader}/>
      <PopularCategories />
      <AllServicesComponent />
      <GetQuotes message={message} />
    </div>
  );
};

export default CloneCategory;
