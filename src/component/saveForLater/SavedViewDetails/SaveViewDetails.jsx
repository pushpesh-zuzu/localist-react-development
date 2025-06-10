import React from "react"
import styles from "./SaveViewDetails.module.css"
import LeadMap from "../../myResponses/LeadMap/LeadMap"


const SavedViewDetails = () => {
    return(
        <>
        <div className={styles.maincontainer}>
            <div className={styles.viewDetailsBox}>
                <div>

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