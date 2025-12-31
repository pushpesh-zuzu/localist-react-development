import H3 from "../UITypography/H3";
import Paragraph from "../UITypography/Paragrah";
import styles from "./NewPPCForm.module.css";

function NewPPCForm() {
  return (
    <div className={styles.formCard}>
      <div className={styles.titleContainer}>
        <H3 className={`Inter ${styles.formTitle}`}>Get Quotes Now</H3>
        <Paragraph className={styles.description}>
          Fill out the form and receive quotes from local professionals
        </Paragraph>
      </div>

      <form className={styles.form}>
        <label>Full Name *</label>
        <input placeholder="Enter your full name" />

        <label>Phone Number *</label>
        <input placeholder="Enter your phone number" />

        <label>Email Address *</label>
        <input placeholder="Enter your email" />

        <label>What Service Do You Need? *</label>
        <select>
          <option>Choose a service...</option>
        </select>

        <label>Where Do You Need It? *</label>
        <input placeholder="Enter your Pin Code" />

        <button className={` Arial ${styles.submitBtn}`}>Continue ➜</button>

        <small
          className={styles.disclaimer}
          style={{ maxWidth: "408px", marginLeft: "auto", marginRight: "auto" }}
        >
          By submitting this form, you agree to receive emails, WhatsApp
          messages, and other communications from us and our service partners,
          even if you are on the Do Not Disturb (DND) registry.
        </small>
      </form>
    </div>
  );
}

export default NewPPCForm;
