import React, { useState } from "react";
import styles from "./AccreditationsAccordion.module.css";
import ISSAImage from "../../../assets/Images/ISSAImage.svg";
import iIcon from "../../../assets/Images/iIcon.svg";

const AccreditationsAccordion = () => {
  const [accreditations, setAccreditations] = useState([
    "ARCSI (Association of Residential Cleaning Services International, a division of ISSA)",
    "ARCSI (Association of Residential Cleaning Services International, a division of ISSA)",
  ]);
  const [newAccreditation, setNewAccreditation] = useState("");

  const handleAdd = () => {
    if (newAccreditation.trim() !== "") {
      setAccreditations([...accreditations, newAccreditation.trim()]);
      setNewAccreditation("");
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

        <div className={styles.card}>
          <div className={styles.logoSection}>
            <img src={ISSAImage} alt="ISSA" className={styles.logo} />
          </div>
          <div className={styles.accreditationList}>
            {accreditations.map((item, idx) => (
              <p key={idx} className={styles.accreditationItem}>
                {item}
              </p>
            ))}
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={newAccreditation}
                onChange={(e) => setNewAccreditation(e.target.value)}
                placeholder="ARCSI (Association of Residential Cleaning Services International, a division of ISSA)"
                className={styles.input}
              />
              <button className={styles.addButton} onClick={handleAdd}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.cancel}>Cancel</button>
        <button className={styles.save}>Save</button>
      </div>
    </>
  );
};

export default AccreditationsAccordion;
