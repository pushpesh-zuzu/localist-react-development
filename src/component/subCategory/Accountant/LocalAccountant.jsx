import styles from "./LocalAccountant.module.css";

const LocalAccountant = ({title=''}) => {
  return (
    <>
      <div className={styles.localAccountant_container}>
        <div className={styles.localAccountant_content_wrap}>
          <div className={styles.localAccountant_left_content}>
            <h1 className={styles.localAccountant_heading}>
              When should I hire a local <b>{title}?</b>
            </h1>
            <p className={styles.localAccountant_paragrap}>
              You should hire an {title} from day to one to help with the
              finances of your business. Every pound matters for business
              owners, so if you do not know where you stand on a monthly basis,
              you will soon find yourself losing grip of your company finances.
              The right local {title} will save you time and money year after
              year. Whether you’re a small or large-sized company, or if you
              need some help filing your tax return or handling PAYE, we’ll find
              you the best {title}s to keep your finances on track.
            </p>
          </div>
          <div className={styles.localAccountant_right_content}>
            <h1 className={styles.localAccountant_heading}>
              How much does an <b>{title} cost?</b>
            </h1>
            <p className={styles.localAccountant_paragrap}>
              {title}s are there to manage your financials in order to help
              you make more informed business decisions when it comes to
              managing your company's money.
            </p>
            <p className={styles.localAccountant_paragrap}>
              On average, an {title} in the UK will charge between £100-£360
              per month. Although, this is variable depending on the size of the
              business and what services are required. Tell us what you need
              from an {title} and receive free quotes in minutes.
            </p>
          </div>
        </div>
        <button className={styles.localAccountant_button}>
          Get quotes from {title}s near you
        </button>
      </div>
    </>
  );
};

export default LocalAccountant;
