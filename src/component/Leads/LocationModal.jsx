// import React, { useEffect, useRef } from "react";
// import styles from "./LocationModal.module.css";
// import { showToast } from "../../utils";
// import iIcon from "../../assets/Images/iIcon.svg";

// const LocationModal = ({
//   open,
//   isEditing,
//   locationData,
//   onChange,
//   onCancel,
//   onNext,
// }) => {
//   const inputRef = useRef(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (!open) return;

//     const loadGoogleMapsScript = () => {
//       if (!window.google) {
//         const script = document.createElement("script");
//         script.src =
//           "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places";
//         script.async = true;
//         script.defer = true;
//         script.onload = initAutocomplete;
//         document.body.appendChild(script);
//       } else {
//         initAutocomplete();
//       }
//     };

//     const initAutocomplete = () => {
//       if (!inputRef.current) return;

//       const autocomplete = new window.google.maps.places.Autocomplete(
//         inputRef.current,
//         {
//           types: ["geocode"],
//           componentRestrictions: { country: "IN" },
//         }
//       );

//       autocomplete.addListener("place_changed", () => {
//         const place = autocomplete.getPlace();
//         if (!place.address_components) return;

//         let postalCode = "";
//         let lat = place.geometry?.location?.lat();
//         let lng = place.geometry?.location?.lng();

//         place.address_components.forEach((component) => {
//           if (component.types.includes("postal_code")) {
//             postalCode = component.long_name;
//           }
//         });

//         if (postalCode) {
//           onChange({ target: { name: "postcode", value: postalCode } });
//           inputRef.current.value = postalCode;

//           if (mapRef.current && lat && lng) {
//             const map = new window.google.maps.Map(mapRef.current, {
//               center: { lat, lng },
//               zoom: 12,
//             });

//             new window.google.maps.Marker({
//               position: { lat, lng },
//               map,
//             });
//           }
//         } else {
//           showToast("No PIN code found! Please try again.");
//         }
//       });
//     };

//     loadGoogleMapsScript();
//   }, [open, onChange]);

//   if (!open) return null;

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         <div className={styles.modalHeader}>
//           <h2>Distance</h2>
//           <button className={styles.closeButton} onClick={onCancel}>
//             &times;
//           </button>
//         </div>

//         <div className={styles.infoBox}>
//           <img src={iIcon} alt="" />
//           <span>Enter a ZIP code or town and the distance around it.</span>
//         </div>

//         <div className={styles.inputRow}>
//           <div className={styles.inputField}>
//             <label>ZIP Code / City</label>
//             <input
//               ref={inputRef}
//               type="text"
//               name="postcode"
//               value={locationData.postcode}
//               onChange={onChange}
//               placeholder="Enter ZIP or City"
//             />
//           </div>
//           <div className={styles.inputField}>
//             <label>Distance</label>
//             <select
//               name="miles1"
//               value={locationData.miles1}
//               onChange={onChange}
//             >
//               <option value="1">1 mile</option>
//               <option value="5">5 miles</option>
//               <option value="10">10 miles</option>
//               <option value="30">30 miles</option>
//               <option value="50">50 miles</option>
//               <option value="100">100 miles</option>
//             </select>
//           </div>
//         </div>

//         <div className={styles.modalFooter}>
//           <button className={styles.cancelBtn} onClick={onCancel}>
//             Cancel
//           </button>
//           <button className={styles.nextBtn} onClick={onNext}>
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocationModal;


import React, { useEffect, useRef, useState } from "react";
import styles from "./LocationModal.module.css";
import { showToast } from "../../utils";
import iIcon from "../../assets/Images/iIcon.svg";

