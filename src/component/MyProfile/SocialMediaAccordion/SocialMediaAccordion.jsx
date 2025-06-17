// import React from "react";
// import styles from "./SocialMediaAccordion.module.css";
// import iIcon from "../../../assets/Images/iIcon.svg";

// const platforms = [
//   { label: "Facebook", placeholder: "www.facebook.com" },
//   { label: "Twitter", placeholder: "@username" },
//   { label: "Tik Tok", placeholder: "@username" },
//   { label: "Instagram", placeholder: "@username" },
//   { label: "Linkedin", placeholder: "@username" },
// ];

// const SocialMediaAccordion = () => {
//   return (
//     <div className={styles.container}>
//       {/* Social Media Section */}
//       <div className={styles.card}>
//         <h3 className={styles.heading}>Social media</h3>
//         <p className={styles.subtext}>
//           Add your company social media accounts to lend credibility to your
//           business – it is often something customers will look for to validate
//           their hiring decisions.
//         </p>

//         {platforms.map((platform, idx) => (
//           <div className={styles.inputRow} key={idx}>
//             <div className={styles.labelWrapper}>
//               <label className={styles.label}>{platform.label}</label>
//               <div className={styles.optionalToggle}>
//                 <img src={iIcon} alt="info" className={styles.icon} />
//                 <span className={styles.optionalText}>Optional</span>
//                 <label className={styles.switch}>
//                   <input type="checkbox" defaultChecked />
//                   <span className={styles.slider}></span>
//                 </label>
//               </div>
//             </div>
//             <div className={styles.inputWithToggle}>
//               <input
//                 className={styles.input}
//                 type="text"
//                 placeholder={platform.placeholder}
//               />
//               {/* <div className={styles.optionalToggle}>
//                 <img src={iIcon} alt="info" className={styles.icon} />
//                 <span className={styles.optionalText}>Optional</span>
//                 <label className={styles.switch}>
//                   <input type="checkbox" defaultChecked />
//                   <span className={styles.slider}></span>
//                 </label>
//               </div> */}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Links Section */}
//       <div className={styles.card}>
//           <div className={styles.header}>
//         <h3 className={styles.heading}>Links</h3>
//         <div className={styles.optionalToggle}>
//             <img src={iIcon} alt="info" className={styles.icon} />
//             <span className={styles.optionalText}>Optional</span>
//             <label className={styles.switch}>
//               <input type="checkbox" defaultChecked />
//               <span className={styles.slider}></span>
//             </label>
//           </div>
//           </div>
//         <div className={styles.labelWrapper}>
//           <p className={styles.subtext}>
//             Link to your own website, articles about your business, or any other
//             content that will help promote your business.
//           </p>
         
//         </div>
//         <div className={styles.inputWithToggle}>
//           <textarea
//             className={styles.textarea}
//             rows={3}
//             placeholder="Enter one link per line"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SocialMediaAccordion; 




import React, { useState } from "react";
import styles from "./SocialMediaAccordion.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";
import axiosInstance from "../../../Api/axiosInstance";

const apiUrl = `https://localists.zuzucodes.com/admin/api/users/update-seller-profile`;

const platforms = [
  { key: "fb_link", label: "Facebook", placeholder: "www.facebook.com" },
  { key: "twitter_link", label: "Twitter", placeholder: "@username" },
  { key: "tiktok_link", label: "Tik Tok", placeholder: "@username" },
  { key: "insta_link", label: "Instagram", placeholder: "@username" },
  { key: "linkedin_link", label: "Linkedin", placeholder: "@username" },
];

const SocialMediaAccordion = () => {
  const [formState, setFormState] = useState({
    type: "social_media",
    fb_link: "",
    twitter_link: "",
    tiktok_link: "",
    insta_link: "",
    linkedin_link: "",
    extra_links: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const body = new FormData();
    body.append("type", "social_media");

    const fields = [
      "fb_link",
      "twitter_link",
      "tiktok_link",
      "insta_link",
      "linkedin_link",
      "extra_links",
    ];

    fields.forEach((field) => {
      body.append(field, formState[field] || "");
    });

    // Log what’s being sent (optional)
    for (let [k, v] of body.entries()) {
      console.log(k, v);
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axiosInstance.post(apiUrl, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Social media links updated successfully!");
      console.log(response.data);
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to update social media.");
    }
  };

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
                name={platform.key}
                value={formState[platform.key]}
                placeholder={platform.placeholder}
                onChange={handleChange}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Links Section */}
      <div className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.heading}>Links</h3>
          <div className={styles.optionalToggle}>
            <img src={iIcon} alt="info" className={styles.icon} />
            <span className={styles.optionalText}>Optional</span>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
        <div className={styles.labelWrapper}>
          <p className={styles.subtext}>
            Link to your own website, articles about your business, or any other
            content that will help promote your business.
          </p>
        </div>
        <div className={styles.inputWithToggle}>
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="Enter one link per line"
            name="extra_links"
            value={formState.extra_links}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className={styles.footer}>
        <button className={styles.saveButton} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default SocialMediaAccordion;

