import React, { useEffect } from "react"
import styles from "./LeadProfileView.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getLeadProfileRequestList } from "../../../../store/LeadSetting/leadSettingSlice"
import DummyImage from "../../../../assets/Images/DummyImage.svg";

function LeadProfileData () {
    const dispatch = useDispatch()
    const { requestId } = useParams()
    const { profileLeadViewData, autobidLoader } = useSelector((state) => state.leadSetting)
    const { userToken } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    
    
    // const webData = profileLeadViewData?.map(item => item?.service_name) || [];
    useEffect(()=>{
        const data = {
            user_id:userToken?.remember_tokens
        }
        dispatch(getLeadProfileRequestList(data))
    },[])
    return (
        <>
          <div className={styles.container}>
      <div className={styles.headerWrapper}>
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

      <div className={styles.filters}>
        <select>
          <option>All ratings</option>
        </select>
        <select>
          <option>All locations</option>
        </select>
        <select>
          <option>All response times</option>
        </select>
        {/* <span className={styles.matchCount}>12 matches</span> */}

        <select className={styles.sortDropdown}>
          <option>Sort by: best match</option>
        </select>
      </div>

      <div className={styles.recommendBar}>
        <span>Recommended:</span> Request replies from your{" "}
        <strong>top matches</strong> to hear back faster
      </div>
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
                      {profileLeadViewData.name}
                    </h3>
                    <p>
                      {/* <img src={AutoBidLocationIcon} alt="" /> */}
                      {profileLeadViewData.email}
                    </p>
                  </div>
                  <div className={styles.sidebar}>
                    <div className={styles.rating}>
                      {/* <span className={styles.stars}>★★★★★</span> */}
                      {/* <span className={styles.ratingCount}>125</span> */}
                    </div>
                  </div>
                </div>

                <div className={styles.badges}>
                  {/* <span>{profileLeadViewData.service_name}</span> */}
                </div>

                <p className={styles.description}>
                  This is a static description for demonstration purposes. It
                  showcases how each bid card might look like in real data.
                </p>

                <div className={styles.quickToRespondWrapper}>
                  <a href="#" className={styles.profileLink}>
                    View Profile →
                  </a>

                  <div className={styles.quickToRespond}>
                    {/* <img src={QuickToRespond} alt="" /> */}
                    Quick to respond
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