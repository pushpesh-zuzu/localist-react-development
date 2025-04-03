import styles from "./TaxReturn.module.css";
import taxReturnImage from "../../../assets/Images/subcategory/tax-return-image.png";
import logo from "../../../assets/Images/logo.svg";
const TaxReturn = () => {
  return (
    <>
      <div className={styles.taxReturn_container}>
        <div className={styles.taxReturn_content_wrap}>
          <div className={styles.taxReturn_content}>
            <h1 className={styles.taxReturn_heading}>
              <b>Your 2025 tax return: </b>
              Everything you need to know in the UK
            </h1>
            <p className={styles.taxReturn_paragrap}>
              Completing your tax return - the basics
            </p>
            <div className={styles.taxReturn_content_block_wrap}>
              <div className={styles.taxReturn_content_logo}>
                <img src={logo} />
              </div>

              <div className={styles.taxReturn_content_block}>
                <p>Alex, Staff Writer</p>
                <span>Monday, 3 May 2021</span>
              </div>
            </div>
            <button className={styles.taxReturn_content_button}>
              Read the guide
            </button>
          </div>
          <div className={styles.taxReturn_iamge}>
            <div className={styles.taxReturn_image_wrap}>
              <img src={taxReturnImage} />
            </div>
            <p className={styles.taxReturn_image_text}>
              <b>Your 2025 tax return: </b>
              Everything you need to know in the UK
            </p>
            <span className={styles.taxReturn_block_text}>Accounting</span>
          </div>
          <button className={styles.taxReturn_content_button_bottom}>
            Read the guide
          </button>
        </div>
      </div>
    </>
  );
};

export default TaxReturn;
