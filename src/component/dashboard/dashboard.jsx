import styles from './dashboard.module.css';
import DashboardCards from './2ndPart';
import polygon from '../../assets/Icons/Polygon.png'
import PolygonArrowDown from '../../assets/Icons/PolygonArrowDown.png'
import playbtn from '../../assets/Icons/playbtn.png'
import question from '../../assets/Icons/question.svg'
import emailIcon1 from '../../assets/Icons/emailIcon1.svg'
import phone from '../../assets/Icons/phoneIcon.svg'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getDashboardListData } from '../../store/Dashboard/dashboardSlice';
//PolygonArrowDown
const Dashboard = () => {
  const dispatch = useDispatch()
  const { dashboardData } = useSelector((state) => state.dashboard)
  const [showDashboardContent, setShowDashboardContent] = useState(false)
  
  useEffect(()=>{
dispatch(getDashboardListData())
  },[])
  return (
    <div>
<div className={styles["dashboard-wrapper"]}>
  <header className={styles["dashboard-header"]}>
    <div className={styles.greeting}>Good afternoon, chander!</div>
    <div className={styles.date}>Friday, 7 Mar 2:05pm</div>
  </header>

  <div className={styles.hiddenDiv} style={{ visibility: 'hidden', backgroundColor: '#F9F9F9' }}>hhh</div>

  <div className={styles["dashboard-content-parent"]}>
    <div   className={`${styles["dashboard-content"]} ${
    showDashboardContent ? styles.show : styles.hide
  }`}
>
      <div className={styles["dashboard-title"]}>
        <p>
        Your dashboard is ready. Access everything you need to manage your business and grow with Localists.
        </p>
        <div ><span><img src={polygon} onClick={() => setShowDashboardContent(!showDashboardContent)} /></span></div>
      </div>

      <div className={styles["main-section"]}>
        <div className={styles["left-column"]}>
          <h3 className={styles["section-title"]}>Welcome to Localists.com</h3>
          <h5 className={styles["section-sub-title"]}>We’re here to help you grow your business and connect with more local customers.</h5>
          <ul className={styles["steps-list"]}>
            <li><strong>1</strong> Customers tell us what they need <p>Local customers share the services they're looking for by answering key questions relating to the service.</p></li>
            <hr className={styles.breaker} />
            <li><strong>2</strong> Localists.com finds the right leads for you <p>We match your business with leads that fit your services and location, delivered instantly to your inbox and dashboard.</p></li>
            <hr className={styles.breaker} />
            <li><strong>3</strong> You review and select your leads <p> See full customer details straight away and choose the opportunities that work best for your business.</p></li>
            <hr className={styles.breaker} />
            <li><strong>4</strong> You connect with the customer directly <p>Reach out by phone or email to introduce your services and secure new business.</p></li>
            <hr className={styles.breaker} />
            <li><strong>5</strong> You win new work — no hassle,<p>no hidden fees No hidden costs or long term commitment. There are no commissions or extra costs — just a clear, simple way to grow your business through Localists.com.</p></li>
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
            <h4>How much do <a href='#' className={styles.textColor}>Localists.com</a> charge for leads?</h4>
            <p>Getting leads on <a href='#' className={styles.textColor}>Localists.com</a> is completely free — you only pay when you choose to contact a customer you're interested in. All our leads are priced in credits, depending on the sector, location and the specific requirements of the job.</p>
            <p>We offer all new local professionals a special offer that boosts your credit purchase by 20%. Our Credit Boost Pack gives you more opportunities to contact leads and win more jobs.</p>
            {/* <p>We’re so confident you’ll get hired at least once from this pack, that if you don’t we’ll give you all your credits back.</p> */}
          </div>

          <div className={styles["help-box"]}>
            <h4><img src={question} /> Need Assistance?</h4>
            <p>We’re here to help you get the most out of Localists.com. Explore plenty of tips, guides, and resources in our <a href='/help-center' className={styles.textColor}>Help Center</a> .</p>
            <p>Our dedicated customer success team is also available 24/7 to support you whenever you need assistance.</p>

            <div className={styles["contact-info"]}>
              <div>
                <span><img src={emailIcon1} /> &nbsp;  assistance@localists.com </span>
                {/* <span><img src={phone} /> &nbsp; 0000000000 </span> */}
              </div>
              <div>(Available 24 hours a day, 7 days a week)</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer className={styles["dashboard-footer"]}>
      No commissions, no hidden fees—just a straight forward process.
    </footer>

    <div className={styles.hideIcon}  onClick={() => setShowDashboardContent(!showDashboardContent)}>
      <span>{showDashboardContent ?"Hide":"Show"}</span>
      <img src={PolygonArrowDown} />
    </div>
  </div>
</div>

    <DashboardCards data={dashboardData}/>
    </div>
  );
};
export default Dashboard;


