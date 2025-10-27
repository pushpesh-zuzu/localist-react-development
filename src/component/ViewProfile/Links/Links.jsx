import React from "react";
import styles from "./Links.module.css";
import LinkIcon from "../../../assets/Icons/LinkIcon.svg";

const Links = ({ details }) => {
  const data = details?.user_details;
  console.log(data, "datadata");

  const cleanLink = (link) => {
    return link.replace(/(^\w+:|^)\/\//, "");
  };

  const renderLink = (linksData, color) => {
    if (!linksData) return null;
    const links = linksData.split(",").map((link) => link.trim());

    return links.map((link, index) => (
      <li key={index} className={styles.linkItem}>
        <img src={LinkIcon} alt="link icon" className={styles.icon} />
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          {cleanLink(link)}
        </a>
      </li>
    ));
  };

  return (
    <div className={styles.Links_Container}>
      <h2>Links</h2>
      <ul className={styles.linkList}>
        {data?.linkedin_link && renderLink(data.linkedin_link, "#000000")}
        {data?.tiktok_link && renderLink(data.tiktok_link, "#000000")}
        {data?.insta_link && renderLink(data.insta_link, "#000000")}
        {data?.fb_link && renderLink(data.fb_link, "#000000")}
        {data?.twitter_link && renderLink(data.twitter_link, "#000000")}
        {data?.extra_links && renderLink(data.extra_links, "#000000")}
      </ul>
    </div>
  );
};

export default Links;
