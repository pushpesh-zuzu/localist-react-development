import React from "react"
import styles from "./SaveViewDetails.module.css"
import LeadMap from "../../myResponses/LeadMap/LeadMap"


const SavedViewDetails = ({saveForLaterDataList}) => {
    console.log(saveForLaterDataList,"saveForLaterDataList")
    return(
        <>
        <div className={styles.maincontainer}>
            <div className={styles.viewDetailsBox}>
                <div>
                    <div>
          {saveForLaterDataList?.[0]?.savedLeads?.map((item, index) => {
            const parsedQuestions = item?.questions ? JSON.parse(item.questions) : [];

            return (
              <div key={index} className={styles.questionBlock}>
                {parsedQuestions.map((qa, idx) => (
                  <div key={idx} className={styles.questionItem}>
                    <strong>.</strong> {qa.ques}
                    <br />
                     {qa.ans}
                    <hr />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

                </div>
                <div>
                    <LeadMap  
                    // getPendingLeadList={getPendingLeadList} 
                    
                    />
                </div>
            </div>
        </div>
        </>
    )
}

export default SavedViewDetails