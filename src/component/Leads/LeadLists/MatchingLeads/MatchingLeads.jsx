// import React, { useEffect, useRef, useState } from "react";
// import styles from "./MatchingLeads.module.css";
// import SettingIcon from "../../../../assets/Images/Leads/SettingIcon.svg";
// import LocationIcon from "../../../../assets/Images/Leads/WhiteLocationIcon.svg";
// import FilterIcon from "../../../../assets/Images/Leads/FilterIcon.svg";
// import EditIcon from "../../../../assets/Images/Leads/EditIconWhite.svg";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getLeadFiterApiList,
//   getleadPreferencesList,
//   getLeadRequestList,
//   getLocationLead,
// } from "../../../../store/LeadSetting/leadSettingSlice";
// import MatchingLeadsFilter from "./MatchingLeadsFilter";
// import FilterBlackIcon from "../../../../assets/Images/Leads/blackFilter.svg";

// const MatchingLeads = () => {
//   const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
//   const [selectedSort, setSelectedSort] = useState("Newest");
//   const sortOptions = ["Newest", "Oldest"];

//   const [selectedFilter, setSelectedFilter] = useState("Credit Value High");
//   const filterOptions = [
//     "Credit Value High",
//     "Credit Value Medium",
//     "Credit Value Low",
//   ];

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { leadRequestList, getlocationData, preferenceList, totalCredit } =
//     useSelector((state) => state.leadSetting);
//   const { registerData } = useSelector((state) => state.findJobs);
//   const { userToken } = useSelector((state) => state.auth);

//   const data = leadRequestList?.length;
//   const locationLength = getlocationData?.length;

//   const triggerRef = useRef(null);
//   const stickyRef = useRef(null);

//   useEffect(() => {
//     const data = {
//       user_id: userToken?.remember_tokens
//         ? userToken?.remember_tokens
//         : registerData?.remember_tokens,
//     };
//     dispatch(getleadPreferencesList(data));
//   }, []);

//   const getCreditFilterValue = (filterOption) => {
//     switch (filterOption) {
//       case "Credit Value High":
//         return "High";
//       case "Credit Value Medium":
//         return "Medium";
//       case "Credit Value Low":
//         return "Low";
//       default:
//         return "High";
//     }
//   };

//   const getSortTypeValue = (sortOption) => {
//     switch (sortOption) {
//       case "Newest":
//         return "Newest";
//       case "Oldest":
//         return "Oldest";
//       default:
//         return "Newest";
//     }
//   };

//   const handleSortChange = (option) => {
//     setSelectedSort(option);
//     if (userToken?.remember_tokens || registerData?.remember_tokens) {
//       const filterData = {
//         user_id: userToken?.remember_tokens
//           ? userToken?.remember_tokens
//           : registerData?.remember_tokens,
//         sort_type: getSortTypeValue(option),
//       };
//       dispatch(getLeadFiterApiList(filterData));
//     }
//   };

//   const handleFilterChange = (option) => {
//     setSelectedFilter(option);
//     if (userToken?.remember_tokens || registerData?.remember_tokens) {
//       const filterData = {
//         user_id: userToken?.remember_tokens
//           ? userToken?.remember_tokens
//           : registerData?.remember_tokens,
//         credit_filter: getCreditFilterValue(option),
//       };
//       dispatch(getLeadFiterApiList(filterData));
//     }
//   };

//   const handleEdit = () => {
//     navigate("/settings/leads/my-services");
//   };

//   const handleFilterClick = () => {
//     setIsFilterModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsFilterModalOpen(false);
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.boundingClientRect.top <= 0) {
//           stickyRef.current.classList.add(styles.fixedTop);
//         } else {
//           stickyRef.current.classList.remove(styles.fixedTop);
//         }
//       },
//       {
//         root: null,
//         threshold: 0,
//       }
//     );

//     const trigger = triggerRef.current;
//     if (trigger) observer.observe(trigger);

//     return () => {
//       if (trigger) observer.unobserve(trigger);
//     };
//   }, []);

//   return (
//     <>
//       <div className={styles.container}>
//         <div className={styles.textSection}>
//           <h2 className={styles.heading}>{data} matching leads</h2>
//           <p className={styles.subText}>
//             <span className={styles.subTextSpan}>
//               <img src={SettingIcon} alt="" /> {preferenceList?.length} services{" "}
//             </span>
//           </p>
//         </div>
//         <div className={styles.btnDisplay}>
//           <button className={styles.editButtons} onClick={handleEdit}>
//             Edit <img src={EditIcon} alt="" />
//           </button>
//         </div>

//         <div className={styles.dualDropdownsContainer}>
//           {/* First Dropdown - Newest */}
//           <div style={{ cursor: "pointer" }} className={styles.dropdownWrapper}>
//             <select
//               style={{ cursor: "pointer" }}
//               className={styles.dropdownTriggers}
//               value={selectedSort}
//               onChange={(e) => handleSortChange(e.target.value)}
//             >
//               {sortOptions.map((option) => (
//                 <option
//                   key={option}
//                   value={option}
//                   style={{ cursor: "pointer" }}
//                 >
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Second Dropdown - Credit Value */}
//           <div className={styles.dropdownWrapper} style={{ cursor: "pointer" }}>
//             <select
//               style={{ cursor: "pointer" }}
//               className={styles.dropdownTrigger}
//               value={selectedFilter}
//               onChange={(e) => handleFilterChange(e.target.value)}
//             >
//               {filterOptions.map((option) => (
//                 <option
//                   key={option}
//                   value={option}
//                   style={{ cursor: "pointer" }}
//                 >
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className={styles.actionButtons}>
//             <button className={styles.filterButton} onClick={handleFilterClick}>
//               <img style={{ cursor: "pointer" }} src={FilterIcon} alt="" />{" "}
//               Filter
//             </button>
//             <Link
//               style={{ textDecoration: "none" }}
//               to="/settings/leads/my-services"
//               className={styles.editButton}
//             >
//               Edit <img src={EditIcon} alt="" />
//             </Link>
//           </div>
//         </div>

