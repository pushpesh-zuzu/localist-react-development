import React, { useState, useEffect } from "react";
import styles from "./ourteams.module.css";
import teamMember from "../../../assets/Images/teamsMember.svg";
import teamMemberPhone from "../../../assets/Images/teamsMemberPhone.svg";
import quotes from "../../../assets/Images/quote.svg";
import rating from "../../../assets/Images/ratings.svg";
import dotSlider from "../../../assets/Images/dotSlider.svg";

const OurTeams = () => {
  // Static testimonial data
  const testimonials = [
    {
      text: "Within 10 minutes of making my enquiry, I had contact from 2 interested companies ready to assist me.",
      name: "Meera",
      rating: 1,
    },
    {
      text: "Excellent service and quick response. The team was very professional and helped me find exactly what I was looking for.",
      name: "Rajesh",
      rating: 1,
    },
    {
      text: "Amazing experience! The platform connected me with reliable vendors in no time. Highly recommended for anyone looking for quality services.",
      name: "Priya",
      rating: 1,
    },
    {
      text: "Outstanding support and seamless process. I got multiple quotes within minutes and found the perfect match for my requirements.",
      name: "Amit",
      rating: 1,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Manual dot navigation
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.teamsContainer}>
      <div className={styles.teamsLeftCotainer}>
        <div className={styles.quotes}>
          <img src={quotes} alt="quotes" />
        </div>

        {[...Array(testimonials[currentIndex].rating)].map((_, index) => (
          <div className={styles.rating} key={index}>
            <img src={rating} alt="rating" />
          </div>
        ))}

        <div className={styles.info}>
          <p>{testimonials[currentIndex].text}</p>
          <strong>{testimonials[currentIndex].name}</strong>
        </div>

        <div className={styles.dotSlider}>
          
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer !important",
                  backgroundColor: index === currentIndex ? "#00AFE3" : "#ccc",
                  transition: "background-color 0.3s ease",
                  outline: "none",
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
        </div>
      </div>

      <div className={styles.teamsRightCotainer}>
        <img
          src={teamMember}
          alt="team members"
          className={styles.teamMemberPic}
        />
        <img
          src={teamMemberPhone}
          alt="teamMemberPhone"
          className={styles.teamMemberPhone}
        />
      </div>
    </div>
  );
};

export default OurTeams;
