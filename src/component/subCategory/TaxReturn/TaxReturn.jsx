import styles from "./TaxReturn.module.css";
import taxReturnImage from "../../../assets/Images/subcategory/tax-return-image.png";
import logo from "../../../assets/Images/logo.svg";
const TaxReturn = ({ TaxData }) => {
  console.log("TaxData", TaxData);
  return (
    <>
      <div className={styles.taxReturn_container}>
        <div className={styles.taxReturn_content_wrap}>
          <div className={styles.taxReturn_content}>
            <h1 className={styles.taxReturn_heading}>
              <b>{TaxData.heading1}: </b>
              {TaxData.heading2}
            </h1>
            <p className={styles.taxReturn_paragrap}>{TaxData.shortDes}</p>
            <div className={styles.taxReturn_content_block_wrap}>
              <div className={styles.taxReturn_content_logo}>
                <img src={logo} />
              </div>

              <div className={styles.taxReturn_content_block}>
                <p>{TaxData.name}</p>
                <span>{TaxData.data}</span>
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