//         {isFilterModalOpen && (
//           <MatchingLeadsFilter onClose={handleCloseModal} />
//         )}
//       </div>

//       <div className={styles.dualDropdownsContainers}>
//         {/* First Dropdown - Newest */}
//         <div className={styles.dropdownWrappers}>
//           <select
//             className={styles.dropdownTriggers}
//             value={selectedSort}
//             onChange={(e) => handleSortChange(e.target.value)}
//           >
//             {sortOptions.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Second Dropdown - Credit Value */}
//         {/* <div className={styles.dropdownWrapper}> */}
//         <select
//           className={styles.dropdownTrigger}
//           value={selectedFilter}
//           onChange={(e) => handleFilterChange(e.target.value)}
//         >
//           {filterOptions.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//         {/* </div> */}

//         <div className={styles.actionButton}>
//           <button className={styles.filterButtons} onClick={handleFilterClick}>
//             <img src={FilterBlackIcon} alt="" /> Filter
//           </button>
//         </div>
//       </div>

//       <div className={styles.desktopBtn}>
//         <div ref={triggerRef} style={{ height: "1px" }}></div>
//         <div ref={stickyRef} className={styles.creditsLeftContainer}>
//           <button className={styles.creditsButton}>
//             You have {totalCredit?.total_credit ?? "0"} Credits Left
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MatchingLeads;

import React, { useEffect, useRef, useState } from "react";
import styles from "./MatchingLeads.module.css";
import SettingIcon from "../../../../assets/Images/Leads/SettingIcon.svg";
import LocationIcon from "../../../../assets/Images/Leads/WhiteLocationIcon.svg";
import FilterIcon from "../../../../assets/Images/Leads/FilterIcon.svg";
import EditIcon from "../../../../assets/Images/Leads/EditIconWhite.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeadFiterApiList,
  getleadPreferencesList,
  getLeadRequestList,
  getLocationLead,
} from "../../../../store/LeadSetting/leadSettingSlice";
import MatchingLeadsFilter from "./MatchingLeadsFilter";
import FilterBlackIcon from "../../../../assets/Images/Leads/blackFilter.svg";
import { Popover } from "antd";

