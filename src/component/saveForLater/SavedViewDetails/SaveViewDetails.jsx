// import React from "react"
// import styles from "./SaveViewDetails.module.css"
// import LeadMap from "../../myResponses/LeadMap/LeadMap"


// const SavedViewDetails = ({saveForLaterDataList}) => {
//     console.log(saveForLaterDataList,"saveForLaterDataList")
//     return(
//         <>
//         <div className={styles.maincontainer}>
//             <div className={styles.viewDetailsBox}>
//                 <div>
//                     <div>
//           {saveForLaterDataList?.[0]?.savedLeads?.map((item, index) => {
//             const parsedQuestions = item?.questions ? JSON.parse(item.questions) : [];

//             return (
//               <div key={index} className={styles.questionBlock}>
//                 {parsedQuestions.map((qa, idx) => (
//                   <div key={idx} className={styles.questionItem}>
//                     <strong>.</strong> {qa.ques}
//                     <br />
//                      <p>{qa.ans}</p>
//                     <hr />
//                   </div>
//                 ))}
//               </div>
//             );
//           })}
//         </div>

//                 </div>
//                 <div>
//                     <LeadMap  
//                     // getPendingLeadList={getPendingLeadList} 

//                     />
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }

// export default SavedViewDetails

import React from "react";
import styles from "./SaveViewDetails.module.css";
import LeadMap from "../../myResponses/LeadMap/LeadMap";
import VerifiedPhoneIcon from "../../../assets/Images/Leads/VerifiedPhoneIcon.svg";
import AdditionalDetailsIcon from "../../../assets/Images/Leads/AdditionalDetailsIcon.svg";
import FrequentUserIcon from "../../../assets/Images/Leads/FrequentUserIcon.svg";
import UrgentIcon from "../../../assets/Images/Leads/UrgentIcon.svg";
import IntentIcon from "../../../assets/Images/Leads/IntentIcon.svg";
import DotIcon from "../../../assets/Images/Leads/DotIcon.svg";
import UpdateIcon from "../../../assets/Images/Leads/UpdateIcon.svg";

const SavedViewDetails = ({ saveForLaterDataList }) => {
  const savedLeads = saveForLaterDataList?.[0]?.savedLeads || [];

  return (
    <div className={styles.maincontainer}>
      <div className={styles.viewDetailsBox}>
        {/* Left: Q&A Section */}
        <div className={styles.leftColumn}>
          {savedLeads.length > 0 ? (
            savedLeads.map((item, index) => {
              const parsedQuestions = item?.questions ? JSON.parse(item.questions) : [];

              return (
                <div key={index} className={styles.questionBlock}>
                  {parsedQuestions.map((qa, idx) => (
                    <div key={idx} className={styles.questionItem}>
                      <p className={styles.question}>
                        {/* <span className={styles.dotStyle}>•</span> */}
                        <img src={DotIcon} alt="" />
                        {qa.ques}</p>
                      <div className={styles.sperator} />
                      <p className={styles.answer}>{qa.ans}</p>
                      {/* <hr /> */}
                    </div>
                  ))}
                </div>
              );
            })
          ) : (
            <p>No saved leads available.</p>
          )}
        </div>

        {/* Right: Map and Highlights */}
        <div className={styles.rightColumn}>
          <div className={styles.highlights}>
            <p className={styles.highlightsTitle}>Highlights:</p>
            {/* <div className={styles.tags}>
              <span className={`${styles.tag} ${styles.pink}`}>📞 Verified Phone</span>
              <span className={`${styles.tag} ${styles.blue}`}>📝 Additional details</span>
              <span className={`${styles.tag} ${styles.sky}`}>🔁 Frequent user</span>
              <span className={`${styles.tag} ${styles.yellow}`}>⚠️ Urgent</span>
              <span className={`${styles.tag} ${styles.green}`}>✨ High hiring intent</span>
            </div> */}
            <div className={styles.badges}>
              {/* {item?.is_phone_verified == 1 && ( */}
              <span className={styles.verified}>
                <img src={VerifiedPhoneIcon} alt="" />
                Verified Phone
              </span>
              {/* )} */}
              {/* {item?.has_additional_details == 1 && ( */}
              <span className={styles.additional}>
                {" "}
                <img src={AdditionalDetailsIcon} alt="" />
                Additional details
              </span>
              {/* )} */}
              {/* {item?.is_frequent_user == 1 && ( */}
              <span className={styles.frequent}>
                {" "}
                <img src={FrequentUserIcon} alt="" />
                Frequent user
              </span>
              {/* )} */}
              {/* {item?.is_urgent == 1 && ( */}
              <span className={styles.urgent}>
                {" "}
                <img src={UrgentIcon} alt="" />
                Urgent
              </span>
              {/* )} */}
              {/* {item?.is_high_hiring == 1 && ( */}
              <span className={styles.intent}>
                {" "}
                <img src={IntentIcon} alt="" />
                High hiring intent
              </span>
              {/* // )} */}
            </div>
          </div>
          <div className={styles.mapContainer}>
            <LeadMap />
          </div>
          <div className={styles.leadFooter}>
            <p className={styles.leadFooterTitle}>Not seeing the right leads?</p>
            <p className={styles.leadFooterText}>
              Stop seeing leads with specific answers by customising your settings.
            </p>
            {/* <span className={styles.updateIcon}>⚙️</span> */}
            <div className={styles.updateContainer}>
              <img src={UpdateIcon} alt="" />
              <a href="#" className={styles.updateLink}> Update lead settings</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedViewDetails;
