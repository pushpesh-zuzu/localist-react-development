import styles from "./FindAnAccountant.module.css";
import findAccountantimage from "../../../assets/Images/subcategory/find-accountant.png";

const FindAnAccountant = () => {
  return (
    <>
      <div className={styles.findAnAccountant_container}>
        <div className={styles.findAnAccountant_container_wrap}>
          <div className={styles.findAnAccountant_content}>
            <h1 className={styles.findAnAccountant_heading}>
              How do I find an <b>accountant?</b>
            </h1>
            <h2 className={styles.findAnAccountant_title}>
              Choose a certified or chartered accountant
            </h2>
            <p className={styles.findAnAccountant_paragrap}>
              To keep your mind at ease and your business profitable, you should
              choose an accountant that’s regulated by a professional body.
            </p>
            <p className={styles.findAnAccountant_paragrap}>
              An experienced local accountant can add measurable value to your
              business from day one. Below are certifications to check when
              finding a local accountant.
            </p>

            <ul className={styles.findAnAccountant_listItem}>
              <li>Certified Public Accountant</li>
              <li>Chartered Accountant</li>
              <li>member of the Association of International Accountants</li>
              <li>member of the Institute of Financial Accountants</li>
            </ul>
            <p className={styles.findAnAccountant_bark_paragrap}>
              At Bark we have a choice of qualified and experienced accountants
              near you. Maybe you are looking for an established accounting firm
              or you simply need a tax accountant. All you need to do is submit
              your requirements and we will find the right accountant for you
              and your business.
            </p>
          </div>
          <div className={styles.findAnAccountant_image}>
            <img src={findAccountantimage} />
          </div>
        </div>
        <button className={styles.findAnAccountant_button}>
          Get quotes from Accountants near you
        </button>
      </div>
    </>
  );
};

export default FindAnAccountant;
