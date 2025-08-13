import { Helmet } from "react-helmet-async";
import PopularService from "../component/homescreen/popularServices/PopularService";
import SearchProfessionals from "../component/homescreen/searchUser/SearchUser";
import ServiceCategory from "../component/homescreen/serviceCategory/ServiceCategory";
import Services from "../component/homescreen/services/Services";
import OurTeams from "../component/homescreen/team/OurTeams";
import WorkStructure from "../component/homescreen/WorkOverview/WorkStructure";

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>
          Localists.com: Find Trusted Local Services and Professionals
        </title>
        <meta
          name="description"
          content="Connect with verified local experts through Localists.com. Find trusted professionals, compare quotes, and hire the best for your project—quick, easy, and free."
        />
      </Helmet>

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
