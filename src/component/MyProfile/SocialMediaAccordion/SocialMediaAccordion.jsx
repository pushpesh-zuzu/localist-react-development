import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  updateSellerSocialLinks,
  clearSocialUpdateStatus,
  setIsDirtyRedux,
} from "../../../store/MyProfile/myProfileSlice";
import { useEffect, useState } from "react";
import styles from "./SocialMediaAccordion.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";
import { addViewProfileList } from "../../../store/LeadSetting/leadSettingSlice";

const platforms = [
  {
    key: "fb_link",
    label: "Facebook",
    placeholder: "https://www.facebook.com/yourpage",
  },
  {
    key: "twitter_link",
    label: "Twitter",
    placeholder: "https://twitter.com/yourhandle",
  },
  {
    key: "tiktok_link",
    label: "Tik Tok",
    placeholder: "https://www.tiktok.com/@yourname",
  },
  {
    key: "insta_link",
    label: "Instagram",
    placeholder: "https://www.instagram.com/yourhandle",
  },
  // { key: "linkedin_link", label: "Linkedin", placeholder: "https://www.linkedin.com/in/yourname" },
  {
    key: "linkedin_link",
    label: "Linkedin",
    placeholder: "https://uk.linkedin.com/yourname",
  },
];

const urlPatterns = {
  fb_link: /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9_.-]+$/,
  twitter_link: /^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]+$/,
  insta_link: /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.]+$/,
  // linkedin_link: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+$/,
  linkedin_link: /^(https?:\/\/)?(uk\.)linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
  tiktok_link: /^(https?:\/\/)?(www\.)?tiktok\.com\/@[A-Za-z0-9_.-]+$/,
};

const SocialMediaAccordion = ({ details }) => {
  const dispatch = useDispatch();
  const { socialUpdateSuccess, socialUpdateError } = useSelector(
    (state) => state.myProfile
  );

  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const user_id = userToken?.id ? userToken?.id : registerData?.id;
  const [formState, setFormState] = useState({
    type: "social_media",
    fb_link: "",
    twitter_link: "",
    tiktok_link: "",
    insta_link: "",
    linkedin_link: "",
    extra_links: "",
  });

  const [errors, setErrors] = useState({});
  const [hiddenFields, setHiddenFields] = useState({
    fb_link: false,
    twitter_link: false,
    tiktok_link: false,
    insta_link: false,
    linkedin_link: false,
  });

  // const toggleFieldVisibility = (key) => {
  //   setHiddenFields((prev) => ({
  //     ...prev,
  //     [key]: !prev[key],
  //   }));
  // };

  const toggleFieldVisibility = (key) => {
    setHiddenFields((prev) => {
      const updatedFields = { ...prev, [key]: !prev[key] };
      dispatch(setIsDirtyRedux(true));
      return updatedFields;
    });
  };

  const validateField = (name, value) => {
    if (!value || hiddenFields[name]) return ""; // Optional or hidden
    const pattern = urlPatterns[name];
    if (pattern && !pattern.test(value)) {
      return "Invalid URL format";
    }
    return "";
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formState).forEach((key) => {
      const err = validateField(key, formState[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    const errMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errMsg }));
    dispatch(setIsDirtyRedux(true));
  };

  const handleSubmit = () => {
    if (!validateAll()) {
      toast.error("Please fix validation errors before submitting.");
      return;
    }
    dispatch(updateSellerSocialLinks(formState));
  };

  useEffect(() => {
    if (socialUpdateSuccess) {
      dispatch(clearSocialUpdateStatus());
      const sellerData = {
        seller_id: user_id,
      };
      dispatch(addViewProfileList(sellerData));
      dispatch(setIsDirtyRedux(false));
      toast.success("Social media links updated successfully!");
    } else if (socialUpdateError) {
      toast.error(`Error: ${socialUpdateError}`);
      dispatch(clearSocialUpdateStatus());
    }
  }, [socialUpdateSuccess, socialUpdateError, dispatch]);

  useEffect(() => {
    if (details) {
      setFormState((prev) => ({
        ...prev,
        fb_link: details.fb_link || "",
        twitter_link: details.twitter_link || "",
        tiktok_link: details.tiktok_link || "",
        insta_link: details.insta_link || "",
        linkedin_link: details.linkedin_link || "",
        extra_links: details.extra_links || "",
      }));
    }
  }, [details]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3 className={styles.heading}>Social Media</h3>
        <p className={styles.subtext}>
          Add your business’s social media profiles to help build trust.
          Customers often check these when deciding who to hire.
        </p>

        {platforms.map((platform, idx) => (
          <div className={styles.inputRow} key={idx}>
            <div className={styles.labelWrapper}>
              <label className={styles.label}>{platform.label}</label>
              {platform.label !== "Linkedin" && (
                <div className={styles.optionalToggle}>
                  <img src={iIcon} alt="info" className={styles.icon} />
                  <span className={styles.optionalText}>Optional</span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={hiddenFields[platform.key]}
                      onChange={() => toggleFieldVisibility(platform.key)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              )}
            </div>
            {!hiddenFields[platform.key] && (
              <>
                <div className={styles.inputWithToggle}>
                  <input
                    className={styles.input}
                    type="text"
                    name={platform.key}
                    value={formState[platform.key]}
                    placeholder={platform.placeholder}
                    onChange={handleChange}
                  />
                </div>
                {errors[platform.key] && (
                  <p className={styles.error}>{errors[platform.key]}</p>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.heading}>Promote Your Business</h3>
          <div className={styles.optionalToggle}>
            <img src={iIcon} alt="info" className={styles.icon} />
            <span className={styles.optionalText}>Optional</span>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
        <div className={styles.labelWrapper}>
          <p className={styles.subtext}>
            Share links to your website, articles, or other online content to
            help customers learn more about your services & business.
          </p>
        </div>
        <div className={styles.inputWithToggle}>
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="Enter one link per line"
            name="extra_links"
            value={formState.extra_links}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={styles.footer}>
        {/* <button className={styles.cancelBtn} type="button">Cancel</button> */}
        <button
          className={styles.saveButton}
          style={{ marginLeft: "auto" }}
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SocialMediaAccordion;
