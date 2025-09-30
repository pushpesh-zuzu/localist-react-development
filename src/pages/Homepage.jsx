import { Helmet } from "react-helmet-async";
import PopularService from "../component/homescreen/popularServices/PopularService";
import SearchProfessionals from "../component/homescreen/searchUser/SearchUser";
import ServiceCategory from "../component/homescreen/serviceCategory/ServiceCategory";
import Services from "../component/homescreen/services/Services";
import OurTeams from "../component/homescreen/team/OurTeams";
import WorkStructure from "../component/homescreen/WorkOverview/WorkStructure";
import { useParams } from "react-router";
import CalonicalTags from "../component/common/CalonicalTags/CalonicalTags";

const Homepage = () => {
  const { lang, country } = useParams();
  return (
    <>
      <Helmet>
        {/* <!-- Canonical Tag → */}

        {/* <!-- Event snippet for Submit lead form conversion page --> */}
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
      <CalonicalTags />

      <SearchProfessionals />
      <PopularService />
      <ServiceCategory />
      <Services />
      <WorkStructure />
      <OurTeams />
    </>
  );
};

export default Homepage;
