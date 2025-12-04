import { TreePreservationData } from "./TreePreservationData/TreePreservationData";
import styles from "./Blog.module.css";
import profile_blog from "../../assets/Images/profile_blog.png";
import blog_fb from "../../assets/Icons/blog_fb.png";
import blog_x from "../../assets/Icons/blog_x.png";
import blog_linkedin from "../../assets/Icons/blog_linkedin.png";
import blog_link from "../../assets/Icons/blog_link.png";
import PostCode from "./PostCodeContainer/PostCode";
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
          <div className={styles.overlayWrap}>
            <div className={styles.headerContent}>
              <div className={styles.header_service}>
                {TreePreservationData.service}
              </div>
              <h1>{TreePreservationData.title}</h1>
            </div>
            <div className={styles.authorInfo}>
              <div className={styles.profileWrap}>
                <img src={profile_blog} alt="" />
                <div className={styles.profileInner}>
                  <div>
                    <p>
                      Written by <a href="#">Joe Bloggs</a>
                    </p>
                    <p>
                      <a href="#">Reviewed</a> by <a href="#">Richard Jones</a>
                    </p>
                  </div>
                  <div>
                    <p>Published: 24.08.24</p>
                    <p>Updated: 28.10.25</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.GreenBar} />

      <div className={styles.innerContainer}>
        <section className={styles.blogSectionDes}>
          <div className={styles.social_wrap}>
            <span>Share</span>
            <div className={styles.social_Icons}>
              <img src={blog_linkedin} alt="" />
              <img src={blog_x} alt="" />
              <img src={blog_fb} alt="" />
              <img src={blog_link} alt="" />
            </div>
          </div>
          <p className={styles.timeWrap}>10 mins read time</p>
          <p className={styles.descriptionText}>
            {TreePreservationData.description}
          </p>
          <img
            src={TreePreservationData.treeImg}
            alt=""
            className={styles.single_tree_img}
          />
        </section>
        {TreePreservationData.sections.map((section, index) => (
          <section key={index} className={styles.blogSection}>
            <h2>{section.title}</h2>
            <h3>{section.subtitle}</h3>
            <p>{section.content}</p>
            <p>{section.content1}</p>
            <p>{section.content2}</p>
            {section.extraImage && (
              <img
                src={section.extraImage}
                alt="Extra section visual"
                className={styles.single_tree_img}
              />
            )}
            <h4>{section.extra}</h4>
            <p>{section.extraContent1}</p>
            <p>{section.extraContent2}</p>
            <p>{section.extraContent3}</p>
            <PostCode />
          </section>
        ))}
      </div>
    </div>
  );
};

export default Blog;
