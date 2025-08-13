import { useState } from "react";
// import { PopularAccountantData } from "../../../constant/Location";
import styles from "./PopularAccountant.module.css";

const PopularAccountant = ({
  title,
  PopularAccountantData,
  isNeedS = true,
}) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getTruncatedText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Popular{" "}
        <span className={styles.highlight}>
          {title}
          {isNeedS ? "s" : ""}
        </span>
      </h2>
      <div className={styles.grid}>
        {PopularAccountantData?.map((accountant) => {
          const isExpanded = expandedItems[accountant.id];
          const shouldShowReadMore = accountant.description.length > 100;

          return (
            <div
              key={accountant.id}
              className={styles.accountantTestimonialWrapper}
            >
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <img
                    src={accountant.logo}
                    alt={accountant.name}
                    className={styles.logo}
                  />
                  <div>
                    <h3 className={styles.name}>{accountant.name}</h3>
                    <div className={styles.rating}>
                      {"★".repeat(accountant.stars)}
                    </div>

                    {accountant.certificate && (
                      <div className={styles.certificateContainer}>
                        <span className={styles.certificateText}>21</span>
                        <p className={styles.certificate}>
                          {accountant.certificate}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.separator}></div>

                <p className={styles.description}>
                  {isExpanded
                    ? accountant.description
                    : getTruncatedText(accountant.description)}
                  {shouldShowReadMore && (
                    <>
                      {!isExpanded ? "... " : " "}
                      <span
                        className={styles.readMore}
                        onClick={() => toggleExpanded(accountant.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleExpanded(accountant.id);
                          }
                        }}
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </span>
                    </>
                  )}
                </p>
                <button className={styles.profileButton}>View Profile</button>
              </div>

              {accountant.testimonial && (
                <div className={styles.testimonialCard}>
                  <div className={styles.profile}>
                    <div className={styles.avatar}>
                      <p>{accountant.testimonial.initial}</p>
                    </div>
                    <h3 className={styles.testimonialName}>
                      {accountant.testimonial.name}
                    </h3>
                    <div className={styles.stars}>
                      {"★".repeat(accountant.testimonial.stars)}
                    </div>
                  </div>
                  <p className={styles.reviewText}>
                    {accountant.testimonial.text}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularAccountant;
