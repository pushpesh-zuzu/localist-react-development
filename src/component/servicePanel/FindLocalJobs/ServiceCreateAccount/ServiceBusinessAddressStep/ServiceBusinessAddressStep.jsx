import React, { useEffect, useState ,useRef } from "react";
import styles from "./ServiceBusinessAddressStep.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompanyDetails,clearCompanyData
} from "../../../../../store/Company/companyLookup";


const ServiceBusinessAddressStep = ({
  nextStep,
  prevStep,
  handleInputChange,
  formData,
  setFormData,
  errors,
}) => {

const dispatch = useDispatch();
const { country, city, postalcode } = useSelector((state) => state.findJobs);
const companyData = useSelector((state) => state.companyLook?.companyData);
  const hasClearedOnce = useRef(false); // ✅ avoid duplicate "0" API calls

  useEffect(() => {
    const reg = formData.company_reg_number?.trim();

    if (!reg) {
      if (!hasClearedOnce.current) {
        hasClearedOnce.current = true;

        // Call with dummy reg no to trigger backend cleanup
        dispatch(fetchCompanyDetails("0"));
        dispatch(clearCompanyData());

        dispatch(
          setFormData({
            address: "",
            address_line: "",
            locality: "",
            zipcode: "",
            country: "",
          })
        );
      }
    } else if (reg.length === 8) {
      hasClearedOnce.current = false; // allow re-trigger if cleared again
      dispatch(fetchCompanyDetails(reg));
    }
  }, [formData.company_reg_number, dispatch, setFormData]);


useEffect(() => {
  const reg = formData.company_reg_number?.trim();

  if (
    reg?.length === 8 &&
    companyData?.company_name &&
    companyData?.registered_office_address
  ) {
    const newAddress = {
      address: companyData.registered_office_address?.address_line_1 || "",
      address_line: companyData.registered_office_address?.address_line_2 || "",
      locality: companyData.registered_office_address?.locality || "",
      zipcode: companyData.registered_office_address?.postal_code || "",
      country: companyData.registered_office_address?.country || "",
    };

    const shouldUpdate = Object.entries(newAddress).some(
      ([key, value]) => formData[key] !== value
    );

    if (shouldUpdate) {
      dispatch(setFormData(newAddress));
    }
  }
}, [companyData, formData, dispatch]);



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
                  value={formData.address_line}
                  onChange={handleInputChange}/>
            </div>

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>City</label>
              <input
                type="text"
                className={styles.input}
                name="city"
                value={formData.locality}
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
                value={formData.country}
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
      type="text"
      placeholder="Postcode"
      className={styles.input}
      style={{
        appearance: "textfield",
        MozAppearance: "textfield",
        WebkitAppearance: "none"
      }}
      name="zipcode"
      value={formData.zipcode}
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
