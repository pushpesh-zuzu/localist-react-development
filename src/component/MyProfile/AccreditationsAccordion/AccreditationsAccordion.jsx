import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  updateSellerAccreditations,
  clearAccreditationsStatus,
} from "../../../store/MyProfile/myProfileSlice";

import React, { useState, useRef } from "react";
import styles from "./AccreditationsAccordion.module.css";
import ISSAImage from "../../../assets/Images/Setting/newAccoredationImg.svg";
import iIcon from "../../../assets/Images/iIcon.svg";
import axiosInstance from "../../../Api/axiosInstance";
import { BASE_IMAGE, BASE_IMAGE_URL, BASE_URL_IMAGE } from "../../../utils";

const AccreditationsAccordion = ({ details }) => {
  const [accordionGroups, setAccordionGroups] = useState([
    {
      accreditations: [],
      newAccreditation: "",
      accreImage: null,
    },
  ]);

  const fileInputRefs = useRef([]);
  const dispatch = useDispatch();
  const {
    accreditationsUpdateSuccess,
    accreditationsUpdateError,
    sellerLoader,
  } = useSelector((state) => state.myProfile);
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

  const handleSave = () => {
    console.log(accordionGroups);
    dispatch(updateSellerAccreditations(accordionGroups));
  };

  const handleRemoveAccreditation = (index) => {
    const updated = [...accordionGroups];
    updated.splice(index, 1);
    setAccordionGroups(updated);
  };


  // Show toast based on update result
  useEffect(() => {
    if (accreditationsUpdateSuccess) {
      toast.success("Accreditations saved successfully!");
      dispatch(clearAccreditationsStatus());
    } else if (accreditationsUpdateError) {
      toast.error(`Error: ${accreditationsUpdateError}`);
      dispatch(clearAccreditationsStatus());
    }
  }, [accreditationsUpdateSuccess, accreditationsUpdateError, dispatch]);

  useEffect(() => {
    if (details && Array.isArray(details)) {
      const mapped = details.map((item) => ({
        accreditations: item.name ? [item.name] : [],
        newAccreditation: "",
        accreImage: item.image
          ? { previewUrl: `${BASE_IMAGE}/accreditations/${item.image}` }
          : null,
      }));
      setAccordionGroups(mapped);
    }
  }, [details]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          {/* <h3 className={styles.title}>Showcase Your Accreditations</h3> */}
          
          <div className={styles.optional} style={{marginLeft:'auto'}}>
            <img src={iIcon} alt="info" className={styles.icon} />
            <span>Optional</span>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        {/* <p className={styles.description}>
          Adding your accreditations helps customers on Localists.com feel more
          confident hiring you and can increase your chances of winning more
          work.
        </p> */}

        {accordionGroups?.length === 0 && (
          <button
            className={styles.addAccreditationButtons}
            onClick={handleAccreditationAdd}
          >
            + Add Accreditation
          </button>
        )}

        {accordionGroups.map((group, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.logoSectionWrapper}>

              {/* <div className={styles.logoSection}>
                {group.accreImage ? (
                  <img
                    src={URL.createObjectURL(group.accreImage)}
                    alt="Uploaded"
                    className={styles.logo}
                  />
                ) : (
                  <img src={ISSAImage} alt="ISSA" className={styles.logo} />
                )}</div> */}
              <div className={styles.logoSection}>
                {group.accreImage ? (
                  <img
                    src={
                      group.accreImage.previewUrl
                        ? group.accreImage.previewUrl
                        : URL.createObjectURL(group.accreImage)
                    }
                    alt="Uploaded"
                    className={styles.logo}
                  />
                ) : (
                  // <img src={ISSAImage} alt="ISSA" className={styles.logo} />
                  ''
                )}

                {/* Show name if it exists */}
              </div>
              <div className={styles.accreditationList}>
                {/* {group.accreditations.map((item, idx) => (
                  <p key={idx} className={styles.accreditationItem}>
                    {item}
                  </p>
                ))} */}
                {group.accreditations.length > 0 && (
                  <span className={styles.accreditationItem}>
                    {group.accreditations[0]}
                  </span>
                )}
              </div>
              <button
                  className={styles.closeButton}
                  onClick={() => handleRemoveAccreditation(index)}
                >
                  Close
              </button>
            </div>
            {group.accreditations.length === 0 && (
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  value={group.newAccreditation}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  // placeholder="ARCSI (Association of Residential Cleaning Services International, a division of ISSA)"
                  placeholder="Accredition Name"
                  className={styles.input}
                />
              </div>
            )}

            {/* <div className={styles.inputGroup}>
              <input
                type="text"
                value={group.newAccreditation}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder="ARCSI (Association of Residential Cleaning Services International, a division of ISSA)"
                className={styles.input}
              />
            
            </div> */}
            {/* <button
        className={styles.addButton}
        onClick={() => handleAdd(index)}
      >
        Add
      </button> */}

            <div
              className={styles.AccreditationsAccordionBox}
              style={{ display: "flex", gap: "1rem", marginTop: "10px" }}
            >
              <button
                className={styles.addAccreditationButton}
                onClick={() => handleClickUpload(index)}
              >
                {group.accreImage ? "Change Photo " : "Upload Photo"}
              </button>
              {console.log(accordionGroups, index, "accordionGroups")}
              {/* Only show Add Accreditation button on the last card */}
              {index === accordionGroups.length - 1 && (
                <button
                  className={styles.addAccreditationButtons}
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

            {/* {group.accreImage && (
      <p style={{ marginTop: "5px", fontSize: "12px" }}>
        Selected: {group.accreImage.name}
      </p>
    )} */}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        {/* <button className={styles.cancel}>Cancel</button> */}
        <button className={styles.save} onClick={handleSave}  style={{ marginLeft: "auto" }}>
          Save
        </button>
      </div>
    </>
  );
};

export default AccreditationsAccordion;
