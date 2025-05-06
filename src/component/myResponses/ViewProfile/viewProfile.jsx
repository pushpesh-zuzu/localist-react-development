import React, { useEffect, useState } from "react"
import { BASE_IMAGE_URL, showToast } from "../../../utils";
import styles from "./viewProfile.module.css"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DummyImage from "../../../assets/Images/DummyImage.svg";
import { getAddHiredLeadDataApi, getBuyerActivitiesApi, getLeadProfileRequestList, sellerResponseStatusApi } from "../../../store/LeadSetting/leadSettingSlice";
import moment from "moment"

const ViewProfile = () => {
    const navigate = useNavigate()
    const profileId = useParams()
    const dispatch = useDispatch()
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search)
    const id = queryParams.get("id")
    const { profileLeadViewData, autobidLoader, getActivies } = useSelector((state) => state.leadSetting)
    const { userToken } = useSelector((state) => state.auth);
    const { registerData } = useSelector((state) => state.findJobs);
    const [status, setStatus] = useState("pending")
    const [activeTab, setActiveTab] = useState("tab1")
    const user = {
        phoneNumber: "918123456789",
        email: "test@example.com"
      };
      
    const handleBack = () => {
        navigate("/lead/save-later")
    }
    console.log(id, profileLeadViewData?.leads?.status, "profileId")
    useEffect(() => {
        const data = {
            customer_id: profileId?.profileId,
            lead_id: id
        }
        dispatch(getLeadProfileRequestList(data))
    }, [])
    useEffect(() => {
        const activityData = {
            buyer_id: profileId?.profileId,
            user_id: userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens
        }
        dispatch(getBuyerActivitiesApi(activityData))
    }, [])
    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value.toLowerCase(); // ensure lowercase
        setStatus(selectedStatus);

        const addHiredData = {
            lead_id: profileLeadViewData?.leads?.id,
            status_type: selectedStatus,
            user_id: userToken?.remember_tokens,
        };

        if (addHiredData.lead_id) {
            dispatch(getAddHiredLeadDataApi(addHiredData)).then((result) => {
                if (result) {
                    showToast("success", result?.message)
                }
            });
        }
    };

    const handleResponseChange = (clickName) => {
        const responseStatus = {
            lead_id: profileLeadViewData?.leads?.id,
            seller_id: userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens,
            buyer_id: profileLeadViewData?.id,
            // status: "clicked",
            clicked_name:1
        };
        if (clickName === "call") {
            responseStatus.is_clicked_mobile = "call";
        } else if (clickName === "whatsapp") {
            responseStatus.is_clicked_whatsapp = "whatsapp";
        } else if (clickName === "email") {
            responseStatus.is_clicked_email = "email";
        }
    
        dispatch(sellerResponseStatusApi(responseStatus)).then((result) => {
            if (result) {
                showToast("success", result?.message);
            }
        });
    };
    
    return (
        <>
            <>
                <div className={styles.container}>

                    <div className={styles.headerWrapper}>
                        <div className={styles.mainSlectBox}>
                            <button className={styles.backBtn} onClick={handleBack}>Back</button>
                            {/* <div>
                                <span className={styles.currentStatusText}>Current Status</span>
                                <select className={styles.selectBox} value={status} onChange={handleStatusChange}>
                                    <option value="pending">Pending</option>
                                    <option value="hired">Hired</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div> */}
                            <div>
                                <span className={styles.currentStatusText}>Current Status</span>
                                <select
                                    className={styles.selectBox}
                                    value={profileLeadViewData?.leads?.status || status}
                                    onChange={handleStatusChange}
                                    disabled={profileLeadViewData?.leads?.status === "hired"}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="hired">Hired</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.headingTabsWrapper}>
                            <h1 className={styles.heading}>

                            </h1>

                        </div>

                    </div>

                    {autobidLoader ? <Spin style={{ color: "blue", display: "flex", justifyContent: "center" }} /> : <>
                        {/* {profileLeadViewData?.map((item) => ( */}
                        <div className={styles.card} key={profileLeadViewData?.id}>
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
                                                {profileLeadViewData?.email}
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

                                    {profileLeadViewData && profileLeadViewData?.leads && profileLeadViewData?.leads?.questions ? (
                                        <div className="space-y-4">
                                            {(() => {
                                                try {
                                                    const questionsData = JSON.parse(profileLeadViewData?.leads?.questions);
                                                    return questionsData?.map((item, index) => (
                                                        <div key={index} className="mb-4">
                                                            <p className={styles.viewQuestion}>{item?.ques}</p>
                                                            <p className={styles.viewQuestion}>{item?.ans}</p>
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


                            </div>
                        </div>
                        <div className={styles.btnBox}>
  <button
    className={styles.showNumberBtn}
    onClick={() => {
      handleResponseChange("call");
      window.location.href = `tel:${user.phoneNumber}`;
    }}
  >
    Show Number
  </button>

  <button
    className={styles.showNumberBtn}
    onClick={() => {
      handleResponseChange("whatsapp");
      window.open(`https://wa.me/${user.phoneNumber}`, "_blank");
    }}
  >
    Send WhatsApp
  </button>

  <button
    className={styles.showNumberBtn}
    onClick={() => {
      handleResponseChange("email");
      window.location.href = `mailto:${user.email}`;
    }}
  >
    Send Mail
  </button>
</div>


<div className={styles.customTabs}>
    <button
        className={`${styles.tabButton} ${activeTab === "tab1" ? styles.activeTab : ""}`}
        onClick={() => setActiveTab("tab1")}
    >
        Activity
    </button>
</div>

<div className={styles.tabContent}>
    {activeTab === "tab1" ? (
        <>
            {getActivies?.length > 0 ? (
                getActivies.map((item) => (
                    <div key={item.id} className={styles.activeCard}>
                        <div className={styles.activeBox}>
                            <p>{profileLeadViewData?.name}</p>
                            <p>{item?.activity_name}</p>
                        </div>
                        <p>{moment(item?.created_at).format("hh:mm")}</p>
                    </div>
                ))
            ) : (
                <p>No Data Available</p>
            )}
        </>
    ) : (
        <p>This is the content for Tab 2.</p>
    )}
</div>

                    </>}
                </div>
            </>
        </>
    )
}

export default ViewProfile