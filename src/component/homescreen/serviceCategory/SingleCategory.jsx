import { BASE_URL_IMAGE } from "../../../utils";
import styles from "./serviceCategory.module.css";
import hiring from "../../../assets/Images/ServicePanel/hiring.svg";


const SingleCategory = ({ category, onClick }) => {
  return (
    <div
      className={styles.singleCategory}
      onClick={() => onClick(category.name)}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.imageContainer}>
        {/* <img src={category.icon} alt={category.name} className={styles.image} /> */}
        <img src={category.category_icon ? `${BASE_URL_IMAGE}${category.category_icon}` : hiring}  className={styles.image}/>
      </div>
      <div className={styles.title}>{category.name}</div>
    </div>
  );
};

export default SingleCategory;
