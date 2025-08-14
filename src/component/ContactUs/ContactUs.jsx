import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import { contactUsBanner, contactUsMap } from "../../assets/Images/MainBanners";
import { Form } from "antd";
import TextInput from "../customInputs/TextInput";

const ContactUs = () => {
  const [form] = Form.useForm(); //
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    customerType: "customer",
    message: "",
  });

  const onFinish = (values) => {
    console.log(values, "values");
  };

  const bannerImage = {
    backgroundImage: `url(${contactUsBanner})`,
  };

  return (
    <div className={styles.contactSection}>
      <div className={styles.bannerImage} style={bannerImage}>
        <h1 className={styles.bannerTitle}>Contact us</h1>
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
              <TextInput type="text" name="company" required label="Company" />
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.customerTypeGroup}>
                <span style={{visibility:'hidden'}} className={styles.buttonlable}>''</span>
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
                      formData.customerType === "customer" ? styles.active : ""
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
        <span className={styles.mapText}>Contact Us Map</span>
      </div>
    </div>
  );
};

export default ContactUs;
