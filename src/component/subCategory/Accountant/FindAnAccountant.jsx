import styles from "./FindAnAccountant.module.css";
import findAccountantimage from "../../../assets/Images/subcategory/find-accountant.png";

const FindAnAccountant = () => {
  return (
    <>
      <div className={styles.findAnAccountant_container}>
        <div className={styles.findAnAccountant_container_wrap}>
          <div className={styles.findAnAccountant_content}>
            <h1 className={styles.findAnAccountant_heading}>
              How to find an <b>Accountant?</b>
            </h1>
            {/* <h2 className={styles.findAnAccountant_title}>
              Choose a certified or chartered accountant
            </h2> */}
            <p className={styles.findAnAccountant_paragrap}>
              Getting professional financial help can be a game-changer for your
              personal or business needs. When choosing a financial expert, it
              is best to hire a certified accountant or chartered accountant.
              Choosing a qualified accounting expert, regulated by a
              professional body, can save you from costly mistakes.
            </p>
            <p className={styles.findAnAccountant_paragrap}>
              At Localists, we help you find quality local accounting
              professionals, from certified general accountants to forensic,
              fund, and management accountants. No matter your need, we’ll find
              the right professional near you. But before you make that hire,
              ensure you check for the following:
            </p>
              <h3>Check Qualifications</h3>
              Look out for accounting professionals with recognised certifications such as:

            <ul className={styles.findAnAccountant_listItem}>
              <li>Chartered Accountant (ACA, ACCA, or CIMA).</li>
              <li>Certified Public Accountant (CPA).</li>
              <li>Association of Accounting Technicians (AAT)</li>
              <li>Member of the Association of International Accountants (AIA)</li>
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
