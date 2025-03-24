import React, { useState } from "react";
import styles from "./ServiceDetailsStep.module.css";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

const ServiceDetailsStep = ({
  nextStep,
  prevStep,
  handleInputChange,
  formData,
  setFormData,
  errors,
}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
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
              <div
                className={styles.labelInputWrapper}
                style={{ position: "relative" }}
              >
                <label className={styles.label}>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`${styles.input} ${
                    errors.password ? styles.errorBorder : ""
                  }`}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "57%",
                    transform: "translateY(0%)",
                    cursor: "pointer",
                    color: "#888",
                  }}
                >
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </span>
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

              <div className={styles.labelInputWrapper}>
                <label className={styles.label}>
                  Does your company have a website?
                </label>

                <div className={styles.toggleGroup}>
                  <button
                    type="button"
                    className={
                      formData.is_company_website == 1
                        ? styles.activeButton
                        : styles.toggleButton
                    }
                    onClick={() =>
                      dispatch(
                        setFormData({
                          is_company_website: 1,
                          company_website: "",
                        })
                      )
                    }
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={
                      formData.is_company_website == 0
                        ? styles.activeButton
                        : styles.toggleButton
                    }
                    onClick={() =>
                      dispatch(
                        setFormData({
                          is_company_website: 0,
                          company_website: "",
                        })
                      )
                    }
                  >
                    No
                  </button>
                </div>
              </div>
              {formData.is_company_website === 1 && (
                <input
                  type="text"
                  className={styles.input}
                  name="company_website"
                  placeholder="Website address (optional)"
                  value={
                    formData.company_website != 1
                      ? formData.company_website
                      : ""
                  }
                  onChange={(e) =>
                    dispatch(
                      setFormData({
                        company_website: e.target.value,
                      })
                    )
                  }
                />
              )}

              <div className={styles.labelInputWrapper}>
                <label className={styles.label}>
                What is the estimated number of new jobs per month you would like to help grow your business?
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
                      onClick={() => dispatch(setFormData({ new_jobs: count }))}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

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
                        dispatch(setFormData({ company_size: size }))
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

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
                      dispatch(
                        setFormData({
                          company_sales_team: 1,
                        })
                      )
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
                      dispatch(
                        setFormData({
                          company_sales_team: 0,
                        })
                      )
                    }
                  >
                    No
                  </button>
                </div>
              </div>

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
                    onClick={() => dispatch(setFormData({ social_media: 1 }))}
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
                    onClick={() => dispatch(setFormData({ social_media: 0 }))}
                  >
                    No
                  </button>
                </div>
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
