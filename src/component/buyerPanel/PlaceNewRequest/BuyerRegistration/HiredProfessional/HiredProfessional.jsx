import React, { useEffect, useState } from "react";
import styles from "./HiredProfessional.module.css";

const HiredProfessional = ({ closeModal }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    // Static options for now
    const staticOptions = [
      { id: "1", name: "Electrician" },
      { id: "2", name: "Plumber" },
      { id: "3", name: "Carpenter" },
      { id: "4", name: "Web Developer" },
    ];
    setOptions(staticOptions);
  }, []);

  const handleSubmit = () => {
    console.log("Selected Option:", selected);
    // Add your submit logic here
    closeModal();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.title}>Select Hired Professional</h3>
        <div className={styles.options}>
          {options.map((option) => (
            <label key={option.id} className={styles.radioLabel}>
              <input
                type="radio"
                name="hired"
                value={option.id}
                checked={selected === option.id}
                onChange={() => setSelected(option.id)}
              />
              {option.name}
            </label>
          ))}
        </div>
        <div className={styles.buttonRow}>
          <button onClick={closeModal} className={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={handleSubmit} className={styles.submitBtn}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default HiredProfessional;
