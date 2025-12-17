import {
  FIND_SERVICE_CONTENT_BLOG,
  TreePreservationData,
} from "./TreePreservationData/TreePreservationData";
import styles from "./Blog.module.css";
import profile_blog from "../../assets/Images/profile_blog.png";
import blog_fb from "../../assets/Icons/blog_fb.png";
import blog_x from "../../assets/Icons/blog_x.png";
import blog_linkedin from "../../assets/Icons/blog_linkedin.png";
import blog_link from "../../assets/Icons/blog_link.png";
import PostCode from "./PostCodeContainer/PostCode";
import { Helmet } from "react-helmet-async";
import BlogContent from "./BlogContent";
const Blog = () => {
  const blogUrl = typeof window !== "undefined" && window.location.href;

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      blogUrl
    )}`;
    window.open(url, "_blank");
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      blogUrl
    )}`;
    window.open(url, "_blank");
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      blogUrl
    )}`;
    window.open(url, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(blogUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <>
      <Helmet>
        <title>
          ECO4 Scheme: Expert Warns of Business Collapse & Fuel Poverty
        </title>
        <meta
          name="description"
          content="Energy expert Josh Wilson warns that axing the ECO4 scheme will spark major business closures, job losses, and rising fuel poverty across the UK."
        />
      </Helmet>
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
                  {/* <img src={profile_blog} alt="" /> */}
                  <div className={styles.profileInner}>
                    <div>
                      <p>
                        Written by{" "}
                        <a href=" https://www.linkedin.com/in/josh-wilson-a2120535a?trk=universal-search-cluster">
                          Josh Wilson
                        </a>
                      </p>
                      <p>
                        Reviewed by{" "}
                        <a href="https://uk.linkedin.com/in/michael-marshall-aaab3023">
                          Michael Marshall
                        </a>
                      </p>
                    </div>
                    <div>
                      <p>Published: 28 November 2025</p>
                      <p>Updated: 17 December 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className={styles.innerContainer}>
          <section className={styles.blogSectionDes}>
            <div className={styles.social_wrap}>
              <span>Share</span>

              <div className={styles.social_Icons}>
                <img
                  src={blog_linkedin}
                  onClick={shareOnLinkedIn}
                  style={{ cursor: "pointer" }}
                />

                <img
                  src={blog_x}
                  onClick={shareOnTwitter}
                  style={{ cursor: "pointer" }}
                />

                <img
                  src={blog_fb}
                  onClick={shareOnFacebook}
                  style={{ cursor: "pointer" }}
                />

                <img
                  src={blog_link}
                  onClick={copyLink}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      <BlogContent contentBlocks={FIND_SERVICE_CONTENT_BLOG["blog1"]} />
    </>
  );
};

export default Blog;
