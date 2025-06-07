import React, { useEffect, useState } from "react";
import styles from "./ServiceBusinessAddressStep.module.css";
import { useDispatch, useSelector } from "react-redux";

const ServiceBusinessAddressStep = ({
  nextStep,
  prevStep,
  handleInputChange,
  formData,
  setFormData,
  errors,
}) => {
  
const { country ,city,postalcode} = useSelector((state) => state.findJobs)
console.log(country,city,postalcode,"123")
  const dispatch = useDispatch()
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
              <input
                type="text"
                className={styles.input}
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            {/* {errors.address && <p className={styles.errorText}>{errors.address}</p>} */}

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>Building or House Name/Number</label>
              <input type="text" className={styles.input} name="apartment"
                  value={formData.apartment }
                  onChange={handleInputChange}/>
            </div>

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>City</label>
              <input
                type="text"
                className={styles.input}
                name="city"
                value={formData.city || formData?.city}
                onChange={handleInputChange}
              />
            </div>
            {/* {errors.city && <p className={styles.errorText}>{errors.city}</p>} */}

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>Country</label>
              <input
                type="text"
                className={styles.input}
                name="country"
                value={formData.country || formData?.country}
                onChange={handleInputChange}
              />
            </div>
            {/* {errors.state && <p className={styles.errorText}>{errors.state}</p>} */}
            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>Postcode</label>
              {/* <div className={styles.toggleGroup}>
  <button
    type="button"
    className={formData?.is_zipcode == 1 ? styles.activeButton : styles.toggleButton}
    onClick={() => dispatch(setFormData({ is_zipcode: 1, zipcode: "" }))}
  >
    Yes
  </button>
  <button
    type="button"
    className={formData?.is_zipcode == 0 ? styles.activeButton : styles.toggleButton}
    onClick={() => dispatch(setFormData({ is_zipcode: 0, zipcode: "" }))}
  >
    No
  </button>
</div> */}


{/* {formData?.is_zipcode !== 0 && ( */}
  <div className={styles.labelInputWrapper}>
    <input
      type="number"
      placeholder="Postcode"
      className={styles.input}
      style={{
        appearance: "textfield",
        MozAppearance: "textfield",
        WebkitAppearance: "none"
      }}
      name="zipcode"
      value={formData.zipcode || formData?.zipcode}
      onChange={(e) =>
        dispatch(setFormData({
          ...formData, 
          zipcode: e.target.value, 
        }))
      }
    />
  </div>
  </div> 
{/* )} */}

            {/* {formData?.zipcode === 1 && (
              <div className={styles.labelInputWrapper}>
                <input
                  type="text"
                  placeholder="Zip Code"
                  className={styles.input}
                  name="is_zipcode"
                  value={formData.is_zipcode || ""}
                  onChange={(e) =>
                    dispatch(setFormData({
                      ...formData, 
                      is_zipcode: e.target.value, 
                    }))
                  }
                />
              </div>
            )} */}

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
