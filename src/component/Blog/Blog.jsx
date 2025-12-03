import { TreePreservationData } from "./TreePreservationData/TreePreservationData";
import styles from "./Blog.module.css";

const Blog = () => {
  return (
    <div className={styles.blogContainer}>
      <header className={styles.blogHeader}>
        <h1>{TreePreservationData.title}</h1>
        <p>{TreePreservationData.description}</p>
      </header>

      {TreePreservationData.sections.map((section, index) => (
        <section key={index} className={styles.blogSection}>
          <h2>{section.title}</h2>
          <h3>{section.subtitle}</h3>
          <p>{section.content}</p>
          <h4>{section.extra}</h4>
          <p>{section.extraContent}</p>
        </section>
      ))}

      <footer className={styles.blogFooter}>
        <h3>Read more</h3>
        <div className={styles.additionalInfo}>
          {TreePreservationData.additionalInfo.map((item, index) => (
            <div key={index} className={styles.additionalItem}>
              <img src={item.imgSrc} alt={item.title} />
              <h4>{item.title}</h4>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Blog;
