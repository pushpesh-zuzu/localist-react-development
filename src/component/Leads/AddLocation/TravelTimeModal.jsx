import React, { useEffect, useRef, useState } from "react";
import styles from "./TravelTimeModal.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";

const TravelTimeModal = ({ onClose }) => {
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapCenter, setMapCenter] = useState({
    lat: 20.5937, // Default center (India)
    lng: 78.9629,
  });
  const [locationData, setLocationData] = useState({
    postcode: "",
    travelTime: "30 minutes",
    travelMode: "Driving"
  });

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places";
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

      const map = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 10,
      });

      // Add a marker if we have a specific location
      if (locationData.postcode && mapCenter.lat !== 20.5937) {
        new window.google.maps.Marker({
          position: mapCenter,
          map,
        });
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
        let placeName = place.formatted_address || place.name || "";
        let lat = place.geometry?.location?.lat();
        let lng = place.geometry?.location?.lng();

        place.address_components.forEach((component) => {
          if (component.types.includes("postal_code")) {
            postalCode = component.long_name;
          }
        });

        if (lat && lng) {
          setMapCenter({ lat, lng });
          
          const finalLocation = postalCode || placeName;
          setLocationData({
            ...locationData,
            postcode: finalLocation
          });
          
          if (mapRef.current) {
            const map = new window.google.maps.Map(mapRef.current, {
              center: { lat, lng },
              zoom: 12,
            });

            const marker = new window.google.maps.Marker({
              position: { lat, lng },
              map,
            });

            // Draw travel radius circle
            const radiusInMeters = calculateTravelRadius(locationData.travelTime, locationData.travelMode);
            const circle = new window.google.maps.Circle({
              map: map,
              radius: radiusInMeters,
              fillColor: '#4285F4',
              fillOpacity: 0.15,
              strokeColor: '#4285F4',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              center: { lat, lng },
            });

            // Adjust map to fit the circle
            map.fitBounds(circle.getBounds());
          }
        } else {
          console.error("Could not get coordinates for the selected place");
        }
      });
    };

    loadGoogleMapsScript();
  }, [locationData, mapCenter]);

  // Calculate travel radius based on time and mode
  const calculateTravelRadius = (time, mode) => {
    // Base speeds in meters per minute
    const speedMap = {
      "Driving": 800, // ~48km/h
      "Public Transport": 400, // ~24km/h
      "Biking": 250, // ~15km/h
      "Walking": 80  // ~4.8km/h
    };

    // Extract minutes from time selection
    let minutes = 30;
    if (time === "1 hour") minutes = 60;
    if (time === "1.5 hours") minutes = 90;
    if (time === "2 hours") minutes = 120;

    // Calculate radius
    return speedMap[mode] * minutes;
  };

  // Handle form input changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setLocationData({
      ...locationData,
      [name]: value
    });

    // If travel time or mode changes, update the map
    if ((name === "travelTime" || name === "travelMode") && 
        locationData.postcode && 
        mapCenter.lat !== 20.5937) {
      updateMapCircle();
    }
  };

  // Update map circle when travel parameters change
  const updateMapCircle = () => {
    if (!mapRef.current || !window.google) return;
    
    const map = new window.google.maps.Map(mapRef.current, {
      center: mapCenter,
      zoom: 12,
    });

    const marker = new window.google.maps.Marker({
      position: mapCenter,
      map,
    });

    const radiusInMeters = calculateTravelRadius(locationData.travelTime, locationData.travelMode);
    const circle = new window.google.maps.Circle({
      map: map,
      radius: radiusInMeters,
      fillColor: '#4285F4',
      fillOpacity: 0.15,
      strokeColor: '#4285F4',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      center: mapCenter,
    });

    map.fitBounds(circle.getBounds());
  };

  // Handle next button click
  const handleNext = () => {
    console.log("Form submitted with data:", locationData);
    // Add your logic here
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2 className={styles.title}>Travel time</h2>

        <p className={styles.description}>
          <span className={styles.infoIcon}>
            <img src={iIcon} alt="" />
          </span>
          Enter a Postcode or town, the maximum time you'd spend travelling, and
          the mode of transport you'd use.
        </p>

        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Postcode / City</label>
            <input
              ref={inputRef}
              type="text"
              name="postcode"
              value={locationData.postcode}
              onChange={onChange}
              placeholder="Enter postcode or city"
              autoComplete="off"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Travel time</label>
            <select
              name="travelTime"
              value={locationData.travelTime}
              onChange={onChange}
            >
              <option value="30 minutes">30 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="1.5 hours">1.5 hours</option>
              <option value="2 hours">2 hours</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Travelling by</label>
            <select
              name="travelMode"
              value={locationData.travelMode}
              onChange={onChange}
            >
              <option value="Driving">Driving</option>
              <option value="Walking">Walking</option>
              <option value="Biking">Biking</option>
              <option value="Public Transport">Public Transport</option>
            </select>
          </div>
        </div>

        {/* Google Map Container */}
        <div 
          ref={mapRef} 
          className={styles.mapContainer}
          style={{ 
            width: "100%", 
            height: "250px", 
            marginTop: "20px", 
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />
        
        {!mapLoaded && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            Loading map...
          </div>
        )}

        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.nextButton} onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelTimeModal;