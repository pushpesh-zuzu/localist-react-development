import React from "react"
import styles from "./Accrediations.module.css" 
import iIcon from "../../../assets/Images/iIcon.svg";

const Accrediations = ({details}) => {
  const data =details?.accreditations
    return (
        <div className={styles.accrediationsContainer}>
            <h2>Accrediations</h2>
      {data?.map((item) => {
        return (
          <>
          <div className={styles.accrediationsBox}>
      {item?.name}
       </div>
          </>
        )
      }) }
       <div className={styles.infoBox}>
               <span className={styles.infoIcon}>
                 <img src={iIcon} alt="" style={{marginTop:"4px"}} />
               </span>
               <span>
               Professionals report their own accrediations. Please ask them for more details if required. </span>
             </div>
        </div>
    )
}
export default Accrediations