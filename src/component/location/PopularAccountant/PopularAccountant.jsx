import { PopularAccountantData } from "../../../constant/Location";
import styles from "./PopularAccountant.module.css";

const PopularAccountant = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Popular <span className={styles.highlight}>Accountant?</span>
      </h2>
      <div className={styles.grid}>
        {PopularAccountantData.map((accountant) => (
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
                {accountant.description}...{" "}
                <span className={styles.readMore}>Read More</span>
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
        ))}
      </div>
    </div>
  );
};

export default PopularAccountant;