const MatchingLeads = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Newest");
  const sortOptions = ["Newest", "Oldest"];

  const [selectedFilter, setSelectedFilter] = useState("Credit Value High");
  const filterOptions = [
    "Credit Value High",
    "Credit Value Medium",
    "Credit Value Low",
  ];

  const [openPopover, setOpenPopover] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { leadRequestList, getlocationData, preferenceList, totalCredit } =
    useSelector((state) => state.leadSetting);
  const { registerData } = useSelector((state) => state.findJobs);
  const { userToken } = useSelector((state) => state.auth);

  const data = leadRequestList?.length;
  const locationLength = getlocationData?.length;

  const triggerRef = useRef(null);
  const stickyRef = useRef(null);

  useEffect(() => {
    const data = {
      user_id: userToken?.remember_tokens
        ? userToken?.remember_tokens
        : registerData?.remember_tokens,
    };
    dispatch(getleadPreferencesList(data));
  }, []);

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

  const handleSortChange = (option) => {
    setSelectedSort(option);
    if (userToken?.remember_tokens || registerData?.remember_tokens) {
      const filterData = {
        user_id: userToken?.remember_tokens
          ? userToken?.remember_tokens
          : registerData?.remember_tokens,
        sort_type: getSortTypeValue(option),
      };
      dispatch(getLeadFiterApiList(filterData));
    }
  };

  const handleFilterChange = (option) => {
    setSelectedFilter(option);
    if (userToken?.remember_tokens || registerData?.remember_tokens) {
      const filterData = {
        user_id: userToken?.remember_tokens
          ? userToken?.remember_tokens
          : registerData?.remember_tokens,
        credit_filter: getCreditFilterValue(option),
      };
      dispatch(getLeadFiterApiList(filterData));
    }
  };

  const handleEdit = () => {
    navigate("/settings/leads/my-services");
  };

  const handleFilterClick = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsFilterModalOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.top <= 0) {
          stickyRef.current.classList.add(styles.fixedTop);
        } else {
          stickyRef.current.classList.remove(styles.fixedTop);
        }
      },
      {
        root: null,
        threshold: 0,
      }
    );

    const trigger = triggerRef.current;
    if (trigger) observer.observe(trigger);

    return () => {
      if (trigger) observer.unobserve(trigger);
    };
  }, []);

  // ✅ Popover dropdown content renderer
  const renderOptions = (options, currentValue, onChange) => (
    <div className={styles.popoverContent}>
      {options.map((opt) => (
        <div
          key={opt}
          className={`${styles.optionItem} ${
            currentValue === opt ? styles.active : ""
          }`}
          onClick={() => {
            onChange(opt);
            setOpenPopover(null);
          }}
        >
          {opt}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.textSection}>
          <h2 className={styles.heading}>{data} matching leads</h2>
          <p className={styles.subText}>
            <span className={styles.subTextSpan}>
              <img src={SettingIcon} alt="" /> {preferenceList?.length} services{" "}
            </span>
          </p>
        </div>
        <div className={styles.btnDisplay}>
          <button className={styles.editButtons} onClick={handleEdit}>
            Edit <img src={EditIcon} alt="" />
          </button>
        </div>

        <div className={styles.dualDropdownsContainer}>
          {/* First Dropdown - Newest */}
          <Popover
            content={renderOptions(sortOptions, selectedSort, handleSortChange)}
            trigger="click"
            placement="bottom"
            autoAdjustOverflow={false}
            overlayStyle={{ minWidth: "200px" }}
            open={openPopover === "sort"}
            onOpenChange={(visible) => setOpenPopover(visible ? "sort" : null)}
          >
            <button className={styles.dropdownTriggers}>{selectedSort}</button>
          </Popover>

          {/* Second Dropdown - Credit Value */}
          <Popover
            content={renderOptions(
              filterOptions,
              selectedFilter,
              handleFilterChange
            )}
            trigger="click"
            placement="bottom"
            autoAdjustOverflow={false}
            overlayStyle={{ minWidth: "200px" }}
            open={openPopover === "filter"}
            onOpenChange={(visible) =>
              setOpenPopover(visible ? "filter" : null)
            }
          >
            <button className={styles.dropdownTrigger}>{selectedFilter}</button>
          </Popover>

          <div className={styles.actionButtons}>
            <button className={styles.filterButton} onClick={handleFilterClick}>
              <img style={{ cursor: "pointer" }} src={FilterIcon} alt="" />{" "}
              Filter
            </button>
            <Link
              style={{ textDecoration: "none" }}
              to="/settings/leads/my-services"
              className={styles.editButton}
            >
              Edit <img src={EditIcon} alt="" />
            </Link>
          </div>
        </div>

        {isFilterModalOpen && (
          <MatchingLeadsFilter onClose={handleCloseModal} />
        )}
      </div>

      {/* ✅ Mobile Version bhi Popover me badal diya */}
      <div className={styles.dualDropdownsContainers}>
        <Popover
          content={renderOptions(sortOptions, selectedSort, handleSortChange)}
          trigger="click"
          placement="bottomLeft"
          autoAdjustOverflow={false}
          open={openPopover === "sortMobile"}
          onOpenChange={(visible) =>
            setOpenPopover(visible ? "sortMobile" : null)
          }
        >
          <button className={styles.dropdownTriggers}>{selectedSort}</button>
        </Popover>

        <Popover
          content={renderOptions(
            filterOptions,
            selectedFilter,
            handleFilterChange
          )}
          trigger="click"
          placement="bottomLeft"
          autoAdjustOverflow={false}
          open={openPopover === "filterMobile"}
          onOpenChange={(visible) =>
            setOpenPopover(visible ? "filterMobile" : null)
          }
        >
          <button className={styles.dropdownTrigger}>{selectedFilter}</button>
        </Popover>

        <div className={styles.actionButton}>
          <button className={styles.filterButtons} onClick={handleFilterClick}>
            <img src={FilterBlackIcon} alt="" /> Filter
          </button>
        </div>
      </div>

      <div className={styles.desktopBtn}>
        <div ref={triggerRef} style={{ height: "1px" }}></div>
        <div ref={stickyRef} className={styles.creditsLeftContainer}>
          <button className={styles.creditsButton}>
            You have {totalCredit?.total_credit ?? "0"} Credits Left
          </button>
        </div>
      </div>
    </>
  );
};

export default MatchingLeads;
