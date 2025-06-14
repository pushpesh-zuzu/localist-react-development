// import React, { useEffect, useState } from "react";
// import styles from "./MatchingLeads.module.css";
// import SettingIcon from "../../../../assets/Images/Leads/SettingIcon.svg";
// import LocationIcon from "../../../../assets/Images/Leads/WhiteLocationIcon.svg";
// import FilterIcon from "../../../../assets/Images/Leads/FilterIcon.svg";
// import EditIcon from "../../../../assets/Images/Leads/EditIconWhite.svg";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getLeadFiterApiList,
//   getLeadRequestList,
//   getLocationLead,
// } from "../../../../store/LeadSetting/leadSettingSlice";
// import MatchingLeadsFilter from "./MatchingLeadsFilter";

// const MatchingLeads = () => {
//   const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

//   const [isSortOpen, setIsSortOpen] = useState(false);
//   const [selectedSort, setSelectedSort] = useState("Newest");
//   const sortOptions = ["Newest", "Oldest"];

//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState("Credit Value High");
//   const filterOptions = [
//     "Credit Value High",
//     "Credit Value Medium",
//     "Credit Value Low",
//   ];

//   const navigate = useNavigate();
//   const handleEdit = () => {
//     navigate("/leads/settings");
//   };
//   const dispatch = useDispatch();
//   const { leadRequestList, getlocationData } = useSelector(
//     (state) => state.leadSetting
//   );
//   const { userToken } = useSelector((state) => state.auth);
//   const data = leadRequestList?.length;

//   const uniqueServiceNames = [
//     ...new Set(leadRequestList.map((item) => item.category?.name)),
//   ];
//  const handleChange = () => {
//   const filterData = {
//     user_id:userToken?.remember_tokens,
//     sort_type:1,
//     credit_filter:1
//   }
//   dispatch(getLeadFiterApiList(filterData))
//  }

//   const locationLength = getlocationData?.length;
//   useEffect(() => {
//     const location = {
//       user_id: userToken?.remember_tokens,
//     };
//     dispatch(getLocationLead(location));
//   }, []);

//   // useEffect(() => {
//   //   dispatch(getLeadRequestList());
//   // }, []);
//   const handleFilterClick = () => {
//     setIsFilterModalOpen(true); // 👉 Open modal
//   };

//   const handleCloseModal = () => {
//     setIsFilterModalOpen(false); // 👉 Close modal
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.textSection}>
//         <h2 className={styles.heading}>{data} matching leads</h2>
//         <p className={styles.subText}>
//           <span className={styles.subTextSpan}>
//             <img src={SettingIcon} alt="" /> {uniqueServiceNames?.length}{" "}
//             services{" "}
//           </span>
//           <span className={styles.subTextSpan}>
//             <img src={LocationIcon} alt="" /> {locationLength} Location
//           </span>
//         </p>
//       </div>

//       <div className={styles.dualDropdownsContainer}>
//         {/* First Dropdown - Newest */}
//         <div className={styles.dropdownWrapper}>
//           <button
//             className={styles.dropdownTrigger}
//             onClick={() => setIsSortOpen(!isSortOpen)}
//             onBlur={() => setTimeout(() => setIsSortOpen(false), 200)}
//           >
//             <span className={styles.selectedOption}>{selectedSort}</span>
//             <span className={styles.dropdownIcon}>
//               {isSortOpen ? "▲" : "▼"}
//             </span>
//           </button>

//           {isSortOpen && (
//             <ul className={styles.dropdownMenu}>
//               {sortOptions.map((option) => (
//                 <li key={option} className={styles.dropdownItem}>
//                   <button
//                     onClick={() => setSelectedSort(option)}
//                     className={styles.dropdownButton}
//                   >
//                     {option}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Second Dropdown - Credit Value */}
//         <div className={styles.dropdownWrapper}>
//           <button
//             className={styles.dropdownTrigger}
//             onClick={() => setIsFilterOpen(!isFilterOpen)}
//             onBlur={() => setTimeout(() => setIsFilterOpen(false), 200)}
//           >
//             <span className={styles.selectedOption}>{selectedFilter}</span>
//             <span className={styles.dropdownIcon}>
//               {isFilterOpen ? "▲" : "▼"}
//             </span>
//           </button>

//           {isFilterOpen && (
//             <ul className={styles.dropdownMenu}>
//               {filterOptions.map((option) => (
//                 <li key={option} className={styles.dropdownItem}>
//                   <button
//                     onClick={() => setSelectedFilter(option)}
//                     className={styles.dropdownButton}
//                   >
//                     {option}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className={styles.actionButtons}>
//           <button className={styles.filterButton} onClick={handleFilterClick}>
//             <img src={FilterIcon} alt="" /> Filter
//           </button>
//           <button className={styles.editButton} onClick={handleEdit}>
//             Edit <img src={EditIcon} alt="" />
//           </button>
//         </div>
//       </div>
//       {isFilterModalOpen && <MatchingLeadsFilter onClose={handleCloseModal} />}
//     </div>
//   );
// };

// export default MatchingLeads;
import React, { useEffect, useState } from "react";
import styles from "./MatchingLeads.module.css";
import SettingIcon from "../../../../assets/Images/Leads/SettingIcon.svg";
import LocationIcon from "../../../../assets/Images/Leads/WhiteLocationIcon.svg";
import FilterIcon from "../../../../assets/Images/Leads/FilterIcon.svg";
import EditIcon from "../../../../assets/Images/Leads/EditIconWhite.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeadFiterApiList,
  getleadPreferencesList,
  getLeadRequestList,
  getLocationLead,
} from "../../../../store/LeadSetting/leadSettingSlice";
import MatchingLeadsFilter from "./MatchingLeadsFilter";

