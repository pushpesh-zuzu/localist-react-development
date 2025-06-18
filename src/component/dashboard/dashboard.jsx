import React from 'react';
import './Dashboard.css';
import DashboardCards from './2ndPart';

const Dashboard = () => {
  return (
    <>
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="greeting">Good afternoon, chander!</div>
        <div className="date">Friday, 7 Mar 2:05pm</div>
      </header>

      <div className="dashboard-content">
        <h2 className="dashboard-title">
          Welcome to your personalised dashboard <span>You can manage everything on your account</span>
        </h2>

        <div className="main-section">
          <div className="left-column">
            <h3 className="section-title">Here including account settings and preferences</h3>
            <h5 className="section-sub-title">We will have the options as per below:</h5>
            <ul className="steps-list">
              <li><strong>1</strong> Customers share their needs <p>Customers answer a few key questions to outline their requirements.</p></li>
              <hr style={{ borderTop: '1px dotted #000' ,marginRight:'10%' }} />
              <li><strong>2</strong> We send you relevant leads <p>You instantly receive leads that match your preferences via email and app.</p></li>
              <hr style={{ borderTop: '1px dotted #000' ,marginRight:'10%' }} />
              <li><strong>3</strong> You select the leads you want <p>Access customer contact details immediately.</p></li>
              <hr style={{ borderTop: '1px dotted #000' ,marginRight:'10%' }} />
              <li><strong>4</strong> You reach out to the customer <p>Call or email the customer to offer your services.</p></li>
              <hr style={{ borderTop: '1px dotted #000' ,marginRight:'10%' }} />
              <li><strong>5</strong> You get hired <p>No commissions, no hidden fees—just a straightforward process.</p></li>
              <hr style={{ borderTop: '1px dotted #000' ,marginRight:'10%' }} />
            </ul>
            
          </div>
        

          <div className="right-column">
            {/* <div className="video-box">
              <div className="play-button"></div>
            </div> */}
            <div className="video-box">
  <div className="play-button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  </div>
</div>

            <a className="view-leads-blue" href="#">View 76 Live Leads Now - Start winning jobs now*</a>
            <button className="view-leads-black">View 1061 live leads</button>

            <div className="info-box">
              <h4>How much does Localist cost?</h4>
              <p>
                It’s free to receive leads and you only pay to contact those you like.
                Leads are priced in credits, based on the value of the job.
              </p>
              <p>
                We offer a discounted starter pack with enough credits for about 10 responses,
                backed by our Get Hired Guarantee.
              </p>
              <p>
                We’re so confident you’ll get hired at least once from this pack,
                that if you don’t we’ll give you all your credits back.
              </p>
            </div>

            <div className="help-box">
              <h4>❓&nbsp; Need Help?</h4>
              <p>You can find lots of tips and tricks for getting the most out of Localist in our help centre.</p>
              <p>
                We also have an award-winning customer success team dedicated to helping you.
              </p>
              <p className="contact-info">
              <p>  📞 0000000000 &nbsp; &nbsp; 
              📧 india@localist.com </p>
               
               <span > (open 24 hours a day, 7 days a week)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="dashboard-footer">
        No commissions, no hidden fees—just a straightforward process.
      </footer>
    </div>







    <DashboardCards/>
    </>
  );
};

export default Dashboard;


