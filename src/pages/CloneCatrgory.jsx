import { Helmet } from "react-helmet-async";
import HowItWorks from "../component/category/howItWorks/CloneHowitWorks";
import PopularCategories from "../component/category/popularCategories/ClonePopularCategories";
import GetQuotes from "../component/common/getQuotes/GetQuotes";
import { useLocation } from "react-router-dom";
import {
  HowItWorksData,
  PopularCategoriesData,
} from "../constant/CloneCategory";
import BannerWithBreadCrum from "../component/category/ServicesHeroSection/BannerWithBreadCrum";
import Home from "../assets/banners/Home.jpg";
import AllServiceLevel1 from "../component/category/allServices/AllServiceLevel1";
import CalonicalTags from "../component/common/CalonicalTags/CalonicalTags";

const endpointCategoryMap = {
  "financial-and-accounting": ["Accounting", "Bookkeeping Services"],
  business: [
    "Accounting",
    "Bookkeeping Services",
    "Business Consulting",
    "Social Media Marketing",
  ],
  home: [
    "General Builders",
    "Landscaping",
    "Fence & Gate Installation",
    "Driveway Installation",
    "Patio Services",
    "Artificial Grass Installation",
  ],
};

const CloneCategory = ({ accountHeader }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const endpoint1 = pathSegments[pathSegments.length - 1];

  const allowedTitles = endpointCategoryMap[endpoint1] || [];
  const filteredCategories = PopularCategoriesData.filter((item) =>
    allowedTitles.includes(item.title)
  );

  const howItWorksData = HowItWorksData[endpoint1];
  return (
    <>
      <Helmet>
        <script>
          {`
              gtag('event', 'conversion', {
                'send_to': 'AW-17528251553/iVB9CJjZsZMbEKHJj6ZB',
                'value': 1.0,
                'currency': 'GBP'
              });
          `}
        </script>
      </Helmet>
      <CalonicalTags bannerImage={Home} />
      <div>
        <BannerWithBreadCrum
          header={accountHeader}
          LevelOneTwoTitle={"Home & Garden"}
          accountHeader="Home & Garden"
          level={2}
          isNeedS={false}
          doYouNeetTitle={[
            "Do you need trusted",
            "home & garden",
            "professionals",
          ]}
          panelImage={Home}
          title="Home & Garden"
          findAccountTitle2="professionals"
          para1="At Localists, we connect you with the right Home & Garden Professionals for your needs."
          para2="Not sure how to find the right Home & Garden Professionals? Simply tell us what you need help with and where you need it, and we’ll recommend the best Home & Garden Professionals near you. See what they offer, check out their reviews, and get free quotations for the work you require."
          para3={`It's super fast and easy!`}
          heading2={"Professionals"}
          placeholderText="Driveway Installation, Gardening Services, etc..."
        />

        <HowItWorks
          howItWorksData={howItWorksData}
          ctaText={"Home & Garden Professionals"}
        />
        <PopularCategories data={filteredCategories} />
        <AllServiceLevel1
          data={[
            {
              name: "Fence & Gate Installation",
              path: "/fencing-contractors-near-me",
            },
            {
              name: "Driveway Installation",
              path: "/driveway-installers-near-me",
            },
            { name: "Patio Services", path: "/patio-layers-near-me" },
            { name: "Landscaping", path: "/landscape-gardeners-near-me" },
            {
              name: "Artificial Grass Installation",
              path: "/artificial-grass-installers-near-me",
            },
          ]}
        />
        <GetQuotes ctaText={"Home & Garden"} needSString={false} />
      </div>
    </>
  );
};

export default CloneCategory;
