import React from "react";
import styles from "./SocialMediaAccordion.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";

const platforms = [
  { label: "Facebook", placeholder: "www.facebook.com" },
  { label: "Twitter", placeholder: "@username" },
  { label: "Tik Tok", placeholder: "@username" },
  { label: "Instagram", placeholder: "@username" },
  { label: "Linkedin please", placeholder: "@username" },
];

const SocialMediaAccordion = () => {
  return (
    <div className={styles.container}>
      {/* Social Media Section */}
      <div className={styles.card}>
        <h3 className={styles.heading}>Social media</h3>
        <p className={styles.subtext}>
          Add your company social media accounts to lend credibility to your
          business – it is often something customers will look for to validate
          their hiring decisions.
        </p>

        {platforms.map((platform, idx) => (
          <div className={styles.inputRow} key={idx}>
            <div className={styles.labelWrapper}>
              <label className={styles.label}>{platform.label}</label>
              <div className={styles.optionalToggle}>
                <img src={iIcon} alt="info" className={styles.icon} />
                <span className={styles.optionalText}>Optional</span>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
            <div className={styles.inputWithToggle}>
              <input
                className={styles.input}
                type="text"
                placeholder={platform.placeholder}
              />
              {/* <div className={styles.optionalToggle}>
                <img src={iIcon} alt="info" className={styles.icon} />
                <span className={styles.optionalText}>Optional</span>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {/* Links Section */}
      <div className={styles.card}>
        <h3 className={styles.heading}>Links</h3>
        <div className={styles.labelWrapper}>
          <p className={styles.subtext}>
            Link to your own website, articles about your business, or any other
            content that will help promote your business.
          </p>
          <div className={styles.optionalToggle}>
            <img src={iIcon} alt="info" className={styles.icon} />
            <span className={styles.optionalText}>Optional</span>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
        <div className={styles.inputWithToggle}>
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="Enter one link per line"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaAccordion;
