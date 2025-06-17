// import React, { useState } from "react";
// import styles from "./AccreditationsAccordion.module.css";
// import ISSAImage from "../../../assets/Images/ISSAImage.svg";
// import iIcon from "../../../assets/Images/iIcon.svg";

// const AccreditationsAccordion = () => {
//   const [accreditations, setAccreditations] = useState([
//     "ARCSI (Association of Residential Cleaning Services International, a division of ISSA)",
//     "ARCSI (Association of Residential Cleaning Services International, a division of ISSA)",
//   ]);
//   const [newAccreditation, setNewAccreditation] = useState("");

//   const handleAdd = () => {
//     if (newAccreditation.trim() !== "") {
//       setAccreditations([...accreditations, newAccreditation.trim()]);
//       setNewAccreditation("");
//     }
//   };

//   const handleAccreditationAdd = () => {};

//   return (
//     <>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <h3 className={styles.title}>Accreditations</h3>
//           <div className={styles.optional}>
//             <img src={iIcon} alt="info" className={styles.icon} />
//             <span>Optional</span>
//             <label className={styles.switch}>
//               <input type="checkbox" defaultChecked />
//               <span className={styles.slider}></span>
//             </label>
//           </div>
//         </div>
//         <p className={styles.description}>
//           Increase your chances of getting hired and boost customer confidence
//           by adding your accreditations.
//         </p>

//         <div className={styles.card}>
//           <div className={styles.logoSectionWrapper}>
//             <div className={styles.logoSection}>
//               <img src={ISSAImage} alt="ISSA" className={styles.logo} />
//             </div>
//             <div className={styles.accreditationList}>
//               {accreditations.map((item, idx) => (
//                 <p key={idx} className={styles.accreditationItem}>
//                   {item}
//                 </p>
//               ))}
//             </div>
//           </div>
//           <div className={styles.inputGroup}>
//             <input
//               type="text"
//               value={newAccreditation}
//               onChange={(e) => setNewAccreditation(e.target.value)}
//               placeholder="ARCSI (Association of Residential Cleaning Services International, a division of ISSA)"
//               className={styles.input}
//             />
//             <button className={styles.addButton} onClick={handleAdd}>
//               Add
//             </button>
//           </div>
//         </div>

//         <div className={styles.AccreditationsAccordionBox}>
//           <button
//             className={styles.addAccreditationButton}
//             onClick={handleAccreditationAdd}
//           >
//             + Add Accreditation
//           </button>
//         </div>
//       </div>
//       <div className={styles.footer}>
//         <button className={styles.cancel}>Cancel</button>
//         <button className={styles.save}>Save</button>
//       </div>
//     </>
//   );
// };

// export default AccreditationsAccordion;


// import React, { useState } from "react";
// import styles from "./AccreditationsAccordion.module.css";
// import ISSAImage from "../../../assets/Images/ISSAImage.svg";
// import iIcon from "../../../assets/Images/iIcon.svg";
// import axiosInstance from "../../../Api/axiosInstance";

// const AccreditationsAccordion = () => {
//   const [accreditations, setAccreditations] = useState([
//     "ARCSI (Association of Residential Cleaning Services International, a division of ISSA)",
//     "ARCSI (Association of Residential Cleaning Services International, a division of ISSA)",
//   ]);
//   const [newAccreditation, setNewAccreditation] = useState("");

//   // Example link inputs – you can bind these to actual inputs if you wish to render them
//   const [fbLink, setFbLink] = useState("");
//   const [twitterLink, setTwitterLink] = useState("");
//   const [tiktokLink, setTiktokLink] = useState("");
//   const [instaLink, setInstaLink] = useState("");
//   const [linkedinLink, setLinkedinLink] = useState("");
//   const [extraLinks, setExtraLinks] = useState(""); // comma-separated string

//   const handleAdd = () => {
//     if (newAccreditation.trim() !== "") {
//       setAccreditations([...accreditations, newAccreditation.trim()]);
//       setNewAccreditation("");
//     }
//   };

//   const handleAccreditationAdd = () => {};

//   const handleSave = async () => {
//     try {
//       const body = new FormData();
//       body.append("type", "social_media");
//       if (fbLink) body.append("fb_link", fbLink);
//       if (twitterLink) body.append("twitter_link", twitterLink);
//       if (tiktokLink) body.append("tiktok_link", tiktokLink);
//       if (instaLink) body.append("insta_link", instaLink);
//       if (linkedinLink) body.append("linkedin_link", linkedinLink);
//       if (extraLinks) body.append("extra_links", extraLinks);

//       const response = await axiosInstance.post(
//         "https://localists.zuzucodes.com/admin/api/users/update-seller-profile",
//         body,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert("Social media links saved successfully!");
//     } catch (error) {
//       console.error("Save failed:", error);
//       alert("Failed to save social media links.");
//     }
//   };

//   return (
//     <>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <h3 className={styles.title}>Accreditations</h3>
//           <div className={styles.optional}>
//             <img src={iIcon} alt="info" className={styles.icon} />
//             <span>Optional</span>
//             <label className={styles.switch}>
//               <input type="checkbox" defaultChecked />
//               <span className={styles.slider}></span>
//             </label>
//           </div>
//         </div>
//         <p className={styles.description}>
//           Increase your chances of getting hired and boost customer confidence
//           by adding your accreditations.
//         </p>

