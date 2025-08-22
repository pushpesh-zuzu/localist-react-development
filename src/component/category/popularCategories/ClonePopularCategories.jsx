import styles from "./PopularCategories.module.css";
import { PopularCategoriesData } from "../../../constant/CloneCategory";

import { Link, useNavigate } from "react-router-dom";

const PopularCategories = ({ data }) => {
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
                {row.path ? (
                  <Link to={`/en/gb/${row.path}`}>
                    <img
                      src={row.image}
                      alt={row.title}
                      className={styles.image}
                    />
                  </Link>
                ) : (
                  <img
                    src={row.image}
                    alt={row.title}
                    className={styles.image}
                  />
                )}
                {row?.availableOnline && (
                  <span className={styles.availableOnline}>
                    Available Online
                  </span>
                )}
                <Link
                  className={styles.cardbButton}
                  style={{ textDecoration: "none" }}
                  to={`/en/gb/${row.path}`}
                >
                  {row.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
