import styles from './dashboard.module.css';
import DashboardCards from './2ndPart';
import polygon from '../../assets/Icons/Polygon.png'
import PolygonArrowDown from '../../assets/Icons/PolygonArrowDown.png'
import playbtn from '../../assets/Icons/playbtn.png'
import question from '../../assets/Icons/question.svg'
import emailIcon1 from '../../assets/Icons/emailIcon1.svg'
import phone from '../../assets/Icons/phoneIcon.svg'
//PolygonArrowDown
const Dashboard = () => {
  return (
    <div>
<div className={styles["dashboard-wrapper"]}>
  <header className={styles["dashboard-header"]}>
    <div className={styles.greeting}>Good afternoon, chander!</div>
    <div className={styles.date}>Friday, 7 Mar 2:05pm</div>
  </header>

  <div className={styles.hiddenDiv} style={{ visibility: 'hidden', backgroundColor: '#F9F9F9' }}>hhh</div>

  <div className={styles["dashboard-content-parent"]}>
    <div className={styles["dashboard-content"]}>
      <div className={styles["dashboard-title"]}>
        <p>
          Welcome to your personalised dashboard <span>You can manage everything on your account</span>
        </p>
        <div><span><img src={polygon} /></span></div>
      </div>

      <div className={styles["main-section"]}>
        <div className={styles["left-column"]}>
          <h3 className={styles["section-title"]}>Here including account settings and preferences</h3>
          <h5 className={styles["section-sub-title"]}>We will have the options as per below:</h5>
          <ul className={styles["steps-list"]}>
            <li><strong>1</strong> Customers share their needs <p>Customers answer a few key questions to outline their requirements.</p></li>
            <hr className={styles.breaker} />
            <li><strong>2</strong> We send you relevant leads <p>You instantly receive leads that match your preferences via email and app.</p></li>
            <hr className={styles.breaker} />
            <li><strong>3</strong> You select the leads you want <p>Access customer contact details immediately.</p></li>
            <hr className={styles.breaker} />
            <li><strong>4</strong> You reach out to the customer <p>Call or email the customer to offer your services.</p></li>
            <hr className={styles.breaker} />
            <li><strong>5</strong> You get hired <p>No commissions, no hidden fees—just a straightforward process.</p></li>
            <hr className={styles.breaker} />
          </ul>
        </div>

        <div className={styles["right-column"]}>
          <div className={styles["video-box"]}>
            <div className={styles["play-button"]}>
              <img src={playbtn} />
            </div>
          </div>

          <a className={styles["view-leads-blue"]} href="#">View 76 Live Leads Now - Start winning jobs now*</a>
          <button className={styles["view-leads-black"]}>View 1061 live leads</button>

          <div className={styles["info-box"]}>
            <h4>How much does Localist cost?</h4>
            <p>It’s free to receive leads and you only pay to contact those you like. Leads are priced in credits, based on the value of the job.</p>
            <p>We offer a discounted starter pack with enough credits for about 10 responses, backed by our Get Hired Guarantee.</p>
            <p>We’re so confident you’ll get hired at least once from this pack, that if you don’t we’ll give you all your credits back.</p>
          </div>

          <div className={styles["help-box"]}>
            <h4><img src={question} /> Need Help?</h4>
            <p>You can find lots of tips and tricks for getting the most out of Localist in our help centre.</p>
            <p>We also have an award-winning customer success team dedicated to helping you.</p>

            <div className={styles["contact-info"]}>
              <div>
                <span><img src={emailIcon1} /> &nbsp; 0000000000 </span>
                <span><img src={phone} /> &nbsp; india@localist.com</span>
              </div>
              <div>(open 24 hours a day, 7 days a week)</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer className={styles["dashboard-footer"]}>
      No commissions, no hidden fees—just a straightforward process.
    </footer>

    <div className={styles.hideIcon}>
      <span>Hide</span>
      <img src={PolygonArrowDown} />
    </div>
  </div>
</div>

    <DashboardCards/>
    </div>
  );
};
export default Dashboard;


