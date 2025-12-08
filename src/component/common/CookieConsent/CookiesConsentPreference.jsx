
import { useState } from "react";
import styles from "./CookiesConsentPreference.module.css";

export default function CookiesConsentPreference({ onClose, onSave }) {
  const [essential, setEssential] = useState(true);
  const [nonEssential, setNonEssential] = useState(false);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* TITLE */}
        <h2 className={styles.title}>Manage Cookie Preferences</h2>

        {/* DESCRIPTION */}
        <p className={styles.desc}>
          Cookies are widely used in order to make websites work more effectively
          by storing and retrieving information from browsers. This information
          might be about the visitor, their preferences or their device and does
          not generally identify an individual person but includes a unique
          identifier for the visitor’s browser. Rejecting cookies may negatively
          affect the website experience.
        </p>

        {/* Essential Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Essential</span>
            <label className={`${styles.switch} ${styles.switch1}`}>
              <input
                type="checkbox"
                checked={essential}
                readOnly
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <p className={styles.sectionText}>
            Essential cookies are required for the website to operate, for example,
            to identify users as being logged into the website and to help in
            detecting bugs or other defects in the experience.
          </p>
        </div>

        {/* Non-essential Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Non-Essential</span>
                        <label className={`${styles.switch} ${styles.switch2}`}>

              <input
                type="checkbox"
                checked={nonEssential}
                onChange={() => setNonEssential(!nonEssential)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <p className={styles.sectionText}>
            Non-essential cookies include cookies used by Localists 
            and third parties, such as ad networks and advertising partners, to make
            advertising more relevant. Some of these cookies collect information
            about a visitor’s activity across different devices and third-party
            websites.
          </p>
        </div>

        {/* Buttons */}
        <div className={styles.btnRow}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>

          <button
            className={styles.saveBtn}
            onClick={() => onSave({ essential, nonEssential })}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
