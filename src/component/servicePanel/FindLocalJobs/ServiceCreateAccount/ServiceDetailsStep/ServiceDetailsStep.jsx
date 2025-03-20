import React, { useState } from "react";
import styles from "./ServiceDetailsStep.module.css";
import { registerUserData } from "../../../../../store/FindJobs/findJobSlice";

const ServiceDetailsStep = ({
  nextStep,
  prevStep,
  handleInputChange,
  formData,
  setFormData,
  errors,
}) => {
  // const handleSubmit = () => {
  //   dispatch(registerUserData(formData));
  //   nextStep();
  // };

  return (
    <>
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
                  className={`${styles.input} ${
                    errors.name ? styles.errorBorder : ""
                  }`}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              {errors.name && <p className={styles.errorText}>{errors.name}</p>}
              <div className={styles.labelInputWrapper}>
                <label className={styles.label}>Company name</label>
                <input
                  type="text"
                  className={`${styles.input} ${
                    errors.company_name ? styles.errorBorder : ""
                  }`}
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                />
                <label className={styles.helperText}>
                  If you aren't a business or don’t have this information, you
                  can leave this blank
                </label>
              </div>
              {errors.company_name && (
                <p className={styles.errorText}>{errors.company_name}</p>
              )}
              <div className={styles.labelInputWrapper}>
                <label className={styles.label}>Email address</label>
                <input
                  type="email"
                  className={`${styles.input} ${
                    errors.email ? styles.errorBorder : ""
                  }`}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              {errors.email && (
                <p className={styles.errorText}>{errors.email}</p>
              )}
              <div className={styles.labelInputWrapper}>
                <label className={styles.label}>Password</label>
                <input
                  type="password"
                  className={`${styles.input} ${
                    errors.password ? styles.errorBorder : ""
                  }`}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              {errors.password && (
                <p className={styles.errorText}>{errors.password}</p>
              )}

              <div className={styles.labelInputWrapper}>
                <label className={styles.label}>Phone number (Optional)</label>
                <input
                  type="number"
                  className={styles.input}
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              {/* {errors.name && <p className={styles.errorText}>{errors.name}</p>} */}
              <div className={styles.labelInputWrapper}>
                <label className={styles.label}>
                  Does your company have a website?
                </label>
                {/* <div className={styles.toggleGroup}>
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
</div>
              {formData.company_website === "Yes" && (
                <>
                  <input
                    type="text"
                    className={styles.input}
                    name="company_website"
                    placeholder="Website address (optional)"
                    // value={formData.company_website}
                    onChange={handleInputChange}
                  />
                </>
              )} */}

                <div className={styles.toggleGroup}>
                  <button
                    type="button"
                    className={
                      formData.company_website === "Yes"
                        ? styles.activeButton
                        : styles.toggleButton
                    }
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        company_website: "Yes",
                      }))
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
                      setFormData({ ...formData, company_website: "No" })
                    }
                  >
                    No
                  </button>
                </div>
              </div>
              {formData.company_website !== "No" && (
                <input
                  type="text"
                  className={styles.input}
                  name="company_website"
                  placeholder="Website address (optional)"
                  value={
                    formData.company_website !== "Yes"
                      ? formData.company_website
                      : ""
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      company_website: e.target.value,
                    }))
                  }
                />
              )}

              <div className={styles.labelInputWrapper}>
                <label className={styles.label}>
                  Estimated number of new jobs per month
                </label>
                <div className={styles.optionGroup}>
                  {["1-5", "6-10", "10-20", "20-30", "30+"].map((count) => (
                    <button
                      key={count}
                      type="button"
                      className={
                        formData.new_jobs === count
                          ? styles.activeOption
                          : styles.optionButton
                      }
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, new_jobs: count }))
                      }
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>
              {errors.new_jobs && (
                <p className={styles.errorText}>{errors.new_jobs}</p>
              )}
              <div className={styles.labelInputWrapper}>
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
              </div>
              {errors.company_size && (
                <p className={styles.errorText}>{errors.company_size}</p>
              )}

              <div className={styles.labelInputWrapper}>
                <label className={styles.label}>
                  Does your company have a sales team?
                </label>
                <div className={styles.toggleGroup}>
                  <button
                    type="button"
                    className={
                      formData.company_sales_team === 1
                        ? styles.activeButton
                        : styles.toggleButton
                    }
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        company_sales_team: 1,
                      }))
                    }
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={
                      formData.company_sales_team === 0
                        ? styles.activeButton
                        : styles.toggleButton
                    }
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        company_sales_team: 0,
                      }))
                    }
                  >
                    No
                  </button>
                </div>
              </div>
              {errors.company_sales_team && (
                <p className={styles.errorText}>{errors.company_sales_team}</p>
              )}
              <div className={styles.labelInputWrapper}>
                <label className={styles.label}>
                  Does your company use social media?
                </label>
                <div className={styles.toggleGroup}>
                  <button
                    type="button"
                    className={
                      formData.social_media === 1
                        ? styles.activeButton
                        : styles.toggleButton
                    }
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, social_media: 1 }))
                    }
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={
                      formData.social_media === 0
                        ? styles.activeButton
                        : styles.toggleButton
                    }
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, social_media: 0 }))
                    }
                  >
                    No
                  </button>
                </div>
              </div>
              {errors.social_media && (
                <p className={styles.errorText}>{errors.social_media}</p>
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
    </>
  );
};

export default ServiceDetailsStep;
