import React from "react";
import styles from "./About.module.css";
import EliteProImg from "../../../assets/Images/Setting/eliteProImg.svg";
import businessImg from "../../../assets/Images/Setting/businessImg.svg";
import staffImg from "../../../assets/Images/Setting/staffImg.svg";
import localistHireImg from "../../../assets/Images/Setting/localistHireImg.svg";
import responseTimeImg from "../../../assets/Images/Setting/responseTimeImg.svg";

const About = ({details}) => {
    console.log(details,"details")
    const data = [
        {
            title: "Elite Pro",
            icon: EliteProImg,
        },
        {
            title: `${details?.company_total_years} hires on Localists` || "12 hires on Localists",
            icon: businessImg
        },
        {
            title: `${details?.company_total_years} Years in business` || "4 Years in business",
            icon: staffImg
        },
        {
            title: "15 mins response time",
            icon: localistHireImg
        },
        {
            title: `${details?.company_size} Staff` || "Not specified",
            icon: responseTimeImg
        },
    ]

    return (
        <div className={styles.aboutContainer}>
            <h2>About</h2>
            <div className={styles.aboutContent}>
                {data.map((item, index) => (
                    <div key={index} className={styles.aboutItem}>
                        <span><img src={item?.icon} alt="img" /></span>
                        <h3>{item.title}</h3>
                    </div>
                ))}
            </div>

        </div>
    );
}
export default About;