//         <div className={styles.card}>
//           <div className={styles.logoSectionWrapper}>
//             <div className={styles.logoSection}>
//               <img src={ISSAImage} alt="ISSA" className={styles.logo} />
//             </div>
//             <div className={styles.accreditationList}>
//               {accreditations.map((item, idx) => (
//                 <p key={idx} className={styles.accreditationItem}>
//                   {item}
//                 </p>
//               ))}
//             </div>
//           </div>
//           <div className={styles.inputGroup}>
//             <input
//               type="text"
//               value={newAccreditation}
//               onChange={(e) => setNewAccreditation(e.target.value)}
//               placeholder="ARCSI (Association of Residential Cleaning Services International, a division of ISSA)"
//               className={styles.input}
//             />
//             <button className={styles.addButton} onClick={handleAdd}>
//               Add
//             </button>
//           </div>
//         </div>

//         <div className={styles.AccreditationsAccordionBox}>
//           <button
//             className={styles.addAccreditationButton}
//             onClick={handleAccreditationAdd}
//           >
//             + Add Accreditation
//           </button>
//         </div>
//       </div>
//       <div className={styles.footer}>
//         <button className={styles.cancel}>Cancel</button>
//         <button className={styles.save} onClick={handleSave}>
//           Save
//         </button>
//       </div>
//     </>
//   );
// };

// export default AccreditationsAccordion;



// import React, { useState } from "react";
// import styles from "./AccreditationsAccordion.module.css";
// import ISSAImage from "../../../assets/Images/ISSAImage.svg";
// import iIcon from "../../../assets/Images/iIcon.svg";
// import axiosInstance from "../../../Api/axiosInstance";

// const AccreditationsAccordion = () => {
//   const [accordionGroups, setAccordionGroups] = useState([
//     {
//       accreditations: [
//         "ARCSI (Association of Residential Cleaning Services International, a division of ISSA)",
//         "ARCSI (Association of Residential Cleaning Services International, a division of ISSA)",
//       ],
//       newAccreditation: "",
//     },
//   ]);

//   const [fbLink, setFbLink] = useState("");
//   const [twitterLink, setTwitterLink] = useState("");
//   const [tiktokLink, setTiktokLink] = useState("");
//   const [instaLink, setInstaLink] = useState("");
//   const [linkedinLink, setLinkedinLink] = useState("");
//   const [extraLinks, setExtraLinks] = useState("");

//   const handleAdd = (index) => {
//     const updated = [...accordionGroups];
//     const text = updated[index].newAccreditation.trim();
//     if (text !== "") {
//       updated[index].accreditations.push(text);
//       updated[index].newAccreditation = "";
//       setAccordionGroups(updated);
//     }
//   };

//   const handleInputChange = (index, value) => {
//     const updated = [...accordionGroups];
//     updated[index].newAccreditation = value;
//     setAccordionGroups(updated);
//   };

//   const handleAccreditationAdd = () => {
//     setAccordionGroups([
//       ...accordionGroups,
//       { accreditations: [], newAccreditation: "" },
//     ]);
//   };

//   const handleSave = async () => {
//     try {
//       const body = new FormData();
//       body.append("type", "social_media");
//       if (fbLink) body.append("fb_link", fbLink);
//       if (twitterLink) body.append("twitter_link", twitterLink);
//       if (tiktokLink) body.append("tiktok_link", tiktokLink);
//       if (instaLink) body.append("insta_link", instaLink);
//       if (linkedinLink) body.append("linkedin_link", linkedinLink);
//       if (extraLinks) body.append("extra_links", extraLinks);

//       const response = await axiosInstance.post(
//         "https://localists.zuzucodes.com/admin/api/users/update-seller-profile",
//         body,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert("Social media links saved successfully!");
//     } catch (error) {
//       console.error("Save failed:", error);
//       alert("Failed to save social media links.");
//     }
//   };

//   return (
//     <>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <h3 className={styles.title}>Accreditations</h3>
//           <div className={styles.optional}>
//             <img src={iIcon} alt="info" className={styles.icon} />
//             <span>Optional</span>
//             <label className={styles.switch}>
//               <input type="checkbox" defaultChecked />
//               <span className={styles.slider}></span>
//             </label>
//           </div>
//         </div>

//         <p className={styles.description}>
//           Increase your chances of getting hired and boost customer confidence
//           by adding your accreditations.
//         </p>

//         {accordionGroups.map((group, index) => (
//           <div key={index} className={styles.card}>
//             <div className={styles.logoSectionWrapper}>
//               <div className={styles.logoSection}>
//                 <img src={ISSAImage} alt="ISSA" className={styles.logo} />
//               </div>
//               <div className={styles.accreditationList}>
//                 {group.accreditations.map((item, idx) => (
//                   <p key={idx} className={styles.accreditationItem}>
//                     {item}
//                   </p>
//                 ))}
//               </div>
//             </div>
//             <div className={styles.inputGroup}>
//               <input
//                 type="text"
//                 value={group.newAccreditation}
//                 onChange={(e) =>
//                   handleInputChange(index, e.target.value)
//                 }
//                 placeholder="ARCSI (Association of Residential Cleaning Services International, a division of ISSA)"
//                 className={styles.input}
//               />
//               <button
//                 className={styles.addButton}
//                 onClick={() => handleAdd(index)}
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         ))}

