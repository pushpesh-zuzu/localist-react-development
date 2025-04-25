import React, { useEffect } from "react"
import styles from "./LeadProfileView.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getLeadProfileRequestList } from "../../../../store/LeadSetting/leadSettingSlice"
import DummyImage from "../../../../assets/Images/DummyImage.svg";
import { BASE_IMAGE_URL } from "../../../../utils"

function LeadProfileData () {
    const dispatch = useDispatch()
    const { profileId } = useParams()
    const { profileLeadViewData, autobidLoader } = useSelector((state) => state.leadSetting)
    const { userToken } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const handleBack = () => {
      navigate("/leads")
    }
    console.log(profileId,"profileId")
    // const webData = profileLeadViewData?.map(item => item?.service_name) || [];
    useEffect(()=>{
        const data = {
            customer_id:profileId
        }
        dispatch(getLeadProfileRequestList(data))
    },[])
    return (
        <>
          <div className={styles.container}>
            
      <div className={styles.headerWrapper}>
        <button className={styles.backBtn} onClick={handleBack}>Back</button>
        <div className={styles.headingTabsWrapper}>
          <h1 className={styles.heading}>
           
          </h1>
          {/* <div className={styles.tabs}>
            <button className={styles.activeTab} onClick={handleBack}>Your matches</button>
            <button className={styles.tab}>Replies</button>
          </div> */}
        </div>
        {/* <div className={styles.backBtnWrapper}>
          <button className={styles.backBtn} onClick={handleBack}>Back</button>
        </div> */}
      </div>

      {/* <div className={styles.filters}>
        <select>
          <option>All ratings</option>
        </select>
        <select>
          <option>All locations</option>
        </select>
        <select>
          <option>All response times</option>
        </select>
       

        <select className={styles.sortDropdown}>
          <option>Sort by: best match</option>
        </select>
      </div> */}
{/* 
      <div className={styles.recommendBar}>
        <span>Recommended:</span> Request replies from your{" "}
        <strong>top matches</strong> to hear back faster
      </div> */}
      {autobidLoader ? <Spin style={{ color: "blue", display: "flex", justifyContent: "center" }} /> : <>
        {/* {profileLeadViewData?.map((item) => ( */}
          <div className={styles.card} key={profileLeadViewData.id}>
            <div className={styles.cardLeft}>
              <div className={styles.imageWrapper}>
                <img
                  // src={item.profile_image ? item.profile_image : DummyImage}
                  src={
                    profileLeadViewData?.profile_image
                      ? `${BASE_IMAGE_URL}${profileLeadViewData?.profile_image}`
                      : DummyImage
                  }
                  alt="Profile"
                  className={styles.image}
                />
              </div>
              <div className={styles.details}>
                <div className={styles.header}>
                  <div>
                    <h3>
                      {/* <img src={GreenTickIcon} alt="" /> */}
                      {profileLeadViewData?.leads?.category?.name}
                    </h3>
                    <p>
                      {/* <img src={AutoBidLocationIcon} alt="" /> */}
                      {profileLeadViewData.email}
                    </p>
                    <p>
                      {profileLeadViewData?.phone}
                    </p>
                  </div>
                  <div className={styles.sidebar}>
                    <div className={styles.credits}>
                      {/* <span className={styles.stars}>★★★★★</span> */}
                      {/* <span className={styles.ratingCount}>125</span> */}
                      {profileLeadViewData?.leads?.credit_score} Credits
                    </div>
                  </div>
                </div>

                <div className={styles.badges}>
                  {/* <span>{profileLeadViewData.service_name}</span> */}
                </div>

                {profileLeadViewData && profileLeadViewData.leads && profileLeadViewData.leads.questions ? (
  <div className="space-y-4">
    {(() => {
      try {
        const questionsData = JSON.parse(profileLeadViewData.leads.questions);
        return questionsData.map((item, index) => (
          <div key={index} className="mb-4">
            <p className={styles.viewQuestion}>{item.ques}</p>
            <p className={styles.viewQuestion}>{item.ans}</p>
          </div>
        ));
      } catch (error) {
        console.error("Error parsing questions data:", error);
        return <div>Error displaying questions</div>;
      }
    })()}
  </div>
) : (
  <div>No questions data available</div>
)}

                <div className={styles.quickToRespondWrapper}>
                  <a href="#" className={styles.profileLink}>
                    {/* View Profile → */}
                  </a>

                  <div className={styles.quickToRespond}>
                  Contact
                    
                  </div>
                </div>
              </div>

              {/* <div className={styles.replyBtnWrapper}>
              <button className={styles.replyBtn}>Request reply</button>
            </div> */}
            </div>
          </div>
        {/* )) */}
        {/* } */}
      </>}
    </div>
        </>
    )
}

export default LeadProfileData