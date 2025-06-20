// import React from 'react';
// import styles from "./ViewProfile.module.css";

// const TabNav = ({ activeTab }) => {
//   const tabs = ['About', 'Services', 'Reviews', 'Accreditations', 'Q+A\'s', 'Photos'];

//   return (
//     <div className={styles.tabContainers}>
//       {tabs.map(tab => (
//         <div
//           key={tab}
//           className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
//         >
//           {tab}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TabNav;

import React from "react";
import styles from "./ViewProfile.module.css";
; // Adjust path as needed

const TabNav = ({ activeTab, onTabClick }) => {
    const tabs = [
        'About',
        'Services', 
        'Reviews',
        'Accreditations',
        'Q+A\'s',
        'Photos'
    ];

    return (
        <div className={styles.tabContainers}>
            {tabs.map((tab) => (
                <div
                    key={tab}
                    className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
                    onClick={() => onTabClick(tab)}
                >
                    {tab}
                </div>
            ))}
        </div>
    );
};

export default TabNav;