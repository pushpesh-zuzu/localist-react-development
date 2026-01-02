import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AsyncSelect from "react-select/async";
import GetQuotesIcon from "../../../assets/ReactIcons/GetQuotesIcon";
import H3 from "../UITypography/H3";
import Paragraph from "../UITypography/Paragrah";
import styles from "./NewPPCForm.module.css";
import FormWrapper from "./RegistrationForm/FormWrapper";
import {
  getCityName,
  questionAnswerData,
  setbuyerRequestData,
  setcitySerach,
} from "../../../store/Buyer/BuyerSlice";
import { searchService } from "../../../store/FindJobs/findJobSlice";
import { showToast } from "../../../utils";
import CheckIcon from "../../../assets/Icons/greenCheckBox.jpeg";
import { validateUKPhoneNumber } from "../../../utils/formatUKPhoneNumber";
import { useEmailCheck } from "../../../utils/emailExist";

function NewPPCForm({ nextStep }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    service: null,
    serviceId: "",
    postcode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [postcodeValidating, setPostcodeValidating] = useState(false);
  const [postcodeValid, setPostcodeValid] = useState(false);
  const [city, setCity] = useState("");
  const [serviceOptions, setServiceOptions] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const postcodeValidationTimeout = useRef(null);
  const searchTimeout = useRef(null);
  const lastSearchValue = useRef("");

  const { searchServiceLoader, service } = useSelector(
    (state) => state.findJobs
  );
  const { isEmailAvailable } = useEmailCheck(formData.email);

  useEffect(() => {
    if (service && Array.isArray(service) && service.length > 0) {
      const options = service.map((serviceItem) => ({
        value: serviceItem.id,
        label: serviceItem.name,
        ...serviceItem,
      }));
      setServiceOptions(options);
    } else if (service && Array.isArray(service) && service.length === 0) {
      setServiceOptions([]);
    }
  }, [service]);

  useEffect(() => {
    dispatch(searchService({ search: "" }));
  }, [dispatch]);

  const loadOptions = useCallback(
    (inputValue, callback) => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      if (lastSearchValue.current === inputValue) {
        callback(serviceOptions);
        return;
      }

      lastSearchValue.current = inputValue;

      searchTimeout.current = setTimeout(() => {
        dispatch(searchService({ search: inputValue || "" }));
        setTimeout(() => {
          callback(serviceOptions);
        }, 100);
      }, 300);
    },
    [dispatch, serviceOptions]
  );

  const validatePostcode = useCallback(
    async (postcodeValue) => {
      if (!postcodeValue || postcodeValue.trim().length < 3) {
        setPostcodeValid(false);
        setCity("");
        setErrors((prev) => ({ ...prev, pincode: "" }));
        return;
      }

      setPostcodeValidating(true);
      try {
        const response = await dispatch(
          getCityName({ postcode: postcodeValue })
        );
        const newResponse = response?.unwrap
          ? await response.unwrap()
          : response;

        if (newResponse?.data?.city) {
          setPostcodeValid(true);
          setCity(newResponse.data.city);
          dispatch(setcitySerach(newResponse.data.city));
          setErrors((prev) => ({ ...prev, pincode: "" }));
        } else {
          setPostcodeValid(false);
          setCity("");
          setErrors((prev) => ({
            ...prev,
            pincode: "Please enter a valid postcode!",
          }));
        }
      } catch (error) {
        setPostcodeValid(false);
        setCity("");
        setErrors((prev) => ({
          ...prev,
          pincode: "Please enter a valid postcode!",
        }));
      } finally {
        setPostcodeValidating(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (formData.postcode.trim().length >= 3) {
      if (postcodeValidationTimeout.current) {
        clearTimeout(postcodeValidationTimeout.current);
      }

      postcodeValidationTimeout.current = setTimeout(() => {
        validatePostcode(formData.postcode);
      }, 600);
    } else {
      setPostcodeValid(false);
      setCity("");
      setErrors((prev) => ({ ...prev, pincode: "" }));
    }

    return () => {
      if (postcodeValidationTimeout.current) {
        clearTimeout(postcodeValidationTimeout.current);
      }
    };
  }, [formData.postcode, validatePostcode]);

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleServiceChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      service: selectedOption,
      serviceId: selectedOption?.value || "",
    }));
    setErrors((prev) => ({ ...prev, service: "" }));
  };

  const handlePostcodeChange = (e) => {
    const value = e.target.value.replace(/\s/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, postcode: value }));
    setErrors((prev) => ({ ...prev, pincode: "" }));
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      padding: "6px 16px",
      borderRadius: "3px",
      borderColor: errors.service ? "#ff4d4f" : "#d9d9d9",
      borderWidth: "1px",
      minHeight: "48px",
      boxShadow: "none",
      "&:hover": {
        borderColor: errors.service ? "#ff4d4f" : "#d9d9d9",
      },
      fontFamily: "Arial",
      fontSize: "16px",
      boxSizing: "border-box",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0",
      fontFamily: "Arial",
      fontSize: "16px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#d9d9d9",
      fontFamily: "Arial",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "18px",
      letterSpacing: "-0.03px",
      margin: 0,
    }),
    input: (base) => ({
      ...base,
      color: "#253238",
      fontFamily: "Arial",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "18px",
      letterSpacing: "-0.03px",
      margin: 0,
      padding: 0,
    }),
    singleValue: (base) => ({
      ...base,
      color: "#253238",
      fontFamily: "Arial",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "18px",
      letterSpacing: "-0.03px",
      margin: 0,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#d9d9d9",
      padding: "0",
      "&:hover": {
        color: "#d9d9d9",
      },
    }),
    clearIndicator: (base) => ({
      ...base,
      color: "#d9d9d9",
      padding: "0 8px",
      "&:hover": {
        color: "#999",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "3px",
      border: "1px solid #d9d9d9",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      marginTop: "4px",
      zIndex: 1000,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      maxHeight: "300px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#00aef0"
        : state.isFocused
        ? "#f5f5f5"
        : "white",
      color: state.isSelected ? "white" : "#253238",
      padding: "12px 16px",
      fontFamily: "Arial",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "18px",
      letterSpacing: "-0.03px",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#00aef0",
      },
    }),
    loadingIndicator: (base) => ({
      ...base,
      color: "#00aef0",
    }),
    loadingMessage: (base) => ({
      ...base,
      fontFamily: "Arial",
      fontSize: "14px",
      color: "#666",
      padding: "12px 16px",
    }),
    noOptionsMessage: (base) => ({
      ...base,
      fontFamily: "Arial",
      fontSize: "14px",
      color: "#666",
      padding: "12px 16px",
    }),
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{11}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid 11-digit phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.service || !formData.serviceId) {
      newErrors.service = "Please select a service!";
    }

    if (!formData.postcode.trim()) {
      newErrors.pincode = "Postcode is required!";
    } else if (!postcodeValid) {
      newErrors.pincode = "Please enter a valid postcode!";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    if (!validateUKPhoneNumber(formData.phoneNumber)) {
      return;
    }
    setLoading(true);

    try {
      const response = await dispatch(
        getCityName({ postcode: formData.postcode })
      );
      const newResponse = response?.unwrap ? await response.unwrap() : response;

      if (newResponse?.data?.city) {
        setPostcodeValid(true);
        setCity(newResponse.data.city);
        dispatch(setcitySerach(newResponse.data.city));

        dispatch(
          setbuyerRequestData({
            name: formData.fullName,
            phone: formData.phoneNumber,
            email: formData.email,
            service_id: formData.service.value,
            service_name: formData.service.label,
            postcode: formData.postcode,
            city: newResponse.data.city,
          })
        );

        // showToast("success", "Form submitted successfully!");

        // console.log("Form submitted successfully:", {
        //   ...formData,
        //   city: newResponse.data.city,
        // });

        setFormData({
          fullName: "",
          phoneNumber: "",
          email: "",
          service: null,
          serviceId: "",
          postcode: "",
        });
        setCity("");
        setPostcodeValid(false);
        nextStep();
      } else {
        showToast("error", "Please enter a valid postcode!");
        setErrors((prev) => ({
          ...prev,
          pincode: "Please enter a valid postcode!",
        }));
      }
    } catch (error) {
      showToast("error", "Please enter a valid postcode!");
      setErrors((prev) => ({
        ...prev,
        pincode: "Please enter a valid postcode!",
      }));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (formData.serviceId) {
      dispatch(questionAnswerData({ service_id: formData.serviceId }));
    }
  }, [formData.serviceId]);

  const { questionLoader, buyerRequest } = useSelector((state) => state.buyer);

  useEffect(() => {
    if (!isEmailAvailable) {
      setFormData({ ...formData, email: "" });
      dispatch(
        setbuyerRequestData({
          ...buyerRequest,
          email: "",
        })
      );
    }
  }, [isEmailAvailable]);
  // const handleEmailBlur = async () => {
  //   if (!email) {
  //     setInputType("text");
  //   }

  //   if (!email) return;

  //   try {
  //     const res = await dispatch(checkEmailIdApi({ email }));

  //     if (res?.success) {
  //       setErrors((prev) => ({ ...prev, email: false }));
  //       setIsEmailValid(true);
  //       setEmailErrorMessage("");
  //     } else {
  //       setEmail("");
  //       if (setEmails) setEmails("");
  //       setIsEmailValid(false);
  //       setEmailErrorMessage("Email is already registered.");
  //     }
  //   } catch (err) {
  //     console.error("Error checking email:", err);
  //     setErrors((prev) => ({ ...prev, email: false }));
  //     setIsEmailValid(false);
  //     setEmailErrorMessage("Something went wrong. Please try again.");
  //   }
  // };
  return (
    <FormWrapper>
      <div className={styles.titleContainer}>
        <H3 className={`Inter ${styles.formTitle}`}>Get Quotes Now</H3>
        <Paragraph className={styles.description}>
          Fill out the form and receive quotes from local professionals
        </Paragraph>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Full Name *</label>
        <input
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleInputChange}
          className={`${styles.input} ${
            errors.fullName ? styles.errorBorder : ""
          }`}
        />
        {errors.fullName && (
          <span className={styles.errorText}>{errors.fullName}</span>
        )}

        <label>Phone Number *</label>
        <input
          name="phoneNumber"
          placeholder="Enter your phone number"
          value={formData.phoneNumber}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, "");
            setFormData((prev) => ({
              ...prev,
              phoneNumber: onlyNumbers,
            }));
            if (errors.phoneNumber) {
              setErrors((prev) => ({ ...prev, phoneNumber: "" }));
            }
          }}
          maxLength={11}
          type="tel"
          className={`${styles.input} ${
            errors.phoneNumber ? styles.errorBorder : ""
          }`}
        />
        {errors.phoneNumber && (
          <span className={styles.errorText}>{errors.phoneNumber}</span>
        )}

        <label>Email Address *</label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          // onBlur={handleEmailBlur}
          className={`${styles.input} ${
            errors.email ? styles.errorBorder : ""
          }`}
        />
        {errors.email && (
          <span className={styles.errorText}>{errors.email}</span>
        )}

        <label>What Service Do You Need? *</label>
        <AsyncSelect
          cacheOptions={false}
          loadOptions={loadOptions}
          defaultOptions={serviceOptions}
          options={serviceOptions}
          onChange={handleServiceChange}
          value={formData.service}
          placeholder="Search for a service..."
          noOptionsMessage={({ inputValue }) =>
            searchServiceLoader ? "Searching..." : "No services found"
          }
          loadingMessage={() => "Searching services..."}
          isLoading={searchServiceLoader}
          styles={customStyles}
          isClearable
          isSearchable
          menuIsOpen={menuIsOpen}
          onMenuOpen={() => {
            setMenuIsOpen(true);
            if (serviceOptions.length === 0) {
              dispatch(searchService({ search: "" }));
            }
          }}
          onMenuClose={() => {
            setMenuIsOpen(false);
          }}
          onInputChange={(value, action) => {
            if (action.action === "input-change") {
              if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
              }
              searchTimeout.current = setTimeout(() => {
                dispatch(searchService({ search: value || "" }));
              }, 300);
            }
          }}
          components={{
            LoadingIndicator: () => (
              <Spin
                indicator={<LoadingOutlined spin />}
                size="small"
                style={{ marginRight: "8px" }}
              />
            ),
          }}
        />
        {errors.service && (
          <span className={styles.errorText}>{errors.service}</span>
        )}

        <label>Where Do You Need It? *</label>
        <div className={styles.postcodeContainer}>
          <input
            name="postcode"
            placeholder="Enter your Pin Code"
            value={formData.postcode}
            onChange={handlePostcodeChange}
            className={`${styles.input} ${
              errors.pincode ? styles.errorBorder : ""
            }`}
          />

          {postcodeValidating ? (
            <div className={styles.validationIcon}>
              <Spin size="small" indicator={<LoadingOutlined spin />} />
            </div>
          ) : postcodeValid ? (
            <div className={styles.validationIcon}>
              <img src={CheckIcon} alt="Valid" className={styles.checkIcon} />
            </div>
          ) : null}
        </div>
        {errors.pincode ? (
          <span className={styles.errorText}>{errors.pincode}</span>
        ) : (
          ""
        )}

        <button
          type="submit"
          className={`Arial ${styles.submitBtn}`}
          disabled={loading || !!questionLoader}
        >
          {loading ? (
            <Spin
              indicator={<LoadingOutlined spin style={{ color: "#fff" }} />}
            />
          ) : (
            <>
              Continue <GetQuotesIcon color="#fff" />
            </>
          )}
        </button>

        <small
          className={styles.disclaimer}
          style={{ maxWidth: "408px", marginLeft: "auto", marginRight: "auto" }}
        >
          By submitting this form, you agree to receive emails, WhatsApp
          messages, and other communications from us and our service partners,
          even if you are on the Do Not Disturb (DND) registry.
        </small>
      </form>
    </FormWrapper>
  );
}

export default NewPPCForm;
