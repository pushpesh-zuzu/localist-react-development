import { TreePreservationData } from "./TreePreservationData/TreePreservationData";
import styles from "./Blog.module.css";

const Blog = () => {
  return (
    <div className={styles.blogContainer}>
      <header
        className={styles.blogHeader}
        style={{
          backgroundImage: `
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 50%,
        rgba(0, 175, 227, 0.9) 74.73%
      ),
      url(${TreePreservationData.imgSrc})
    `,
        }}
      >
        <div className={styles.overlay}>
          <div className={styles.headerContent}>
            <h1>{TreePreservationData.title}</h1>
          </div>
          <div className={styles.authorInfo}>
            <p>
              <strong>Written by:</strong> Joe Bloggs
            </p>
            <p>
              <strong>Reviewed by:</strong> Richard Jones
            </p>
            <p>
              <strong>Published:</strong> 24.08.24
            </p>
            <p>
              <strong>Updated:</strong> 28.10.25
            </p>
          </div>
        </div>
      </header>

      <p>{TreePreservationData.description}</p>

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
