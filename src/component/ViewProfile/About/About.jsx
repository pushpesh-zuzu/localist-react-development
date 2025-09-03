import React from "react";
import styles from "./About.module.css";
import EliteProImg from "../../../assets/Images/Setting/eliteProImg.svg";
import businessImg from "../../../assets/Images/Setting/businessImg.svg";
import staffImg from "../../../assets/Images/Setting/staffImg.svg";
import localistHireImg from "../../../assets/Images/Setting/localistHireImg.svg";
import responseTimeImg from "../../../assets/Images/Setting/responseTimeImg.svg";

const About = ({ details }) => {
  const data = [
    // {
    //     title: "Elite Pro",
    //     icon: EliteProImg,
    // },
    {
      title: `${
        details?.hire_count ? details?.hire_count : "0"
      } hires on Localists`,
      icon: businessImg,
    },
    {
      title:
        `${
          details?.company_total_years ? details?.company_total_years : "0"
        } Years in business` || "4 Years in business",
      icon: staffImg,
    },
    {
      title: `${
        details?.response_time ? details?.response_time : "0 mins"
      } response time`,
      icon: localistHireImg,
    },
    {
      title: `${details?.company_size ?? "No"} Staff` || "Not specified",
      icon: responseTimeImg,
    },
  ];

  console.log(details, "details");

  return (
    <div className={styles.aboutContainer}>
      <h2>About</h2>
      <div className={styles.aboutContent}>
        {data.map((item, index) => (
          <div key={index} className={styles.aboutItem}>
            <span>
              <img src={item?.icon} alt="img" />
            </span>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
export default About;
