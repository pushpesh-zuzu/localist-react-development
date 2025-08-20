import React from "react";
import styles from "./howitwork.module.css";
import howitworkdigitalmanseller from "../../assets/Images/HowItWorks/howitworkdigitalmanseller.jpg";
import howitworkwommenseller from "../../assets/Images/HowItWorks/howitworkwommenseller.jpg";
import howitworkyouprofessionseller from "../../assets/Images/HowItWorks/howitworkyouprofessionseller.jpg";
import smileyman from "../../assets/Images/HowItWorks/smileyman.jpg";
import plumber from "../../assets/Images/HowItWorks/plumber.jpg";


const data = [
  {
    id: 1,
    title: "Customers Come to Localists with Their Needs",
    paragraphs: [
      "We help people find the right professional for almost any service — whether for individuals, households, or small businesses.",
      "When customers post a request, we collect detailed information about exactly what they’re looking for, so you get high-quality leads that match your skills.",
      "Savvy customers use Localists instead of spending hours searching online. They know we’ll connect them with relevant, verified, and professional businesses that can deliver results.",
    ],
    images: [howitworkyouprofessionseller],
  },
  {
    id: 2,
    title: "Customers Find You on Localists",
    paragraphs: [
      `Once a customer’s request matches your services, they’ll see your profile and can contact you directly.
       We also send you all relevant leads so you never miss an opportunity.`,
      `You’ll pay a small fee for each introduction, and in return, you’ll receive the customer’s phone number and email so you can reach out right away.
`,
    ],
    images: [howitworkdigitalmanseller],
  },
  {
    id: 3,
    title: "Grow Your Business – Fast",
    paragraphs: [
      "We take the stress out of marketing your services.",
      "With Localists, you’ll receive hot, real-time leads as soon as they’re posted. Join a professional today and get instant access to opportunities in your area.",
    ],
    images: [howitworkwommenseller],
  },
  {
    id: 4,
    title: " Why Join Localists?",
    paragraphs: ["When you join Localists as a professional, you’ll get:"],
    list: [
      "A high-visibility online profile to boost your presence and showcase your work.",
      "Instant access to quality leads that match your services.",
      "Support from our award-winning customer success team via email and phone, guiding you every step of the way.",
    ],
    images: [plumber,smileyman],
  },
];

const HowItWorksDetail = () => {
  return (
    <div className={styles.stepsContainer}>
      {data.map((step, index) => (
        <div key={step.id} className={styles.stepWrapper}>
          {index % 2 === 0 ? (
            <>
              <div className={styles.imageContainer}>
                {step.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`${step.title} - Image ${imgIndex + 1}`}
                    className={styles.stepImage}
                  />
                ))}
                {/* {index === 0 && (
                  <div className={styles.popover}>Enter Your Requirements</div>
                )} */}
              </div>
              <div className={styles.textContainer}>
                <div className={styles.titleContainer}>
                  <h2 className={styles.stepTitle}>{step.title}</h2>
                </div>
                <div className={styles.paragraphsContainer}>
                  {step.paragraphs.map((paragraph, paraIndex) => (
                    <p key={paraIndex} className={styles.stepParagraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.textContainer}>
                <div className={styles.titleContainer}>
                  <h2 className={styles.stepTitle}>{step.title}</h2>
                </div>
                <div className={styles.paragraphsContainer}>
                  {step.paragraphs.map((paragraph, paraIndex) => (
                    <p key={paraIndex} className={styles.stepParagraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                  {step?.list?.map((listitem,index) => (
                    <ul key={index}>
                      <li>{listitem}</li>
                    </ul>
                  ))}
              </div>
              <div className={`${styles.imageContainer}`}>
                {step.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`${step.title} - Image ${imgIndex + 1}`}
                   className={`${styles.stepImage} ${imgIndex === 1 ? styles.singleImageDisplayed : ""}`}
                    style={{marginTop:imgIndex ===1?'30px':''}}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default HowItWorksDetail;
