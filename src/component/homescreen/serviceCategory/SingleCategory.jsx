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
       <img
            alt={category.name}
            src={
                  category.category_icon
                  ? `${BASE_URL_IMAGE}${category.category_icon}` // Convert to WebP
                  : hiring
                  }
                  className={styles.image}
                  loading="lazy"           
                  decoding="async"         
                  width={80}              
                  height={80}             
                  style={{objectFit: 'contain'}}
                            onError={(e) => {
                            e.target.src = hiring;
                            }}
                   
            />
      </div>
      <div className={styles.title}>{category.name}</div>
    </div>
  );
};

export default SingleCategory;
