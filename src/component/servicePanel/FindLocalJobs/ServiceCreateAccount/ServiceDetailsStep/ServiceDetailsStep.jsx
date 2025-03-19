import React, { useState } from "react";
import styles from "./ServiceDetailsStep.module.css";
import { registerUserData } from "../../../../../store/FindJobs/findJobSlice";

const ServiceDetailsStep = ({ nextStep, prevStep }) => {
  // const [website, setWebsite] = useState(null);
  // const [jobCount, setJobCount] = useState(null);
  // const [company_size, setCompanySize] = useState(null);
  // const [company_sales_team, setSalesTeam] = useState(null);
  // const [socialMedia, setSocialMedia] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    company_name: "",
    company_size: null,
    company_sales_team: null,
    company_website: null,
    websiteAddress: "",
    jobCount: null,
    socialMedia: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    dispatch(registerUserData(formData));
    nextStep();
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h2 className={styles.heading}>Some details about you</h2>
          <p className={styles.subheading}>
            You're just a few steps away from viewing our House Cleaning leads
          </p>
        </div>

        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>Your name</label>
              <input
                type="text"
                className={styles.input}
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>Company name</label>
              <input
                type="text"
                className={styles.input}
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
              />
              <label className={styles.helperText}>
                If you aren't a business or don’t have this information, you can
                leave this blank
              </label>
            </div>

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>Email address</label>
              <input
                type="email"
                className={styles.input}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>Phone number (Optional)</label>
              <input
                type="text"
                className={styles.input}
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <label className={styles.label}>
              Does your company have a website?
            </label>
            <div className={styles.toggleGroup}>
              <button
                type="button"
                className={
                  formData.company_website === "Yes"
                    ? styles.activeButton
                    : styles.toggleButton
                }
                onClick={() =>
                  setFormData((prev) => ({ ...prev, company_website: "Yes" }))
                }
              >
                Yes
              </button>
              <button
                type="button"
                className={
                  formData.company_website === "No"
                    ? styles.activeButton
                    : styles.toggleButton
                }
                onClick={() =>
                  setFormData((prev) => ({ ...prev, company_website: "No" }))
                }
              >
                No
              </button>
            </div>

            {formData.company_website === "Yes" && (
              <>
                <label className={styles.label}>
                  Website address (optional)
                </label>
                <input
                  type="text"
                  className={styles.input}
                  name="company_website"
                  value={formData.company_website}
                  onChange={handleInputChange}
                />
              </>
            )}

            <label className={styles.label}>
              Estimated number of new jobs per month
            </label>
            <div className={styles.optionGroup}>
              {["1-5", "6-10", "10-20", "20-30", "30+"].map((count) => (
                <button
                  key={count}
                  type="button"
                  className={
                    formData.jobCount === count
                      ? styles.activeOption
                      : styles.optionButton
                  }
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, jobCount: count }))
                  }
                >
                  {count}
                </button>
              ))}
            </div>

            <label className={styles.label}>Company size, employees</label>
            <div className={styles.optionGroup}>
              {[
                "Self-employed, Sole trader",
                "2-10",
                "11-50",
                "51-200",
                "200+",
              ].map((size) => (
                <button
                  key={size}
                  type="button"
                  className={
                    formData.company_size === size
                      ? styles.activeOption
                      : styles.optionButton
                  }
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, company_size: size }))
                  }
                >
                  {size}
                </button>
              ))}
            </div>

            <label className={styles.label}>
              Does your company have a sales team?
            </label>
            <div className={styles.toggleGroup}>
              <button
                type="button"
                className={
                  formData.company_sales_team === "Yes"
                    ? styles.activeButton
                    : styles.toggleButton
                }
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    company_sales_team: "Yes",
                  }))
                }
              >
                Yes
              </button>
              <button
                type="button"
                className={
                  formData.company_sales_team === "No"
                    ? styles.activeButton
                    : styles.toggleButton
                }
                onClick={() =>
                  setFormData((prev) => ({ ...prev, company_sales_team: "No" }))
                }
              >
                No
              </button>
            </div>

            <label className={styles.label}>
              Does your company use social media?
            </label>
            <div className={styles.toggleGroup}>
              <button
                type="button"
                className={
                  formData.socialMedia === "Yes"
                    ? styles.activeButton
                    : styles.toggleButton
                }
                onClick={() =>
                  setFormData((prev) => ({ ...prev, socialMedia: "Yes" }))
                }
              >
                Yes
              </button>
              <button
                type="button"
                className={
                  formData.socialMedia === "No"
                    ? styles.activeButton
                    : styles.toggleButton
                }
                onClick={() =>
                  setFormData((prev) => ({ ...prev, socialMedia: "No" }))
                }
              >
                No
              </button>
            </div>

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
                onClick={handleSubmit}
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

export default ServiceDetailsStep;
