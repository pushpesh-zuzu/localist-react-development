import styles from "./ourteams.module.css";
import teamMember from "../../../assets/Images/teamsMember.svg";
import teamMemberPhone from "../../../assets/Images/teamsMemberPhone.svg";
import quotes from "../../../assets/Images/quote.svg";
import rating from "../../../assets/Images/ratings.svg";
import dotSlider from "../../../assets/Images/dotSlider.svg";

const OurTeams = () => {
  return (
    <div className={styles.teamsContainer}>
      <div className={styles.teamsLeftCotainer}>
        <div className={styles.quotes}>
          <img src={quotes} alt="quotes" />
        </div>
        <div className={styles.rating}>
          <img src={rating} alt="rating" />
        </div>

        <div className={styles.info}>
          <p>
            Within 10 minutes of making my enquiry, I had contact from 2
            interested companies ready to assist me.
          </p>
          <strong>Meera</strong>
        </div>

        <div className={styles.dotSlider}>
          <img src={dotSlider} alt="dotSlider" />
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