//         <div className={styles.AccreditationsAccordionBox}>
//         <button
//             className={styles.addAccreditationButton}
//             onClick={handleAccreditationAdd}
//             style={{marginRight:'1rem'}}
//           >
//             Upload Photos
//           </button>
//           <button
//             className={styles.addAccreditationButton}
//             onClick={handleAccreditationAdd}
//           >
//             + Add Accreditation
//           </button>
//         </div>
//       </div>

//       <div className={styles.footer}>
//         <button className={styles.cancel}>Cancel</button>
//         <button className={styles.save} onClick={handleSave}>
//           Save
//         </button>
//       </div>
//     </>
//   );
// };

// export default AccreditationsAccordion;



import React, { useState, useRef } from "react";
import styles from "./AccreditationsAccordion.module.css";
import ISSAImage from "../../../assets/Images/ISSAImage.svg";
import iIcon from "../../../assets/Images/iIcon.svg";
import axiosInstance from "../../../Api/axiosInstance";

const AccreditationsAccordion = () => {
  const [accordionGroups, setAccordionGroups] = useState([
    {
      accreditations: [
        
      ],
      newAccreditation: "",
      accreImage: null,
    },
  ]);
  
  const fileInputRefs = useRef([]);
  
  const handleAdd = (index) => {
    const updated = [...accordionGroups];
    const text = updated[index].newAccreditation.trim();
    if (text !== "") {
      updated[index].accreditations.push(text);
      updated[index].newAccreditation = "";
      setAccordionGroups(updated);
    }
  };
  
  const handleInputChange = (index, value) => {
    const updated = [...accordionGroups];
    updated[index].newAccreditation = value;
    setAccordionGroups(updated);
  };
  
  const handleImageUpload = (index, file) => {
    const updated = [...accordionGroups];
    updated[index].accreImage = file;
    setAccordionGroups(updated);
  };
  
  const handleClickUpload = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };
  
  const handleAccreditationAdd = () => {
    setAccordionGroups([
      ...accordionGroups,
      { accreditations: [], newAccreditation: "", accreImage: null },
    ]);
  };
  
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("type", "Accreditations");
  
      accordionGroups.forEach((group) => {
        group.accreditations.forEach((name) =>
          formData.append("accre_name[]", name)
        );
        if (group.accreImage) {
          formData.append("accre_image[]", group.accreImage);
        }
      });
  
      await axiosInstance.post(
        "https://localists.zuzucodes.com/admin/api/users/update-seller-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      alert("Accreditations saved successfully!");
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save accreditations.");
    }
  };
  

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Accreditations</h3>
          <div className={styles.optional}>
            <img src={iIcon} alt="info" className={styles.icon} />
            <span>Optional</span>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <p className={styles.description}>
          Increase your chances of getting hired and boost customer confidence
          by adding your accreditations.
        </p>

        {accordionGroups.map((group, index) => (
  <div key={index} className={styles.card}>
    <div className={styles.logoSectionWrapper}>
      <div className={styles.logoSection}>
        <img src={ISSAImage} alt="ISSA" className={styles.logo} />
      </div>
      <div className={styles.accreditationList}>
        {group.accreditations.map((item, idx) => (
          <p key={idx} className={styles.accreditationItem}>
            {item}
          </p>
        ))}
      </div>
    </div>

    <div className={styles.inputGroup}>
      <input
        type="text"
        value={group.newAccreditation}
        onChange={(e) => handleInputChange(index, e.target.value)}
        placeholder="ARCSI (Association of Residential Cleaning Services International, a division of ISSA)"
        className={styles.input}
      />
      <button
        className={styles.addButton}
        onClick={() => handleAdd(index)}
      >
        Add
      </button>
    </div>

    <div className={styles.AccreditationsAccordionBox} style={{ display: 'flex', gap: '1rem', marginTop: '10px' }}>
      <button
        className={styles.addAccreditationButton}
        onClick={() => handleClickUpload(index)}
      >
        Upload Photo
      </button>

      {/* Only show Add Accreditation button on the last card */}
      {index === accordionGroups.length - 1 && (
        <button
          className={styles.addAccreditationButton}
          onClick={handleAccreditationAdd}
        >
          + Add Accreditation
        </button>
      )}

      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={(el) => (fileInputRefs.current[index] = el)}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) handleImageUpload(index, file);
        }}
      />
    </div>

    {group.accreImage && (
      <p style={{ marginTop: "5px", fontSize: "12px" }}>
        Selected: {group.accreImage.name}
      </p>
    )}
  </div>
))}


        
      </div>

      <div className={styles.footer}>
        <button className={styles.cancel}>Cancel</button>
        <button className={styles.save} onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
};

export default AccreditationsAccordion;
