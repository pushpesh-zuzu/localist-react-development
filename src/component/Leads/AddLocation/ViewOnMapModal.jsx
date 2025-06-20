import React, { useEffect, useRef, useState } from "react";
import styles from "./ViewOnMapModal.module.css";

const ViewOnMapModal = ({
  open,
  locationData,
  onChange,
  onCancel,
  onClose,
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapCenter, setMapCenter] = useState({
    lat: 20.5937, // Default center (India)
    lng: 78.9629,
  });
  console.log(locationData?.travel_time,"locationData")

 
  const drawCircle = (center) => {
    if (!window.google || !mapInstance.current) return;
    
    // Remove existing circle if any
    if (circleRef.current) {
      circleRef.current.setMap(null);
    }
    
    let radiusInMeters = 0;
    
    if (locationData.type === "Nationwide" && locationData.nation_wide == 1) {
      // Rough estimate to cover India (1500 km ~ 932 miles)
      radiusInMeters = 1500000;
    } else if (locationData?.travel_time) {
      // Convert travel time to approximate radius in meters
      // Assuming average travel speed of 30 km/h in urban areas
      // Parse the travel time value
      let timeValue = locationData.travel_time;
      let minutes = 0;
      
      if (timeValue.includes("hour") || timeValue.includes("hr")) {
        // Handle hours format (e.g., "1 hour", "1.5 hours")
        const hourValue = parseFloat(timeValue.replace(/[^0-9.]/g, ''));
        minutes = hourValue * 60;
      } else if (timeValue.includes("min")) {
        // Handle minutes format (e.g., "30 min", "45 min")
        minutes = parseFloat(timeValue.replace(/[^0-9.]/g, ''));
      }
      
      // Calculate radius: speed (km/h) * time (h) * 1000 (to meters)
      // 30 km/h ÷ 60 min/h = 0.5 km/min
      radiusInMeters = minutes * 0.5 * 1000;
    } else {
      // Use the radius in miles from locationData (default 1 mile)
      const radiusInMiles = parseFloat(locationData.miles) || 1;
      radiusInMeters = radiusInMiles * 1609.34;
    }
    
    // Create the circle
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
      // Load Google Maps API if not already loaded
      if (!window.google) {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyCDR6sXvlQktXyC_0YsdiwlglSL2OkMSzY&libraries=places,geometry";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setMapLoaded(true);
          initMap();
        };
        document.body.appendChild(script);
      } else {
        setMapLoaded(true);
        initMap();
      }
    };

    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      // Initialize the map
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 10,
      });
    };

    loadGoogleMapsScript();
  }, [open]);




  const getLatLngFromPincode = async (pincode) => {
    const apiKey = "AIzaSyDwAeV7juA_VpzLHqmKXACBtcZxR52TwoE"; // Replace with your real API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationData?.postcode}&components=country:IN&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        throw new Error("Location not found for the given pincode");
      }
    } catch (error) {
      console.error("Geocoding error:", error.message);
      return null;
    }
  };

//   useEffect(() => {
//     const fetchLatLng = async () => {
//       if (!locationData?.postcode || !mapLoaded || !window.google || !mapInstance.current) return;

//       try {
//         const coords = await getLatLngFromPincode(locationData?.postcode);
//         const newCenter = { lat: coords.lat, lng: coords.lng };
//         // setMapCenter(newCenter);
//         console.log(newCenter,"new")

//         // Center the map
//         mapInstance.current.setCenter(newCenter);
//         mapInstance.current.setZoom(12);

//         // Remove previous marker if exists
//         if (markerRef.current) {
//           markerRef.current.setMap(null);
//         }

//         // Create new marker
//         markerRef.current = new window.google.maps.Marker({
//           position: newCenter,
//           map: mapInstance.current,
//         });

//         // Draw the circle
//         drawCircle(newCenter);
//       } catch (error) {
//         console.error("Error setting map location:", error);
//       }
//     };

//     fetchLatLng();
//   }, [mapLoaded, locationData?.postcode]);






  // Effect to update map when modal opens with a postcode
 
  useEffect(() => {
    const fetchLatLng = async () => {
      if (!mapLoaded || !window.google || !mapInstance.current) return;
  
      let newCenter;
  
      if (locationData.type === "Nationwide" && locationData.nation_wide == 1){
        newCenter = { lat: 22.9734, lng: 78.6569 }; // Center of India
      } else if (locationData?.postcode) {
        try {
          const coords = await getLatLngFromPincode(locationData.postcode);
          newCenter = { lat: coords.lat, lng: coords.lng };
        } catch (error) {
          console.error("Error fetching location:", error);
          return;
        }
      }
  
      if (newCenter) {
        setMapCenter(newCenter);
        mapInstance.current.setCenter(newCenter);
        mapInstance.current.setZoom((locationData.type === "Nationwide" && locationData.nation_wide == 1) ? 2 : 12);
  
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }
  
        markerRef.current = new window.google.maps.Marker({
          position: newCenter,
          map: mapInstance.current,
        });
  
        drawCircle(newCenter);
      }
    };
  
    fetchLatLng();
  }, [mapLoaded, locationData?.postcode, locationData?.type]);
  
 
 
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
                    console.log(newCenter,"123")

              // Draw the circle with the new center
              drawCircle(newCenter);
            }
          }
        }
      );
    }
  }, [open, mapLoaded]);

  // Effect to redraw the circle when radius (miles) changes
  useEffect(() => {
    if (mapLoaded && mapCenter.lat !== 20.5937) {
      drawCircle(mapCenter);
    }
  }, [locationData.miles]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalHeader}>
          <h2>{(locationData.type === "Nationwide" && locationData.nation_wide == 1) ? locationData?.type : locationData?.city}</h2>
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
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOnMapModal;

