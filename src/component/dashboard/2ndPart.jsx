import styles from './cards.module.css';
import questionBlueIcon from '../../assets/Icons/questionBlueIcon.svg'
import phone from '../../assets/Icons/phoneIcon.svg'
import emailIcon1 from '../../assets/Icons/emailIcon1.svg'
//redeploy work
const DashboardCards = () => {
  return (
    
<div className={styles["dashboard-container"]}>
  {/* First Row */}
  <div className={styles.row}>
    <div className={`${styles.card} ${styles.leads}`}>
      <div className={styles["card-header"]}>
        <h3>Leads and Enquiries</h3>
        <span className={styles["view-link"]}>View</span>
      </div>

      <div className={styles["lead-circle"]}>
        <div className={styles["lead-number"]}>1065</div>
        <div className={styles["lead-label"]}>Leads</div>
      </div>

      <p className={styles.unread}>1058 Unread leads</p>
    </div>

    <div className={`${styles.card} ${styles["lead-settings"]}`}>
      <h3 className={styles["card-title"]}>Lead settings</h3>
      <div className={styles["sub-label"]}>Services <span className={styles["edit-link"]}>Edit</span></div>
      <div className={styles["highlight-box"]}>You’ll receive leads in these categories</div>
      <div className={styles.tags}>
        <span className={`${styles.tag} ${styles.blue}`}>Deep Cleaning Services</span>
        <span className={`${styles.tag} ${styles.yellow}`}>House Cleaning</span>
      </div>
      <div className={styles.tags2}>
        <span className={`${styles.tag2} ${styles.gray}`}>+2</span>
      </div>
    </div>

    <div className={`${styles.card} ${styles["add-services"]}`}>
      <h3>Add New Services</h3>
      <form>
        <label>
          <input type="checkbox" className={styles.checkbox} /> Lorem Ipsum has been the
        </label>
        <label>
          <input type="checkbox" className={styles.checkbox} /> Lorem Ipsum has been the
        </label>
        <label>
          <input type="checkbox" className={styles.checkbox} /> Lorem Ipsum has been the industry’s
        </label>
        <label>
          <input type="checkbox" className={styles.checkbox} /> Lorem Ipsum
        </label>
        <button type="submit">Apply</button>
      </form>
    </div>
  </div>

  {/* Notification Section */}
  <div className={styles["notification-section"]}>
    <div className={styles["notification-title"]}>
      Get started &nbsp;&nbsp;&nbsp;
      <button className={styles["notification-button"]}>20% OFF STARTER PACK OFFER</button>
    </div>

    <div className={styles["notification-banner"]}>
      <strong>Starter pack offer</strong> Respond to up to 10 customers <strong>20% OFF</strong> and a <strong>get hired guarantee</strong>.
    </div>
  </div>

  {/* Second Row */}
  <div className={styles.row}>
    <div className={`${styles.card} ${styles.profile}`}>
    <div className={styles["profile-header"]}>
      <div className={styles.avatar}>C</div>
      <span className={styles.profilename}>Chander</span>
      </div>

      <div className={styles.profileheadline}>
        Your profile is 27% complete <span className={styles["edit-link"]}>Edit</span>
      </div>
      <div className={styles["progress-bar"]}>
        <div className={styles.progress} style={{ width: "27%" }}></div>
      </div>
      <div className={styles["hint-box"]}>
        <div>Completing your profile is a great way to appeal to customers</div>
        <button>Edit Profile</button>
      </div>
    </div>

    <div className={`${styles.card} ${styles.responses}`}>
      <h3>Responses <span className={styles["view-link"]}>View</span></h3>
      <div className={styles["response-msg"]}>You haven’t responded to any leads yet.</div>
    </div>

    <div className={`${styles.card} ${styles.help}`}>
      <h3 className={styles["card-title"]}>
        <span className={styles.icon}><img src={questionBlueIcon} /></span> Help
      </h3>
      <div className={styles["help-box"]}>
        <p>
          Visit <span className={styles.link}>help centre</span> for tips & advice.
        </p>
        <p>
          <span className={styles.icon}><img src={emailIcon1} /></span> 0000000000
        </p>
        <p>
          <span className={styles.icon}><img src={phone} /></span> india@localist.com
        </p>
        <p>(open 24 hours a day, 7 days a week)</p>
      </div>
    </div>
  </div>
</div>

  );
};

export default DashboardCards;
