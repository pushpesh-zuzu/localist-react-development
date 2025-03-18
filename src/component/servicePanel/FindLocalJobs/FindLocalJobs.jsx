import React, { useEffect, useState } from "react";
import styles from "./FindLocalJobs.module.css";
import { PopularServiceData } from "../../../constant/ServicePanel";
import { useDispatch, useSelector } from "react-redux";
import { getPopularServiceList, } from "../../../store/FindJobs/findJobSlice";
import { useNavigate } from "react-router-dom";
import { generateSlug } from "../../../utils";

const FindLocalJobs = () => {
    const [Input,setInput] = useState("")
    const dispatch = useDispatch()
    const {popularList,searchService} = useSelector((state) => state.findJobs)
    const navigate = useNavigate();
  const handleServiceClick = (service) => {
    const slug = generateSlug(service.banner_title);
    navigate(`/sellers/create-account/${slug}`);
  };
    useEffect(()=>{
dispatch(getPopularServiceList())
    },[])
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (Input.trim() !== "") {
                dispatch(searchService({ search: Input }));
                
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [Input, dispatch]);
  return (
    <div className={styles.container}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <h1>
          Find Local Jobs For <br />
          Your Business Now
        </h1>
        <p>
          1000’s of local and remote clients are already waiting for your
          services
        </p>
        <div className={styles.searchInputContainer}>
          <input
            className={styles.searchInput}
            placeholder="What service do you provide?"
            onChange={(e)=>setInput(e.target.value)}
            value={Input}
          />
          {

          }

          <button>Get started</button>
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <h3>Popular services</h3>
        <div className={styles.servicesList}>
          {popularList.map((service, index) => (
            <div key={service.id} className={styles.serviceItem}  onClick={() => handleServiceClick(service)}>
              <img src={service.banner_image} alt={service.title} />
              <span>{service.banner_title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindLocalJobs;
