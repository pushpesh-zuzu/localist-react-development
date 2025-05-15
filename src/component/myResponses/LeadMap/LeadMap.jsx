// import React, { useEffect, useRef, useState } from "react";

// const LeadMap = ({ getPendingLeadList }) => {
//   const postCodeData = getPendingLeadList?.map((item) => item?.postcode);

//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const markerRef = useRef(null);
//   const circleRef = useRef(null);

//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [mapCenter, setMapCenter] = useState({
//     lat: 20.5937, // Default center (India)
//     lng: 78.9629,
//   });

//   // Function to draw circle
//   const drawCircle = (center, radiusInMiles = 1) => {
//     if (!window.google || !mapInstance.current) return;

//     if (circleRef.current) {
//       circleRef.current.setMap(null);
//     }

//     const radiusInMeters = radiusInMiles * 1609.34;

//     circleRef.current = new window.google.maps.Circle({
//       center,
//       radius: radiusInMeters,
//       fillColor: "#007BFF",
//       fillOpacity: 0.2,
//       strokeColor: "#007BFF",
//       strokeOpacity: 0.7,
//       strokeWeight: 2,
//       map: mapInstance.current,
//     });
//   };

//   // Load Google Maps API and initialize map
//   useEffect(() => {
//     const loadGoogleMapsScript = () => {
//       if (!window.google) {
//         const script = document.createElement("script");
//         script.src =
//           "https://maps.googleapis.com/maps/api/js?key=AIzaSyDwAeV7juA_VpzLHqmKXACBtcZxR52TwoE&libraries=places,geometry";
//         script.async = true;
//         script.defer = true;
//         script.onload = () => {
//           setMapLoaded(true);
//           initMap();
//         };
//         document.body.appendChild(script);
//       } else {
//         setMapLoaded(true);
//         initMap();
//       }
//     };

//     const initMap = () => {
//       if (!mapRef.current || !window.google) return;

//       mapInstance.current = new window.google.maps.Map(mapRef.current, {
//         center: mapCenter,
//         zoom: 10,
//       });
//     };

//     loadGoogleMapsScript();
//   }, []);

