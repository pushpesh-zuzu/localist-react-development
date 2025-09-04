import { BASE_URL_IMAGE } from "../../../utils";
import styles from "./serviceCategory.module.css";
import hiring from "../../../assets/Images/ServicePanel/hiring.svg";
import { Link } from "react-router-dom";
import { useUserGeo } from "../../../utils/geo";

const SingleCategory = ({ category, onClick }) => {
  const { country, lang } = useUserGeo();
  return (
    <Link
    to={`/${lang}/${country}/home`}
      className={styles.singleCategory}
      // onClick={() => onClick(category.name)}
      style={{ cursor: "pointer !important",textDecoration:'none' }}
    >
      <div className={styles.imageContainer}>
        {/* <img src={category.icon} alt={category.name} className={styles.image} /> */}
        <img
          alt={category.name}
          src={
            category.category_icon
              ? `${BASE_URL_IMAGE}${category.category_icon}`
              : hiring
          }
          className={styles.image}
        />
      </div>
      <div className={styles.title}>{category.name}</div>
    </Link>
  );
};

export default SingleCategory;
