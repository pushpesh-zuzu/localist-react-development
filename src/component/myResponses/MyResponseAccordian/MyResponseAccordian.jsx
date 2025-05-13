import React from "react";
import styles from "./MyResponseAccordian.module.css";
import UserImage from "../../../assets/Icons/MyResponse/UserImage.svg";
import CallImage from "../../../assets/Icons/MyResponse/CallImage.svg";
import EmailImage from "../../../assets/Icons/MyResponse/EmailImage.svg";
import PurchasedImage from "../../../assets/Icons/MyResponse/PurchasedImage.svg";
import AddImage from "../../../assets/Icons/MyResponse/AddImage.svg";

const TimelineItem = ({ icon, title, description, time, children, isLast }) => (
  <div className={styles.timelineItem}>
    <div className={styles.iconWrapper}>
      <img className={styles.icon} src={icon} alt={title} />
      {!isLast && <div className={styles.verticalLine}></div>}
    </div>
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>Isabella</span>
        <span className={styles.time}>{time}</span>
      </div>
      <div className={styles.title}>{title}</div>
      {description && <p className={styles.desc}>{description}</p>}
      {children}
    </div>
  </div>
);

const MyResponseAccordion = ({ lead, onBack }) => {
  const activity = [
    {
      icon: UserImage,
      title: "Viewed your profile",
      time: "19:10",
    },
    {
      icon: CallImage,
      title: "Requested a callback",
      description: "Please call me ASAP on 0000000000",
      time: "19:10",
    },
    {
      icon: EmailImage,
      title: "Sent you an email",
      time: "19:10",
      children: (
        <>
          <p className={styles.desc}>
            Hi, I'm Chander and looking for a job. I'm very hardworking and
            honest with my work.
            <br />
            Regards,
          </p>
          <a href="#" className={styles.link}>
            See More
          </a>
        </>
      ),
    },
    {
      icon: PurchasedImage,
      title: "Purchased the lead",
      time: "19:10",
    },
    {
      icon: AddImage,
      title: "Looking for a Home Care Specialist",
      time: "12:10",
      children: (
        <a href="#" className={styles.link}>
          View details
        </a>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.date}>Mon 25, April</div>
      {activity.map((item, index) => (
        <TimelineItem
          key={index}
          icon={item.icon}
          title={item.title}
          description={item.description}
          time={item.time}
          isLast={index === activity.length - 1}
        >
          {item.children}
        </TimelineItem>
      ))}
    </div>
  );
};

export default MyResponseAccordion;