//   // Get lat/lng from postcode
//   const getLatLngFromPincode = async (pincode) => {
//     const apiKey = "AIzaSyDwAeV7juA_VpzLHqmKXACBtcZxR52TwoE";
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&components=country:IN&key=${apiKey}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.status === "OK" && data.results.length > 0) {
//         const { lat, lng } = data.results[0].geometry.location;
//         return { lat, lng };
//       } else {
//         throw new Error("Location not found for the given pincode");
//       }
//     } catch (error) {
//       console.error("Geocoding error:", error.message);
//       return null;
//     }
//   };

//   // Fetch lat/lng for first postcode and draw circle
//   useEffect(() => {
//     const fetchLatLng = async () => {
//       if (!mapLoaded || !window.google || !mapInstance.current || !postCodeData[0]) return;

//       try {
//         const coords = await getLatLngFromPincode(postCodeData[0]);
//         if (!coords) return;

//         const newCenter = { lat: coords.lat, lng: coords.lng };
//         setMapCenter(newCenter);
//         mapInstance.current.setCenter(newCenter);
//         mapInstance.current.setZoom(12);

//         if (markerRef.current) {
//           markerRef.current.setMap(null);
//         }

//         markerRef.current = new window.google.maps.Marker({
//           position: newCenter,
//           map: mapInstance.current,
//         });

//         drawCircle(newCenter, 1); // Default 1-mile radius
//       } catch (error) {
//         console.error("Error fetching location:", error);
//       }
//     };

//     fetchLatLng();
//   }, [mapLoaded, postCodeData[0]]);

//   return (
//     <>
//       <div
//         ref={mapRef}
//         style={{
//           width: "100%",
//           height: "250px",
//           marginTop: "20px",
//           borderRadius: "8px",
//         }}
//       />
//     </>
//   );
// };

// export default LeadMap;

// import React, { useEffect, useRef, useState } from "react";

// const LeadMap = ({ getPendingLeadList }) => {
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const markersRef = useRef([]);
//   const circlesRef = useRef([]);
//   console.log(getPendingLeadList,"getPendingLeadList")

//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [mapCenter, setMapCenter] = useState({
//     lat: 20.5937, // Default center (India)
//     lng: 78.9629,
//   });

//   const apiKey = "AIzaSyDwAeV7juA_VpzLHqmKXACBtcZxR52TwoE";

//   // Load Google Maps script
//   useEffect(() => {
//     const loadGoogleMapsScript = () => {
//       if (!window.google) {
//         const script = document.createElement("script");
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
//         script.async = true;
//         script.defer = true;
//         script.onload = () => {
//           setMapLoaded(true);
//           initMap();
//         };
//         document.body.appendChild(script);
//       } else {
//         setMapLoaded(true);
//         initMap();
//       }
//     };

//     const initMap = () => {
//       if (!mapRef.current || !window.google) return;

//       mapInstance.current = new window.google.maps.Map(mapRef.current, {
//         center: mapCenter,
//         zoom: 5,
//       });
//     };

//     loadGoogleMapsScript();
//   }, []);

//   // Fetch lat/lng from a single postcode
//   const getLatLngFromPincode = async (pincode) => {
   
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&components=country:IN&key=${apiKey}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.status === "OK" && data.results.length > 0) {
//         const { lat, lng } = data.results[0].geometry.location;
//         return { lat, lng };
//       } else {
//         throw new Error("Location not found");
//       }
//     } catch (error) {
//       console.error("Geocoding error:", error.message);
//       return null;
//     }
//   };

//   // Draw a circle on the map
//   const drawCircle = (center, radiusInMiles = 1) => {
//     if (!window.google || !mapInstance.current) return;

//     const radiusInMeters = radiusInMiles * 1609.34;

//     const circle = new window.google.maps.Circle({
//       center,
//       radius: radiusInMeters,
//       fillColor: "#007BFF",
//       fillOpacity: 0.2,
//       strokeColor: "#007BFF",
//       strokeOpacity: 0.7,
//       strokeWeight: 2,
//       map: mapInstance.current,
//     });

//     circlesRef.current.push(circle);
//   };

//   // Add multiple markers & circles based on postcodes
//   useEffect(() => {
//     const plotPostcode = async () => {
//       if (!mapLoaded || !getPendingLeadList) return;
  
//       // Clear previous markers & circles
//       markersRef.current.forEach((marker) => marker.setMap(null));
//       circlesRef.current.forEach((circle) => circle.setMap(null));
//       markersRef.current = [];
//       circlesRef.current = [];
  
//       const pincode = getPendingLeadList; // direct string like "303014"
//       const coords = await getLatLngFromPincode(pincode);
//       if (!coords) return;
  
//       const marker = new window.google.maps.Marker({
//         position: coords,
//         map: mapInstance.current,
//       });
//       markersRef.current.push(marker);
  
//       drawCircle(coords);
  
//       mapInstance.current.setCenter(coords);
//       mapInstance.current.setZoom(10);
//     };
  
//     plotPostcode();
//   }, [mapLoaded, getPendingLeadList]);
  

//   return (
//     <div
//       ref={mapRef}
//       style={{
//         width: "500px",
//         height: "300px",
//         marginTop: "20px",
//         borderRadius: "8px",
//       }}
//     />
//   );
// };

// export default LeadMap;

import React, { useEffect, useRef, useState } from "react";

const LeadMap = ({ getPendingLeadList }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const circlesRef = useRef([]);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapCenter] = useState({
    lat: 20.5937, // Default center (India)
    lng: 78.9629,
  });

  const apiKey = "AIzaSyDwAeV7juA_VpzLHqmKXACBtcZxR52TwoE";

  // Load Google Maps script
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
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

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 5,
      });
    };

    loadGoogleMapsScript();
  }, []);

  // Convert pincode to lat/lng
  const getLatLngFromPincode = async (pincode) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&components=country:IN&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        console.error("Location not found for:", pincode);
        return null;
      }
    } catch (error) {
      console.error("Geocoding error:", error.message);
      return null;
    }
  };

  // Draw a circle
  const drawCircle = (center, radiusInMiles = 1) => {
    if (!window.google || !mapInstance.current) return;

    const radiusInMeters = radiusInMiles * 1609.34;

    const circle = new window.google.maps.Circle({
      center,
      radius: radiusInMeters,
      fillColor: "#007BFF",
      fillOpacity: 0.2,
      strokeColor: "#007BFF",
      strokeOpacity: 0.7,
      strokeWeight: 2,
      map: mapInstance.current,
    });

    circlesRef.current.push(circle);
  };

  // Plot single pincode
  useEffect(() => {
    const plotPostcode = async () => {
      if (!mapLoaded || !getPendingLeadList) return;

      // Clear old markers/circles
      markersRef.current.forEach((marker) => marker.setMap(null));
      circlesRef.current.forEach((circle) => circle.setMap(null));
      markersRef.current = [];
      circlesRef.current = [];

      const pincode = getPendingLeadList; // Direct pincode string like "303014"
      const coords = await getLatLngFromPincode(pincode);
      if (!coords) return;

      const marker = new window.google.maps.Marker({
        position: coords,
        map: mapInstance.current,
      });
      markersRef.current.push(marker);

      drawCircle(coords);

      mapInstance.current.setCenter(coords);
      mapInstance.current.setZoom(10);
    };

    plotPostcode();
  }, [mapLoaded, getPendingLeadList]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "500px",
        height: "300px",
        marginTop: "20px",
        borderRadius: "8px",
      }}
    />
  );
};

export default LeadMap;
