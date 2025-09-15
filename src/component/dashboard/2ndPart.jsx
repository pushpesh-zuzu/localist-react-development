import styles from "./cards.module.css";
import questionBlueIcon from "../../assets/Icons/questionBlueIcon.svg";
import phone from "../../assets/Icons/phoneIcon.svg";
import emailIcon1 from "../../assets/Icons/emailIcon1.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserGeo } from "../../utils/geo";
import { useSelector } from "react-redux";
//redeploy work
const DashboardCards = ({ data }) => {
  const navigate = useNavigate();
  const { country, lang } = useUserGeo();
  const { starterPackPurchased } = useSelector((state) => state.myCredit);

  return (
    <div className={styles["dashboard-container"]}>
      {/* First Row */}
      <div className={styles.row}>
        <div className={`${styles.card} ${styles.leads} ${styles.oddCardBg}`}>
          <div className={styles["card-header"]}>
            <h3>Leads and Enquiries</h3>
            {/* <span className={styles["view-link"]} onClick={() => navigate("/sellers/leads")}>View</span> */}
            <a
              href="/sellers/leads"
              style={{ color: "black" }}
              className={styles["view-link"]}
              onClick={(e) => {
                // handle only normal left click
                if (
                  e.button === 0 && // left click
                  !e.metaKey &&
                  !e.ctrlKey &&
                  !e.shiftKey &&
                  !e.altKey
                ) {
                  e.preventDefault();
                  navigate("/sellers/leads");
                }
              }}
            >
              View
            </a>
          </div>

          <div className={styles["lead-circle"]}>
            <div className={styles["lead-number"]}>
              {data?.leads?.total_leads_count}
            </div>
            <div className={styles["lead-label"]}>Leads</div>
          </div>

          <p className={styles.unread}>
            {data?.leads?.unread_leads_count} Unread leads
          </p>
        </div>

        <div className={`${styles.card} ${styles["lead-settings"]}`}>
          <h3 className={styles["card-title"]}>Lead settings</h3>
          <div className={styles["sub-label"]}>
            Services{" "}
            <Link
              className={styles["edit-link"]}
              to="/settings/leads/my-services"
            >
              Edit
            </Link>
          </div>
          <div className={styles["highlight-box"]}>
            You’ll receive leads in these categories
          </div>
          <div className={styles.tagsContainer}>
            {(data?.services || []).slice(0, 2).map((item, index) => (
              <div key={index} className={styles.tags}>
                <span className={`${styles.tag} ${styles.blue}`}>
                  {item?.name}
                </span>
              </div>
            ))}

            {data?.services?.length > 2 && (
              <div
                className={styles.tags2}
                title={data?.services.map((list) => list.name)}
              >
                <span className={`${styles.tag2} ${styles.gray}`}>
                  +{data.services.length - 2}
                </span>
              </div>
            )}
          </div>
        </div>

        <div
          className={`${styles.card} ${styles["add-services"]} ${styles.oddCardBg}`}
        >
          <h3>Account Details</h3>
          {/* <form>
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
      </form> */}
          <div className={styles["creditText"]}>
            Credit : <span>{data?.account_details?.credits}</span>
          </div>
          <div className={styles["planTypeText"]}>
            {" "}
            Plan Type : <span>{data?.account_details?.plan_type}</span>
          </div>
        </div>
      </div>

      {/* Notification Section */}
      <div className={`${styles["notification-section"]}`}>
        {/* <div className={styles["notification-title"]}>
     Start Winning Jobs Today : &nbsp;&nbsp;&nbsp;
      <button className={styles["notification-button"]}  style={{ pointerEvents: "none", opacity: 1 }} disabled >{data?.plans?.[0]?.description} Patio Service</button>
    </div> */}

        <div
          className={styles["notification-banner"]}
          onClick={() => navigate("/settings/billing/my-credits")}
          style={{ cursor: "pointer" }}
        >
          {starterPackPurchased
            ? `Take advantage NOW and get a free 20% credit boost as a new user.`
            : `Buy your next credit pack and win more jobs today!`}
        </div>
      </div>

      {/* Second Row */}
      <div className={styles.row}>
        <div className={`${styles.card} ${styles.profile} ${styles.oddCardBg}`}>
          <div className={styles["profile-header"]}>
            <div className={styles.avatar}>C</div>
            <span className={styles.profilename}>
              {data?.profile_info?.name}
            </span>
          </div>

          <div className={styles.profileheadline}>
            Your profile is {data?.profile_info?.percentage_completed}% complete{" "}
            <Link
              to="/settings/profile/my-profile"
              className={styles["edit-link"]}
            >
              Edit
            </Link>
          </div>
          <div className={styles["progress-bar"]}>
            <div
              className={styles.progress}
              style={{
                width: `${data?.profile_info?.percentage_completed || 0}%`,
              }}
            ></div>
          </div>
          <div className={styles["hint-box"]}>
            <div>
              Completing your profile is a great way to appeal to customers
            </div>
            <Link
              className={styles.hintButton}
              to="/settings/profile/my-profile"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        <div className={`${styles.card} ${styles.responses} `}>
          <h3>
            Responses{" "}
            <a
              href="/sellers/leads/my-responses"
              style={{ color: "black" }}
              className={styles["view-link"]}
              onClick={(e) => {
                // handle only normal left click
                if (
                  e.button === 0 && // left click
                  !e.metaKey &&
                  !e.ctrlKey &&
                  !e.shiftKey &&
                  !e.altKey
                ) {
                  e.preventDefault();
                  navigate("/sellers/leads/my-responses");
                }
              }}
            >
              View
            </a>
          </h3>
          {/* <div className={styles["response-msg"]}>You haven’t responded to any leads yet.</div> */}
          <div className={styles["response"]}>
            {data?.response?.response_count}
          </div>
        </div>

        <div className={`${styles.card} ${styles.help} ${styles.oddCardBg}`}>
          <h3 className={styles["card-title"]}>
            <span className={styles.icon}>
              <img src={questionBlueIcon} />
            </span>{" "}
            Help
          </h3>
          <div className={styles["help-box"]}>
            <p>
              Visit
              <a
                href={`/${lang}/${country}/contact-us`}
                style={{ color: "black" }}
                className={styles["view-link"]}
                onClick={(e) => {
                  // handle only normal left click
                  if (
                    e.button === 0 && // left click
                    !e.metaKey &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    !e.altKey
                  ) {
                    e.preventDefault();
                    navigate(`/${lang}/${country}/contact-us`);
                  }
                }}
              >
                help center
              </a>
              for tips & advice.
            </p>
            {/* <p>
              <span className={styles.icon}>
                <img src={emailIcon1} />
              </span>{" "}
              0000000000
            </p> */}
            <p>
              <span className={styles.icon}>
                <img src={phone} />
              </span>{" "}
              contact@localists.com
            </p>
            {/* <p>(open 24 hours a day, 7 days a week)</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
