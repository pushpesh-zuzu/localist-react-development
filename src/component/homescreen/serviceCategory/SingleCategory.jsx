import styles from "./serviceCategory.module.css";

const SingleCategory = ({ category, onClick }) => {
  return (
    <div
      className={styles.singleCategory}
      onClick={() => onClick(category.name)}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.imageContainer}>
        <img src={category.icon} alt={category.name} className={styles.image} />
      </div>
      <div className={styles.title}>{category.name}</div>
    </div>
  );
};

export default SingleCategory;
