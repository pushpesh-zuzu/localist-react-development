import React, { useState } from "react";
import styles from "./ServiceBusinessAddressStep.module.css";
import { useDispatch } from "react-redux";
import { registerUserData } from "../../../../../store/FindJobs/findJobSlice";

const ServiceBusinessAddressStep = ({ nextStep, prevStep,handleInputChange,formData,setFormData,errors}) => {
  // const [website, setWebsite] = useState(null);
  // const [jobCount, setJobCount] = useState(null);
  // const [companySize, setCompanySize] = useState(null);
  // const [salesTeam, setSalesTeam] = useState(null);
  // const [socialMedia, setSocialMedia] = useState(null);
  // const dispatch = useDispatch()

  // const handleSubmit = () => {
  //   dispatch(registerUserData(formData))
  // }
  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h2 className={styles.heading}>Your business address</h2>
          <p className={styles.subheading}>
            This will be used for tax & billing
          </p>
        </div>

        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>Street address</label>
              <input type="text" className={styles.input} name="address"
                  value={formData.address}
                  onChange={handleInputChange} />
                  
            </div>
                   {/* {errors.address && <p className={styles.errorText}>{errors.address}</p>} */}

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>Suite or apt. # (optional)</label>
              <input type="text" className={styles.input} name="suite"
                  value={formData.suite}
                  onChange={handleInputChange}/>
            </div>

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>City</label>
              <input type="text" className={styles.input} name="city"
                  value={formData.city}
                  onChange={handleInputChange}/>
            </div>
            {/* {errors.city && <p className={styles.errorText}>{errors.city}</p>} */}

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>State</label>
              <input type="text" className={styles.input} name="state"
                  value={formData.state}
                  onChange={handleInputChange}/>
            </div>
            {/* {errors.state && <p className={styles.errorText}>{errors.state}</p>} */}
            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>ZIP code</label>
              <div className={styles.toggleGroup}>
  <button
    type="button"
    className={formData?.is_zipcode === 1 ? styles.activeButton : styles.toggleButton}
    onClick={() => setFormData((prev) => ({ ...prev,  is_zipcode: 1, zipcode: "" }))}
  >
    Yes
  </button>
  <button
    type="button"
    className={formData?.is_zipcode === 0 ? styles.activeButton : styles.toggleButton}
    onClick={() => setFormData((prev) => ({ ...prev, is_zipcode: 0, zipcode: "" }))}
  >
    No
  </button>
</div>
</div>

{formData?.is_zipcode !== 0 && (
  <div className={styles.labelInputWrapper}>
    <input
      type="text"
      placeholder="Zip Code"
      className={styles.input}
      name="zipcode"
      value={formData.zipcode || ""}
      onChange={(e) => setFormData((prev) => ({ ...prev, zipcode: e.target.value }))}
    />
  </div>
)}


            <div className={styles.buttonContainer}>
              <button
                type="button"
                className={styles.backButton}
                onClick={prevStep}
              >
                Back
              </button>
              <button
                type="button"
                className={styles.nextButton}
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceBusinessAddressStep;