const LocationModal = ({
  open,
  isEditing,
  locationData,
  onChange,
  onCancel,
  onNext,
  onClose,
}) => {
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapCenter, setMapCenter] = useState({
    lat: 20.5937,
    lng: 78.9629,
  });

  // ✅ Function to draw circle based on distance
  const drawCircle = (center) => {
    if (!window.google || !mapInstance.current) return;

    // Clear previous circle if exists
    if (circleRef.current) {
      circleRef.current.setMap(null);
    }

    const radiusInMeters =
      (parseFloat(locationData.miles1) || 1) * 1609.34; // 1 mile = 1609.34 meters

    circleRef.current = new window.google.maps.Circle({
      center,
      radius: radiusInMeters,
      fillColor: "#007BFF",
      fillOpacity: 0.2,
      strokeColor: "#007BFF",
      strokeOpacity: 0.7,
      strokeWeight: 2,
      map: mapInstance.current,
    });
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places,geometry";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setMapLoaded(true);
          initAutocomplete();
          initMap();
        };
        document.body.appendChild(script);
      } else {
        setMapLoaded(true);
        initAutocomplete();
        initMap();
      }
    };

    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 10,
      });

      if (locationData.postcode && mapCenter.lat !== 20.5937) {
        markerRef.current = new window.google.maps.Marker({
          position: mapCenter,
          map: mapInstance.current,
        });
        drawCircle(mapCenter);
      }
    };

    const initAutocomplete = () => {
      if (!inputRef.current || !window.google) return;

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode"],
          componentRestrictions: { country: "IN" },
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.address_components) return;

        let postalCode = "";
        let lat = place.geometry?.location?.lat();
        let lng = place.geometry?.location?.lng();

        place.address_components.forEach((component) => {
          if (component.types.includes("postal_code")) {
            postalCode = component.long_name;
          }
        });
        const cityName = place.address_components.find((component) =>
          component.types.includes("locality")
        )?.long_name;

        if (postalCode) {
          onChange({ target: { name: "postcode", value: postalCode } });
          onChange({ target: { name: "city", value: cityName || "" } })
          onChange({ target: { name: "coordinates", value: "" } })
          inputRef.current.value = postalCode;

          if (lat && lng) {
            const newCenter = { lat, lng };
            setMapCenter(newCenter);

            if (mapInstance.current) {
              mapInstance.current.setCenter(newCenter);
              mapInstance.current.setZoom(12);

              if (markerRef.current) markerRef.current.setMap(null);

              markerRef.current = new window.google.maps.Marker({
                position: newCenter,
                map: mapInstance.current,
              });

              drawCircle(newCenter);
            }
          }
        } else {
          showToast("No PIN code found! Please try again.");
        }
      });
    };

    loadGoogleMapsScript();
  }, [open]);

  // ✅ Geocode on open if postcode is present
  useEffect(() => {
    if (open && mapLoaded && locationData.postcode && window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { address: locationData.postcode, componentRestrictions: { country: "IN" } },
        (results, status) => {
          if (status === "OK" && results && results[0]) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            const newCenter = { lat, lng };
            setMapCenter(newCenter);

            if (mapInstance.current) {
              mapInstance.current.setCenter(newCenter);
              mapInstance.current.setZoom(12);

              if (markerRef.current) markerRef.current.setMap(null);

              markerRef.current = new window.google.maps.Marker({
                position: newCenter,
                map: mapInstance.current,
              });

              drawCircle(newCenter);
            }
          }
        }
      );
    }
  }, [open, mapLoaded, locationData.postcode]);

 
  useEffect(() => {
    if (mapLoaded && mapCenter.lat !== 20.5937) {
      drawCircle(mapCenter);
    }
  }, [locationData.miles1]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalHeader}>
          <h2>Distance</h2>
        </div>

        <div className={styles.infoBox}>
          <img src={iIcon} alt="" />
          <span>Enter a ZIP code or town and the distance around it.</span>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputField}>
            <label>ZIP Code / City</label>
            <input
              ref={inputRef}
              type="text"
              name="postcode"
              value={locationData.postcode}
              onChange={onChange}
              placeholder="Enter ZIP or City"
            />
          </div>
          <div className={styles.inputField}>
            <label>Distance</label>
            <select
              name="miles1"
              value={locationData.miles1}
              onChange={onChange}
            >
              <option value="1">1 mile</option>
              <option value="5">5 miles</option>
              <option value="10">10 miles</option>
              <option value="30">30 miles</option>
              <option value="50">50 miles</option>
              <option value="100">100 miles</option>
            </select>
          </div>
        </div>

        <div
          ref={mapRef}
          className={styles.mapContainer}
          style={{
            width: "100%",
            height: "250px",
            marginTop: "20px",
            borderRadius: "8px",
          }}
        />

        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.nextBtn} onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
