import { Helmet } from "react-helmet-async";
import PopularService from "../component/homescreen/popularServices/PopularService";
import SearchProfessionals from "../component/homescreen/searchUser/SearchUser";
import ServiceCategory from "../component/homescreen/serviceCategory/ServiceCategory";
import Services from "../component/homescreen/services/Services";
import OurTeams from "../component/homescreen/team/OurTeams";
import WorkStructure from "../component/homescreen/WorkOverview/WorkStructure";
import { useParams } from "react-router";
import CalonicalTags from "../component/common/CalonicalTags/CalonicalTags";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllServiceList,
  getPopularServiceList,
} from "../store/FindJobs/findJobSlice";

const Homepage = () => {
  const { lang, country } = useParams();
  const dispatch = useDispatch();
  const { allServiceList, popularList, popularLoader } = useSelector(
    (state) => state.findJobs
  );

  const [initialLoader, setInitialLoader] = useState(true);
  const [popularInitialLoader, setPopularInitialLoader] = useState(true);

  useEffect(() => {
    if (!allServiceList || allServiceList.length === 0) {
      dispatch(getAllServiceList()).finally(() => setInitialLoader(false));
    } else {
      setInitialLoader(false);
    }
  }, [dispatch, allServiceList]);

  useEffect(() => {
    if (!popularList || popularList.length === 0) {
      dispatch(getPopularServiceList()).finally(() =>
        setPopularInitialLoader(false)
      );
    } else {
      setPopularInitialLoader(false);
    }
  }, [dispatch, popularList]);

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
      <CalonicalTags isRequiredjsonLd={false} />

      <SearchProfessionals
        popularList={popularList}
        popularLoader={popularLoader || popularInitialLoader}
      />
      <PopularService
        popularList={popularList}
        popularLoader={popularLoader || popularInitialLoader}
      />
      <ServiceCategory
        allServiceList={allServiceList}
        popularLoader={popularLoader}
        initialLoader={initialLoader}
      />
      <Services allServiceList={allServiceList} initialLoader={initialLoader} />
      <WorkStructure />
      <OurTeams />
    </>
  );
};

export default Homepage;
