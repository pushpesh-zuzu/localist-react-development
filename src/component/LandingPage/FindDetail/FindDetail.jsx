import Breadcrumb from "../../common/BreadCrum/Breadcrum";
import styles from "./finddetail.module.css";

const FindDetail = ({ paragraphs = [] }) => {
  return (
    <div className={styles.findAccountInfoContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.descriptionContainer}>
          {paragraphs.map((para, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: para }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindDetail;
