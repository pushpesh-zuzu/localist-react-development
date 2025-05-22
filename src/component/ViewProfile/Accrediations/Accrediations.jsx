import React from "react"
import styles from "./Accrediations.module.css" 
import iIcon from "../../../assets/Images/iIcon.svg";

const Accrediations = () => {
    return (
        <div className={styles.accrediationsContainer}>
            <h2>Accrediations</h2>
       <div className={styles.accrediationsBox}>
       ICAEW Member
       </div>
       <div className={styles.infoBox}>
               <span className={styles.infoIcon}>
                 <img src={iIcon} alt="" />
               </span>
               <span>
               Professionals report their own accrediations. Please ask them for more details if required. </span>
             </div>
        </div>
    )
}
export default Accrediations