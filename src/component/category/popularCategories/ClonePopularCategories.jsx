import styles from "./PopularCategories.module.css";
import { PopularCategoriesData } from "../../../constant/CloneCategory";


import { useNavigate } from "react-router-dom";








const PopularCategories = ({data}) => {

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Popular <span className={styles.highlight}>Categories</span>
      </h2>
      <div className={styles.grid}>
        {data?.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.rowWrapper}>
            <div className={styles.row}>
              <div key={row.id} className={styles.card}>
                <img src={row.image} alt={row.title} className={styles.image} />
                {row?.availableOnline && (
                  <span className={styles.availableOnline}>
                    Available Online
                  </span>
                )}
                <button
  className={styles.cardbButton}
  onClick={() => navigate(`/inprogress`)}
>
  {row.title}
</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
