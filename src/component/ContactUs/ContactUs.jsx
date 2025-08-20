import React, { useState } from "react";
import styles from "./contactus.module.css";
import { contactUsBanner, contactUsMap } from "../../assets/Images/MainBanners";
import { Form } from "antd";
import TextInput from "../customInputs/TextInput";
import { Helmet } from "react-helmet-async";
import axiosInstance from "../../Api/axiosInstance";

const ContactUs = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    customerType: "customer",
    message: "",
  });

  
   const onFinish = async (values) => {
    try {
      console.log("Form values:", values);

      // ✅ Use axiosInstance, only pass the endpoint (no need for full base URL)
      // const response = await axiosInstance.post(
      //   "users/update-seller-profile",
      //   values
      // );

      if (1==1) {
        message.success("Profile updated successfully ✅");
      } else {
        message.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("API Error:", error);
      message.error("Failed to update profile ❌");
    }
  };

  const bannerImage = {
    backgroundImage: `url(${contactUsBanner})`,
  };

  return (
    <>
      <Helmet>
        <title>
          Get in Touch with Localists | Customer & Professional Support
        </title>
        <meta
          name="description"
          content=" Have questions or need help? Contact Localists & Speak with our team, find professionals, or join as a service provider. We’re here to help you connect."
        />
      </Helmet>
      <div className={styles.contactSection}>
        <div className={styles.bannerImage} style={bannerImage}>
          <h1 className={styles.bannerTitle}>Contact Us</h1>
        </div>

        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Get in touch with our Team</h2>

          <Form
            form={form}
            name="login"
            initialValues={{ customerType: "customer" }}
            requiredMark="optional"
            onFinish={onFinish}
            layout="vertical"
            className={styles.formWrapper}
          >
            <Form.Item name="customerType" hidden>
              <input type="hidden" />
            </Form.Item>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <TextInput
                  type="text"
                  name="fullName"
                  required
                  label="Full Name"
                />
              </div>
              <div className={styles.inputGroup}>
                <TextInput
                  type="number"
                  name="phoneNumber"
                  required
                  label="Phone Number"
                />
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <TextInput
                  type="text"
                  name="company"
                  required
                  label="Company"
                />
              </div>
              <div className={styles.inputGroup}>
                <div className={styles.customerTypeGroup}>
                  <span
                    style={{ visibility: "hidden" }}
                    className={styles.buttonlable}
                  >
                    ''
                  </span>
                  <div className={styles.buttonContainer}>
                    <div
                      className={`${styles.buttonSlider} ${
                        formData.customerType === "professional"
                          ? styles.professional
                          : ""
                      }`}
                    ></div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          customerType: "customer",
                        }));
                        form.setFieldsValue({ customerType: "customer" });
                      }}
                      className={`${styles.customerButton} ${
                        formData.customerType === "customer"
                          ? styles.active
                          : ""
                      }`}
                    >
                      Customer
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          customerType: "professional",
                        }));
                        form.setFieldsValue({ customerType: "professional" });
                      }}
                      className={`${styles.customerButton} ${
                        formData.customerType === "professional"
                          ? styles.active
                          : ""
                      }`}
                    >
                      Professional
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.textareaGroup}>
              <TextInput
                type="textarea"
                label="Message"
                name="message"
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </Form>
        </div>

        <div
          className={styles.mapSection}
          style={{ backgroundImage: `url(${contactUsMap})` }}
        >
          {/* <span className={styles.mapText}>Contact Us Map</span> */}
        </div>
      </div>
    </>
  );
};

export default ContactUs;
