import PopularService from "../component/homescreen/popularServices/PopularService";
import SearchProfessionals from "../component/homescreen/searchUser/SearchUser";
import ServiceCategory from "../component/homescreen/serviceCategory/ServiceCategory";
import Services from "../component/homescreen/services/Services";
import OurTeams from "../component/homescreen/team/OurTeams";
import WorkStructure from "../component/homescreen/WorkOverview/WorkStructure";

const Homepage = () => {
  return (
    <div>
      <SearchProfessionals />
      <PopularService />
      <ServiceCategory />
      <Services />
      <WorkStructure />
      <OurTeams />
    </div>
  );
};

export default Homepage;
