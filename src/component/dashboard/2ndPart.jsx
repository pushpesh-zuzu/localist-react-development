import React from "react";
import "./DashboardCards.css";

const DashboardCards = () => {
  return (
    <div className="dashboard-container">
      {/* First Row */}
      <div className="row">
        {/* <div className="card leads">
          <h3>Leads and Enquiries <span className="view-link">View</span></h3>
          <div className="lead-circle">1065<br /><span>Leads</span></div>
          <p className="unread">1058 Unread leads</p>
        </div> */}
        <div className="card leads">
  <div className="card-header">
    <h3>Leads and Enquiries</h3>
    <span className="view-link">View</span>
  </div>

  <div className="lead-circle">
    1065<br /><span>Leads</span>
  </div>
  <p className="unread">1058 Unread leads</p>
</div>


        <div className="card lead-settings">
          <h3 className="card-title">Lead settings </h3>
          <div className="sub-label">Services <span className="edit-link">Edit</span></div>
          <div className="highlight-box">You’ll receive leads in these categories</div>
          <div className="tags">
            <span className="tag blue">Deep Cleaning Services</span>
            <span className="tag yellow">House Cleaning</span>
         
          </div>
          <div className="tags2">
          <span className="tag2 gray">+2</span>
          </div>
        </div>

        <div className="card add-services">
          <h3>Add New Services</h3>
          <form>
            <label><input type="checkbox" /> Lorem Ipsum has been the industry’s</label>
            <label><input type="checkbox" /> Lorem Ipsum has been the</label>
            <label><input type="checkbox" /> Lorem Ipsum has been the industry’s</label>
            <label><input type="checkbox" /> Lorem Ipsum</label>
            <button type="submit">Apply</button>
          </form>
        </div>
      </div>

      {/* Notification Section */}
      <div className="notification-section">
        <div className="notification-title">Get started &nbsp;
        &nbsp;
        &nbsp;
        <button className="notification-button">20% OFFSTARTER PACK OFFER</button>
        </div>
        
        <div className="notification-banner">
          <strong>Starter pack offer</strong> Respond to up to 10 customers <strong>20% OFF</strong> and a <strong>get hired guarantee</strong>.
        </div>
      </div>

      {/* Second Row */}
      <div className="row">
        <div className="card profile">
          <div className="avatar">C</div>
          <h3>Chander</h3>
          <p>Your profile is 27% complete <span className="edit-link">Edit</span></p>
          <div className="progress-bar">
            <div className="progress" style={{ width: "27%" }}></div>
          </div>
          <div className="hint-box">
            <p>Completing your profile is a great way to appeal to customers</p>
            <button>Edit Profile</button>
          </div>
        </div>

        <div className="card responses">
          <h3>Responses <span className="view-link">View</span></h3>
          <div className="response-msg">You haven’t responded to any leads yet.</div>
        </div>

        <div className="card help">
  <h3 className="card-title">
    <span className="icon">❓</span> Help
  </h3>
  <div className="help-box">
    <p>
      Visit <span className="link">help centre</span> for tips & advice.
    </p>
    <p>
      <span className="icon">📧</span> 0000000000
    </p>
    <p>
      <span className="icon">🔗</span> india@localist.com
    </p>
    <p>(open 24 hours a day, 7 days a week)</p>
  </div>
</div>

      </div>
    </div>
  );
};

export default DashboardCards;
