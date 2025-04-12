import styles from "./search.module.css";
import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import calloutArrow from "../../../assets/Images/callOutArrow.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPopularServiceList, searchService, setSelectedServiceId, setService } from "../../../store/FindJobs/findJobSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { generateSlug, showToast } from "../../../utils";
import { questionAnswerData } from "../../../store/Buyer/BuyerSlice";
import BuyerRegistration from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";

const SearchProfessionals = ({nextStep}) => {
  const [Input, setInput] = useState("");
  const [pincode,setPincode] = useState("")
  const [selectedService, setSelectedService] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { service, searchServiceLoader } = useSelector((state) => state.findJobs);
  const [selectedServiceId, setSelectedServiceId] = useState({ id: null, name: "" })
  const [show, setShow] = useState(false)
  const { userToken } = useSelector((state)=> state.auth)

const handleClose = () => {
  setShow(false)
  setInput("")
  setPincode("")
  setSelectedService("")
}
  useEffect(() => {
    dispatch(getPopularServiceList());
    return () => {
      dispatch(setService([])); 
      
    };
  }, []);
   useEffect(() => {
      const delayDebounce = setTimeout(() => {
        if (isDropdownOpen && Input.trim() !== "") {
          dispatch(searchService({ search: Input }));
        }
      }, 500);
  
      return () => clearTimeout(delayDebounce);
    }, [Input, dispatch, isDropdownOpen]);
    const handleSelectService = useCallback((item) => {
      setInput(item.name);
      setSelectedService(item);
      setIsDropdownOpen(false);
      setTimeout(() => dispatch(setService([])), 100);
    }, [dispatch]);
    const handleChange = (e) => {
setPincode(e.target.value)
    }
    
      useEffect(() => {
        // Load Google Places API script dynamically
        const loadGoogleMapsScript = () => {
          if (!window.google) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = initAutocomplete;
            document.body.appendChild(script);
          } else {
            initAutocomplete();
          }
        };
      
        // Initialize Google Autocomplete
        const initAutocomplete = () => {
          if (!inputRef.current) return;
      
          const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ["geocode"],
            componentRestrictions: { country: "IN" }, // Restrict to India
          });
      
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.address_components) return;
      
            let postalCode = "";
            place.address_components.forEach((component) => {
              if (component.types.includes("postal_code")) {
                postalCode = component.long_name; 
              }
            });
      
            if (postalCode) {
             setPincode(postalCode);
              inputRef.current.value = postalCode;
            } else {
              showToast("error","No PIN code found! Please try again.");
            }
          });
        };
      
        loadGoogleMapsScript();
      }, []);
      const handleGetStarted = () => {
        if (!selectedService) {
          showToast("error","Please select a service from the suggestions.");
          return;
        }
      
        const { id, name } = selectedService;
      
        dispatch(questionAnswerData({ service_id: id }));
        setSelectedServiceId({ id, name });
      // setInput("")
      // setPincode("")
        setShow(true);
      };
      
  return (
    <div className={styles.searchContainer}>
      <div className={styles.popularExamples}>
        <div className={styles.exampleBox}>
          <p className={styles.exampleTitle}>Popular examples:</p>
          <span className={styles.exampledescription}>
            Driveway Installation, Gardening Services, Web Design....
          </span>
        </div>
      </div>

      <div className={styles.calloutArrow}>
        <img src={calloutArrow} alt="calloutArrow" />
      </div>

      <div className={styles.container}>
        <h1 className={styles.heading}>Find Local</h1>
        <h1 className={styles.heading}>
          <span className={styles.highlight}>Services</span> - Fast
        </h1>

        <h4 className={styles.subText}>
          Get fast quotes from local professionals
        </h4>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Type your service and choose from provided options."
            className={styles.input}
            onChange={(e) => {
              setInput(e.target.value);
              setIsDropdownOpen(!!e.target.value);
              setSelectedService(null);
            }}
          value={Input}
          />
           
          <div className={styles.divider}></div>
          <div className={styles.locationWrapper}>
            <EnvironmentOutlined />
            <input
              type="text"
              placeholder="Postcode"
              className={styles.locationInput}
              ref={inputRef}
                name="postcode"
                value={pincode  || ""}
                onChange={handleChange}
            />
          </div>
          <button className={styles.searchButton} onClick={handleGetStarted}>Search</button>
          <button className={styles.searchButtonPhone}>
            <SearchOutlined />
          </button>
         
        </div>
        {isDropdownOpen && service?.length > 0 && (
                      <div className={styles.searchResults}>
                        {searchServiceLoader ? (
                          <Spin indicator={<LoadingOutlined spin />} />
                        ) : (
                          <>
                            {" "}
                            {service?.map((item) => (
                              <p
                                key={item.id}
                                className={styles.searchItem}
                                onClick={() => handleSelectService(item)}
                              >
                                {item.name}
                              </p>
                            ))}
                          </>
                        )}
                      </div>
                    )}
      </div>
      {show && (userToken?.active_status == 2 || !userToken )  && (
          <>
            <BuyerRegistration closeModal={handleClose} serviceId={selectedServiceId?.id} serviceName={selectedServiceId.name} 
      
      postcode={pincode} />
          </>
        )}
    </div>
  );
};

export default SearchProfessionals;
