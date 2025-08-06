import { lazy, Suspense } from "react";

import SearchProfessionals from "../component/homescreen/searchUser/SearchUser";

const PopularService = lazy(() =>
  import("../component/homescreen/popularServices/PopularService")
);
const ServiceCategory = lazy(() =>
  import("../component/homescreen/serviceCategory/ServiceCategory")
);
const Services = lazy(() =>
  import("../component/homescreen/services/Services")
);
const WorkStructure = lazy(() =>
  import("../component/homescreen/WorkOverview/WorkStructure")
);
const OurTeams = lazy(() => import("../component/homescreen/team/OurTeams"));

const Homepage = () => {
  return (
    <div>
      <SearchProfessionals />

      <Suspense fallback={null}>
        <PopularService />
      </Suspense>

      <Suspense fallback={null}>
        <ServiceCategory />
      </Suspense>

      <Suspense fallback={null}>
        <Services />
      </Suspense>
      <Suspense fallback={null}>
        <WorkStructure />
      </Suspense>
      <Suspense fallback={null}>
        <OurTeams />
      </Suspense>
    </div>
  );
};

export default Homepage;