const MatchingLeads = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Newest");
  const sortOptions = ["Newest", "Oldest"];

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Credit Value High");
  const filterOptions = [
    "Credit Value High",
    "Credit Value Medium",
    "Credit Value Low",
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { leadRequestList, getlocationData,preferenceList } = useSelector(
    (state) => state.leadSetting
  );
   const { registerData } = useSelector((state) => state.findJobs)
  const { userToken } = useSelector((state) => state.auth);
  const data = leadRequestList?.length;
console.log(preferenceList?.length,"preferenceList")
  const uniqueServiceNames = [
    ...new Set(leadRequestList.map((item) => item.category?.name)),
  ];

  useEffect(()=> {
    const data = {
      user_id: userToken?.remember_tokens ? userToken?.remember_tokens :  registerData?.remember_tokens
    }
dispatch(getleadPreferencesList(data))
  },[])

  // Function to get credit filter value
  const getCreditFilterValue = (filterOption) => {
    switch (filterOption) {
      case "Credit Value High":
        return "High";
      case "Credit Value Medium":
        return "Medium";
      case "Credit Value Low":
        return "Low";
      default:
        return "High";
    }
  };

  // Function to get sort type value
  const getSortTypeValue = (sortOption) => {
    switch (sortOption) {
      case "Newest":
        return "Newest";
      case "Oldest":
        return "Oldest";
      default:
        return "Newest";
    }
  };

  // Handle changes to sort dropdown
  const handleSortChange = (option) => {
    setSelectedSort(option);
    setIsSortOpen(false);
    
    // Apply only sort filter, leave credit filter unchanged
    if (userToken?.remember_tokens || registerData?.remember_tokens) {
      const filterData = {
        user_id: userToken?.remember_tokens ? userToken?.remember_tokens :  registerData?.remember_tokens,
        sort_type: getSortTypeValue(option),
        // Don't include credit_filter
      };
      dispatch(getLeadFiterApiList(filterData));
    }
  };

  // Handle changes to credit filter dropdown
  const handleFilterChange = (option) => {
    setSelectedFilter(option);
    setIsFilterOpen(false);
    
    // Apply only credit filter, leave sort type unchanged
    if (userToken?.remember_tokens || registerData?.remember_tokens) {
      const filterData = {
        user_id: userToken?.remember_tokens ? userToken?.remember_tokens :  registerData?.remember_tokens,
        // Don't include sort_type
        credit_filter: getCreditFilterValue(option)
      };
      dispatch(getLeadFiterApiList(filterData));
    }
  };

  const locationLength = getlocationData?.length;
  
  // useEffect(() => {
  //   if (userToken?.remember_tokens) {
  //     const location = {
  //       user_id: userToken?.remember_tokens,
  //     };
  //     dispatch(getLocationLead(location));
      
  //     // Initial load of leads - don't send any filters initially
  //     // const filterData = {
  //     //   user_id: userToken?.remember_tokens,
  //     // };
  //     // dispatch(getLeadFiterApiList(filterData));
  //   }
  // }, [userToken?.remember_tokens, dispatch]);

  const handleEdit = () => {
    navigate("/leads/settings");
  };

  const handleFilterClick = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <h2 className={styles.heading}>{data} matching leads</h2>
        <p className={styles.subText}>
          <span className={styles.subTextSpan}>
            <img src={SettingIcon} alt="" /> {preferenceList?.length}{" "}
            services{" "}
          </span>
          {/* <span className={styles.subTextSpan}>
            <img src={LocationIcon} alt="" /> {locationLength} Location
          </span> */}
        </p>
      </div>

      <div className={styles.dualDropdownsContainer}>
        {/* First Dropdown - Newest */}
        <div className={styles.dropdownWrapper}>
          <button
            className={styles.dropdownTrigger}
            onClick={() => setIsSortOpen(!isSortOpen)}
            onBlur={() => setTimeout(() => setIsSortOpen(false), 200)}
          >
            <span className={styles.selectedOption}>{selectedSort}</span>
            <span className={styles.dropdownIcon}>
              {isSortOpen ? "▲" : "▼"}
            </span>
          </button>

          {isSortOpen && (
            <ul className={styles.dropdownMenu}>
              {sortOptions.map((option) => (
                <li key={option} className={styles.dropdownItem}>
                  <button
                    onClick={() => handleSortChange(option)}
                    className={styles.dropdownButton}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Second Dropdown - Credit Value */}
        <div className={styles.dropdownWrapper}>
          <button
            className={styles.dropdownTrigger}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            onBlur={() => setTimeout(() => setIsFilterOpen(false), 200)}
          >
            <span className={styles.selectedOption}>{selectedFilter}</span>
            <span className={styles.dropdownIcon}>
              {isFilterOpen ? "▲" : "▼"}
            </span>
          </button>

          {isFilterOpen && (
            <ul className={styles.dropdownMenus}>
              {filterOptions.map((option) => (
                <li key={option} className={styles.dropdownItem}>
                  <button
                    onClick={() => handleFilterChange(option)}
                    className={styles.dropdownButton}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.filterButton} onClick={handleFilterClick}>
            <img src={FilterIcon} alt="" /> Filter
          </button>
          <button className={styles.editButton} onClick={handleEdit}>
            Edit <img src={EditIcon} alt="" />
          </button>
        </div>
      </div>
      {isFilterModalOpen && <MatchingLeadsFilter onClose={handleCloseModal} />}
    </div>
  );
};

export default MatchingLeads;