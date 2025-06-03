
// import React, { useEffect, useRef, useState } from "react";
// import styles from "./DrawOnMapModal.module.css";
// import iIcon from "../../../assets/Images/iIcon.svg";

// const DrawOnMapModal = ({ onClose }) => {
//   const mapRef = useRef(null);
//   const [map, setMap] = useState(null);
//   const [drawingManager, setDrawingManager] = useState(null);
//   const [polygons, setPolygons] = useState([]);
//   const [isDrawingActive, setIsDrawingActive] = useState(false);
//   const [selectedPolygonIndex, setSelectedPolygonIndex] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     // Load Google Maps API if not already loaded
//     const loadGoogleMapsScript = () => {
//       if (!window.google || !window.google.maps || !window.google.maps.drawing) {
//         const script = document.createElement("script");
//         script.src =
//           "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places,drawing,geometry&callback=initMap";
//         script.async = true;
//         script.defer = true;
        
//         // Define the callback globally
//         window.initMap = () => {
//           if (mapRef.current) {
//             initializeMap();
//           }
//         };
        
//         document.body.appendChild(script);
//       } else {
//         initializeMap();
//       }
//     };

//     const initializeMap = () => {
//       const center = { lat: 20.5937, lng: 78.9629 }; // Center of India
//       const mapOptions = {
//         center,
//         zoom: 5,
//         mapTypeControl: true,
//         streetViewControl: false,
//         fullscreenControl: true,
//       };
      
//       const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
//       setMap(newMap);
      
//       // Initialize DrawingManager but don't activate it yet
//       const manager = new window.google.maps.drawing.DrawingManager({
//         drawingMode: null, // Start with no drawing mode active
//         drawingControl: false, // Hide the default drawing controls
//         polygonOptions: {
//           fillColor: "#4285F4",
//           fillOpacity: 0.3,
//           strokeWeight: 2,
//           strokeColor: "#4285F4",
//           clickable: true,
//           editable: false,
//           zIndex: 1,
//         },
//       });
      
//       setDrawingManager(manager);
      
//       // Add listener for polygon completion
//       window.google.maps.event.addListener(manager, "overlaycomplete", (event) => {
//         if (event.type === window.google.maps.drawing.OverlayType.POLYGON) {
//           const polygon = event.overlay;
          
//           // Add this polygon to our state
//           setPolygons((prev) => [...prev, polygon]);
          
//           // Extract coordinates
//           const path = polygon.getPath();
//           const coordinates = Array.from({ length: path.getLength() }, (_, i) => {
//             const point = path.getAt(i);
//             return { lat: point.lat(), lng: point.lng() };
//           });
          
//           console.log("Polygon",path, coordinates);
          
//           // Turn off drawing mode after completion
//           manager.setDrawingMode(null);
//           setIsDrawingActive(false);
//         }
//       });
//     };

//     loadGoogleMapsScript();
    
//     // Cleanup function
//     return () => {
//       if (drawingManager) {
//         drawingManager.setMap(null);
//       }
//       if (polygons.length > 0) {
//         polygons.forEach(polygon => polygon.setMap(null));
//       }
//     };
//   }, []);
  
//   // Setup map click listener when edit mode or map changes
//   useEffect(() => {
//     if (!map) return;
    
//     // Create a click listener for polygon selection
//     const clickListener = window.google.maps.event.addListener(map, 'click', (event) => {
//       // If we're not in edit mode, don't do anything
//       if (!isEditMode) return;
      
//       let polygonClicked = false;
      
//       // Check if the click is on a polygon
//       for (let i = 0; i < polygons.length; i++) {
//         try {
//           // First check using point in polygon (if geometry library is available)
//           if (window.google.maps.geometry && window.google.maps.geometry.poly) {
//             if (window.google.maps.geometry.poly.containsLocation(event.latLng, polygons[i])) {
//               selectPolygon(i);
//               polygonClicked = true;
//               break;
//             }
//           } else {
//             // Fallback: use bounds checking (less accurate but works without geometry library)
//             const bounds = new window.google.maps.LatLngBounds();
//             const path = polygons[i].getPath();
//             path.forEach(point => bounds.extend(point));
            
//             if (bounds.contains(event.latLng)) {
//               selectPolygon(i);
//               polygonClicked = true;
//               break;
//             }
//           }
//         } catch (error) {
//           console.error("Error checking polygon:", error);
//           continue;
//         }
//       }
      
//       // If click wasn't on a polygon, deselect current polygon
//       if (!polygonClicked && selectedPolygonIndex !== null) {
//         deselectPolygon();
//       }
//     });
  
//     return () => {
//       window.google.maps.event.removeListener(clickListener);
//     };
//   }, [map, isEditMode, polygons, selectedPolygonIndex]);
  
//   // Make each polygon clickable when created
//   useEffect(() => {
//     polygons.forEach((polygon, index) => {
//       // Add click listener to each polygon
//       window.google.maps.event.clearListeners(polygon, 'click');
      
//       window.google.maps.event.addListener(polygon, 'click', () => {
//         if (isEditMode) {
//           selectPolygon(index);
//         }
//       });
//     });
//   }, [polygons, isEditMode]);

//   // Function to check if a location is on a polygon
//   const isLocationOnPolygon = (location, polygon) => {
//     try {
//       // First check if the geometry library is loaded
//       if (!window.google.maps.geometry || !window.google.maps.geometry.poly) {
//         console.error("Google Maps Geometry library not loaded");
//         return false;
//       }
      
//       return window.google.maps.geometry.poly.containsLocation(location, polygon);
//     } catch (error) {
//       console.error("Error checking if location is on polygon:", error);
//       return false;
//     }
//   };
  
//   // Function to select a polygon for editing or removal
//   const selectPolygon = (index) => {
//     // First deselect any currently selected polygon
//     deselectPolygon();
    
//     // Then select the new one
//     setSelectedPolygonIndex(index);
    
//     // Make the polygon editable
//     polygons[index].setOptions({
//       editable: true,
//       fillColor: "#FF5722", // Change color to indicate selection
//       strokeColor: "#FF5722"
//     });
//   };
  
//   // Function to deselect the currently selected polygon
//   const deselectPolygon = () => {
//     if (selectedPolygonIndex !== null && polygons[selectedPolygonIndex]) {
//       polygons[selectedPolygonIndex].setOptions({
//         editable: false,
//         fillColor: "#4285F4",
//         strokeColor: "#4285F4"
//       });
//       setSelectedPolygonIndex(null);
//     }
//   };
  
//   const handleAddArea = () => {
//     if (!map || !drawingManager) {
//       console.error("Map or drawing manager not initialized");
//       return;
//     }
    
//     // Exit edit mode if it was active
//     if (isEditMode) {
//       setIsEditMode(false);
//       deselectPolygon();
//     }

//     // Set the drawing manager on the map
//     drawingManager.setMap(map);
//     drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.POLYGON);
//     setIsDrawingActive(true);
    
//     // Show instructions to the user
//     console.log("Click on the map to start drawing a polygon");
//   };
  
//   // Handle Edit Area Mode
//   const handleEditAreaMode = () => {
//     setIsEditMode(!isEditMode);
    
//     if (isEditMode) {
//       // Exiting edit mode, deselect any polygon
//       deselectPolygon();
//     } else {
//       // Entering edit mode
//       if (drawingManager) {
//         drawingManager.setDrawingMode(null);
//         drawingManager.setMap(null);
//       }
//       setIsDrawingActive(false);
      
//       // Show instruction to the user
//       console.log("Click on a polygon to edit it");
//     }
//   };

//   const handleRemoveArea = () => {
//     if (polygons.length === 0) return;

//     if (selectedPolygonIndex !== null) {
//       // Remove the selected polygon
//       polygons[selectedPolygonIndex].setMap(null);
      
//       // Update state
//       setPolygons(prevPolygons => 
//         prevPolygons.filter((_, index) => index !== selectedPolygonIndex)
//       );
      
//       // Reset selection
//       setSelectedPolygonIndex(null);
//     } else {
//       // If no polygon is selected, remove the last one
//       const lastPolygon = polygons[polygons.length - 1];
//       lastPolygon.setMap(null);
      
//       // Update state
//       setPolygons(prevPolygons => prevPolygons.slice(0, -1));
//     }
    
//     // Exit edit mode if it was active
//     if (isEditMode) {
//       setIsEditMode(false);
//     }
//   };

//   const handleSubmit = () => {
//     // Collect all polygon coordinates
//     const allPolygonData = polygons.map(polygon => {
//       const path = polygon.getPath();
//       return Array.from({ length: path.getLength() }, (_, i) => {
//         const point = path.getAt(i);
//         return { lat: point.lat(), lng: point.lng() };
//       });
//     });
    
//     console.log("All",path, allPolygonData);
    
//     // Here you would send the data to your backend
//     // sendToBackend(allPolygonData);
    
//     // Close modal
//     onClose();
//   };
//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContainer}>
//         <button className={styles.closeButton} onClick={onClose}>
//           &times;
//         </button>

//         <h2 className={styles.title}>Draw on a map</h2>

//         <p className={styles.description}>
//           <span className={styles.infoIcon}>
//             <img src={iIcon} alt="Info" />
//           </span>
//           You can add multiple drawn areas to define the specific places you
//           provide services.
//         </p>

//         <div className={styles.areaButtonGroup}>
//           <button 
//             className={`${styles.areaButton} ${isDrawingActive ? styles.activeButton : ''}`} 
//             onClick={handleAddArea}
//             disabled={isEditMode}
//           >
//             + Add new area
//           </button>
//           <button 
//             className={`${styles.areaButton} ${isEditMode ? styles.activeButton : ''}`}
//             onClick={handleEditAreaMode}
//             disabled={polygons.length === 0}
//           >
//             🖉 Edit an area
//           </button>
//           <button 
//             className={styles.areaButton} 
//             onClick={handleRemoveArea}
//             disabled={polygons.length === 0}
//           >
//             ⬤ Remove an area {selectedPolygonIndex !== null ? '(Selected)' : ''}
//           </button>
//         </div>

//         <div
//           ref={mapRef}
//           style={{ width: "100%", height: "400px", margin: "16px 0" }}
//         ></div>

//         <div className={styles.buttonContainer}>
//           <button className={styles.cancelButton} onClick={onClose}>
//             Cancel
//           </button>
//           <button 
//             className={styles.nextButton} 
//             onClick={handleSubmit}
//             disabled={polygons.length === 0}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DrawOnMapModal;
import React, { useEffect, useRef, useState } from "react";
import styles from "./DrawOnMapModal.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";
import { useSelector } from "react-redux";
import RemoveLocation from "../../../assets/Images/Leads/RemoveLocationImg.svg"
import AddLocation from "../../../assets/Images/Leads/AddLocationImg.svg"
import EditLocation from "../../../assets/Images/Leads/EditlocationImg.svg"


const DrawOnMapModal = ({ onClose,onNext,locationData,setLocationData,data,isEdit }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [drawingManager, setDrawingManager] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const [selectedPolygonIndex, setSelectedPolygonIndex] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [geocoder, setGeocoder] = useState(null);
  const [polygonAddresses, setPolygonAddresses] = useState([]);
  const { getlocationData } = useSelector((state) => state.leadSetting)
  const[isAreaRemoved,setIsAreaRemoved]=useState(false)

  // const [locationData,setLocationData] = useState("");
console.log(getlocationData,polygons,data,"locationData")
  useEffect(() => {
    // Load Google Maps API if not already loaded
    const loadGoogleMapsScript = () => {
      if (!window.google || !window.google.maps || !window.google.maps.drawing) {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyDwAeV7juA_VpzLHqmKXACBtcZxR52TwoE&libraries=places,drawing,geometry&callback=initMap";
        script.async = true;
        script.defer = true;
        
        // Define the callback globally
        window.initMap = () => {
          if (mapRef.current) {
            // initializeMap();
            addInitializeMap()
          }
        };
        
        document.body.appendChild(script);
      } else {
        if(isEdit){
        
         
          
         
          editInitializeMap()
        }else{

          addInitializeMap();
        }
      }
    };
const  locationData=data;

const editInitializeMap = () => {
  const center = { lat: 20.5937, lng: 78.9629 };
  const mapOptions = {
    center,
    zoom: 5,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true,
  };

  const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
  setMap(newMap);

  const newGeocoder = new window.google.maps.Geocoder();
  setGeocoder(newGeocoder);

  const polygon = new window.google.maps.Polygon({
    paths: locationData,
    fillColor: "red",
    fillOpacity: 0.3,
    strokeWeight: 2,
    strokeColor: "red",
    clickable: true,
    editable: false,
    map: newMap,
  });

  setPolygons(prev => [...prev, polygon]);

  const bounds = new window.google.maps.LatLngBounds();
  locationData?.forEach(coord => {
    bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng));
  });

  const centerPoint = bounds.getCenter();
  console.log("Polygon center for geocoding:", centerPoint.lat(), centerPoint.lng());
  getGeocodeDetails(centerPoint).then(({ city, pincode }) => {
    const data = {
      city,
      postcode: pincode,
      miles: 0,
      coordinates: JSON.stringify(locationData),
    };
  
    setLocationData(data);
  });

  fetchAddressDetails(centerPoint, prev => [...prev, null]);

  locationData?.forEach((coord, index) => {
    const latLng = new window.google.maps.LatLng(coord.lat, coord.lng);
    console.log(latLng,"latLng")
    setTimeout(() => {
      newGeocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const addressComponents = results[0].address_components;
          let pincode = '';
          let city = '';

          addressComponents.forEach(component => {
            if (component.types.includes('postal_code')) {
              pincode = component.long_name;
            }
            if (component.types.includes('locality') || 
                component.types.includes('administrative_area_level_2')) {
              city = component.long_name;
            }
          });

          console.log(`Vertex ${index} - City: ${city || 'Not found'}, Pincode: ${pincode || 'Not found'}`);
        } else {
          console.error(`Geocoder failed for vertex ${index} due to: ${status}`);
        }
      });
    }, index * 300);
  });

  const manager = new window.google.maps.drawing.DrawingManager({
    drawingMode: null,
    drawingControl: false,
    polygonOptions: {
      fillColor: "red",
      fillOpacity: 0.3,
      strokeWeight: 2,
      strokeColor: "red",
      clickable: true,
      editable: false,
      zIndex: 1,
    },
  });

  setDrawingManager(manager);
};
const enablePolygonEditing = (polygon) => {
  polygon.setEditable(true);

  const path = polygon.getPath();

  const logUpdatedPath = () => {
    const updatedCoords = [];
    for (let i = 0; i < path.getLength(); i++) {
      const latLng = path.getAt(i);
      updatedCoords.push({ lat: latLng.lat(), lng: latLng.lng() });
    }
    console.log("Updated1223", updatedCoords);
  };

  path.addListener('set_at', logUpdatedPath);
  path.addListener('insert_at', logUpdatedPath);
  path.addListener('remove_at', logUpdatedPath);
};
const handleEditAreaMode = () => {
  setIsEditMode(!isEditMode);

  if (isEditMode) {
    // Exiting edit mode
    polygons.forEach(polygon => polygon.setEditable(false));
    deselectPolygon();
  } else {
    // Entering edit mode
    if (drawingManager) {
      drawingManager.setDrawingMode(null);
      drawingManager.setMap(null);
    }
    setIsDrawingActive(false);

    polygons.forEach((polygon, index) => {
      polygon.addListener('click', () => {
        polygons.forEach(p => p.setEditable(false));
        enablePolygonEditing(polygon);

        console.log(polygon,)
        setSelectedPolygonIndex(index);
        console.log(`Polygon ${index} selected for editing`);
      });
    });

    console.log("Click on a polygon to edit it");
  }
};


// const editInitializeMap = () => {

//   const center = { lat: 20.5937, lng: 78.9629 }; // Center of India
//   const mapOptions = {
//     center,
//     zoom: 5,
//     mapTypeControl: true,
//     streetViewControl: false,
//     fullscreenControl: true,
//   };

//   const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
//   setMap(newMap);

//   const newGeocoder = new window.google.maps.Geocoder();
//   setGeocoder(newGeocoder);

//   // Draw the polygon based on locationData
//   const polygon = new window.google.maps.Polygon({
//     paths: locationData,
//     fillColor: "red",
//     fillOpacity: 0.3,
//     strokeWeight: 2,
//     strokeColor: "red",
//     clickable: true,
//     editable: false,
//     map: newMap, // Add polygon to the map
//   });

//   // Save polygon to state
//   setPolygons(prev => [...prev, polygon]);

//   // Compute center for geocoding
//   const bounds = new window.google.maps.LatLngBounds();
//   locationData?.forEach(coord => {
//     bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng));
//   });
//   const centerPoint = bounds.getCenter();
//   console.log("Polygon center for geocoding:", centerPoint.lat(), centerPoint.lng());

//   fetchAddressDetails(centerPoint, prev => [...prev, null]);
// console.log(locationData,"loc")
//   // Geocode each vertex
//   locationData?.forEach((coord, index) => {
//     const latLng = new window.google.maps.LatLng(coord.lat, coord.lng);
//     setTimeout(() => {
//       newGeocoder.geocode({ location: latLng }, (results, status) => {
//         if (status === 'OK' && results[0]) {
//           const addressComponents = results[0].address_components;
//           let pincode = '';
//           let city = '';

//           addressComponents.forEach(component => {
//             if (component.types.includes('postal_code')) {
//               pincode = component.long_name;
//             }
//             if (component.types.includes('locality') || 
//                 component.types.includes('administrative_area_level_2')) {
//               city = component.long_name;
//             }
//           });

//           console.log(`Vertex ${index} - City: ${city || 'Not found'}, Pincode: ${pincode || 'Not found'}`);
//         } else {
//           console.error(`Geocoder failed for vertex ${index} due to: ${status}`);
//         }
//       });
//     }, index * 300);
//   });

//   // Optional: setup drawing manager if needed later
//   const manager = new window.google.maps.drawing.DrawingManager({
//     drawingMode: null,
//     drawingControl: false,
//     polygonOptions: {
//       fillColor: "red",
//       fillOpacity: 0.3,
//       strokeWeight: 2,
//       strokeColor: "red",
//       clickable: true,
//       editable: false,
//       zIndex: 1,
//     },
//   });

//   setDrawingManager(manager);
  
// };

const addInitializeMap = () => {
 
  const center = { lat: 20.5937, lng: 78.9629 }; // Center of India
  const mapOptions = {
    center,
    zoom: 5,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true,
  };
  
  const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
  setMap(newMap);
  
  // Initialize geocoder
  const newGeocoder = new window.google.maps.Geocoder();
  setGeocoder(newGeocoder);
  
  // Initialize DrawingManager but don't activate it yet
  const manager = new window.google.maps.drawing.DrawingManager({
    drawingMode: null, // Start with no drawing mode active
    drawingControl: false, // Hide the default drawing controls
    polygonOptions: {
      fillColor: "#4285F4",
      fillOpacity: 0.3,
      strokeWeight: 2,
      strokeColor: "#4285F4",
      clickable: true,
      editable: false,
      zIndex: 1,
    },
  });
  setDrawingManager(manager);
  
  // Add listener for polygon completion
  window.google.maps.event.addListener(manager, "overlaycomplete", (event) => {
    if (event.type === window.google.maps.drawing.OverlayType.POLYGON) {
      const polygon = event.overlay;
      
      // Add this polygon to our state
      setPolygons((prev) => [...prev, polygon]);
      
      // Extract coordinates
      const path = polygon.getPath();
      const coordinates = Array.from({ length: path.getLength() }, (_, i) => {
        const point = path.getAt(i);
        return { lat: point.lat(), lng: point.lng() };
      });
      
      console.log("Polygon coordinates:", coordinates);
      
      // Get the center point of the polygon for geocoding
      const bounds = new window.google.maps.LatLngBounds();
      coordinates.forEach((coord) => {
        bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng));
      });
      const center = bounds.getCenter();
      
      console.log("Polygon center for geocoding:", center.lat(), center.lng());
      
      // Fetch address details for this polygon
      fetchAddressDetails(center, prev => [...prev, null]);
      
      // Also geocode each vertex of the polygon to find pincodes and cities
      coordinates.forEach((coord, index) => {
        const latLng = new window.google.maps.LatLng(coord.lat, coord.lng);
        // console.log(Geocoding vertex ${index}:, coord.lat, coord.lng);
        
        // Use a timeout to avoid hitting geocoding rate limits
        setTimeout(() => {
          geocoder?.geocode({ location: latLng }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const addressComponents = results[0].address_components;
              let pincode = '';
              let city = '';
              
              // Extract pincode and city
              addressComponents.forEach(component => {
                if (component.types.includes('postal_code')) {
                  pincode = component.long_name;
                }
                if (component.types.includes('locality') || 
                    component.types.includes('administrative_area_level_2')) {
                  city = component.long_name;
                }
              });
              
              // console.log(Vertex ${index} - City: ${city || 'Not found'}, Pincode: ${pincode || 'Not found'});
            } else {
              // console.error(Geocoder failed for vertex ${index} due to: ${status});
            }
          });
        }, index * 300); // Stagger requests by 300ms each
      });
      
      // Turn off drawing mode after completion
      manager.setDrawingMode(null);
      setIsDrawingActive(false);
    }
  });
};

    // const addInitializeMap = () => {
    
    //   const center = { lat: 20.5937, lng: 78.9629 }; // Center of India
    //   const mapOptions = {
    //     center,
    //     zoom: 5,
    //     mapTypeControl: true,
    //     streetViewControl: false,
    //     fullscreenControl: true,
    //   };
      
    //   const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    //   setMap(newMap);
      
    //   // Initialize geocoder
    //   const newGeocoder = new window.google.maps.Geocoder();
    //   setGeocoder(newGeocoder);
      
    //   // Initialize DrawingManager but don't activate it yet
    //   const manager = new window.google.maps.drawing.DrawingManager({
    //     drawingMode: null, // Start with no drawing mode active
    //     drawingControl: false, // Hide the default drawing controls
    //     polygonOptions: {
    //       fillColor: "red",
    //       fillOpacity: 0.3,
    //       path: locationData,
    //       strokeWeight: 2,
    //       strokeColor: "red",
    //       clickable: true,
    //       editable: false,
    //       zIndex: 1,
    //     },
    //   });
      
    //   setDrawingManager(manager);
      
    //   // Add listener for polygon completion
    //   window.google.maps.event.addListener(manager, "overlaycomplete", (event) => {
    //     if (event.type === window.google.maps.drawing.OverlayType.POLYGON) {
    //       const polygon = event.overlay;
          
    //       // Add this polygon to our state
    //       setPolygons((prev) => [...prev, polygon,locationData]);
          
    //       // Extract coordinates
    //       const path = polygon.getPath();
    //       const coordinates = Array.from({ length: path.getLength() }, (_, i) => {
    //         const point = path.getAt(i);
    //         return { lat: point.lat(), lng: point.lng() };
    //       });
          
    //       console.log("Polygon coordinates:", coordinates);
    //       const updated=[...locationData]
    //       console.log(updated,"updated")
    //       // Get the center point of the polygon for geocoding
    //       const bounds = new window.google.maps.LatLngBounds();
    //       coordinates.forEach((coord) => {
    //         bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng));
    //       });
    //       const center = bounds.getCenter();
          
    //       console.log("Polygon center for geocoding:", center.lat(), center.lng());
          
    //       // Fetch address details for this polygon
    //       fetchAddressDetails(center, prev => [...prev, null]);
          
    //       // Also geocode each vertex of the polygon to find pincodes and cities
    //       coordinates.forEach((coord, index) => {
    //         const latLng = new window.google.maps.LatLng(coord.lat, coord.lng);
    //         console.log(`Geocoding vertex ${index}:`, coord.lat, coord.lng);
            
    //         // Use a timeout to avoid hitting geocoding rate limits
    //         setTimeout(() => {
    //           geocoder?.geocode({ location: latLng }, (results, status) => {
    //             if (status === 'OK' && results[0]) {
    //               const addressComponents = results[0].address_components;
    //               let pincode = '';
    //               let city = '';
                  
    //               // Extract pincode and city
    //               addressComponents.forEach(component => {
    //                 if (component.types.includes('postal_code')) {
    //                   pincode = component.long_name;
    //                 }
    //                 if (component.types.includes('locality') || 
    //                     component.types.includes('administrative_area_level_2')) {
    //                   city = component.long_name;
    //                 }
    //               });
                  
    //               console.log(`Vertex ${index} - City: ${city || 'Not found'}, Pincode: ${pincode || 'Not found'}`);
    //             } else {
    //               console.error(`Geocoder failed for vertex ${index} due to: ${status}`);
    //             }
    //           });
    //         }, index * 300); // Stagger requests by 300ms each
    //       });
          
    //       // Turn off drawing mode after completion
    //       manager.setDrawingMode(null);
    //       setIsDrawingActive(false);
    //     }
    //   });
    // };

    loadGoogleMapsScript();
    
    // Cleanup function
    return () => {
      if (drawingManager) {
        drawingManager.setMap(null);
      }
      if (polygons.length > 0) {
        polygons.forEach(polygon => polygon.setMap(null));
      }
    };
  }, []);
  
  // Fetch address details (city, pincode) from coordinates
  const fetchAddressDetails = (latLng, updateFunction) => {
    if (!geocoder) return;
    
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const addressComponents = results[0].address_components;
          let pincode = '';
          let city = '';
          
          // Log all address components for debugging
          console.log("All address components:",latLng, addressComponents);
          
          // Extract pincode (postal_code) and city
          addressComponents.forEach(component => {
            if (component.types.includes('postal_code')) {
              pincode = component.long_name;
              console.log("Found pincode:", pincode);
            }
            
            // Check for locality (primary) or sublocality or administrative_area_level_2 (fallbacks)
            if (component.types.includes('locality')) {
              city = component.long_name;
              console.log("Found city (locality):", city);
            } else if (component.types.includes('sublocality') && !city) {
              city = component.long_name;
              console.log("Found city (sublocality):", city);
            } else if (component.types.includes('administrative_area_level_2') && !city) {
              city = component.long_name;
              console.log("Found city (administrative_area_level_2):", city);
            }
          });

          // Ensure we have values - log the final results
          console.log("FINAL RESULTS - City:", city || "Not found", "Pincode:", pincode || "Not found");
          
          const addressDetails = {
            pincode,
            city
          };
          
          // Update the state with the address details
          if (typeof updateFunction === 'function') {
            setPolygonAddresses(updateFunction(addressDetails));
          } else {
            setPolygonAddresses(prev => [...prev, addressDetails]);
          }
        }
      } else {
        console.error("Geocoder failed due to: " + status);
        console.log("Geocoder error for coordinates:", latLng.lat(), latLng.lng());
        
        // Update with empty details on failure
        if (typeof updateFunction === 'function') {
          setPolygonAddresses(updateFunction({ pincode: '', city: '' }));
        } else {
          setPolygonAddresses(prev => [...prev, { pincode: '', city: '' }]);
        }
      }
    });
  };
 
  
  // Setup map click listener when edit mode or map changes
  useEffect(() => {
    if (!map) return;
    
    // Create a click listener for polygon selection
    const clickListener = window.google.maps.event.addListener(map, 'click', (event) => {
      // If we're not in edit mode, don't do anything
      if (!isEditMode) return;
      
      let polygonClicked = false;
      
      // Check if the click is on a polygon
      for (let i = 0; i < polygons.length; i++) {
        try {
          // First check using point in polygon (if geometry library is available)
          if (window.google.maps.geometry && window.google.maps.geometry.poly) {
            if (window.google.maps.geometry.poly.containsLocation(event.latLng, polygons[i])) {
              selectPolygon(i);
              polygonClicked = true;
              break;
            }
          } else {
            // Fallback: use bounds checking (less accurate but works without geometry library)
            const bounds = new window.google.maps.LatLngBounds();
            const path = polygons[i].getPath();
            path.forEach(point => bounds.extend(point));
            
            if (bounds.contains(event.latLng)) {
              selectPolygon(i);
              polygonClicked = true;
              break;
            }
          }
        } catch (error) {
          console.error("Error checking polygon:", error);
          continue;
        }
      }
      
      // If click wasn't on a polygon, deselect current polygon
      if (!polygonClicked && selectedPolygonIndex !== null) {
        deselectPolygon();
      }
    });
  
    return () => {
      window.google.maps.event.removeListener(clickListener);
    };
  }, [map, isEditMode, polygons, selectedPolygonIndex]);
  
  // Make each polygon clickable when created
  useEffect(() => {
    polygons?.forEach((polygon, index) => {
      // Add click listener to each polygon
      window.google.maps.event.clearListeners(polygon, 'click');
      
      window.google.maps.event.addListener(polygon, 'click', () => {
        if (isEditMode) {
          selectPolygon(index);
        }
      });
    });
  }, [polygons, isEditMode]);

  // Update address details when polygons are edited
  // Update address details when polygons are edited
useEffect(() => {
  if (!geocoder || polygons.length === 0) return;

  // Clear any existing listeners first
  polygons.forEach((polygon, index) => {
    window.google.maps.event.clearListeners(polygon.getPath(), 'set_at');
    window.google.maps.event.clearListeners(polygon.getPath(), 'insert_at');
    window.google.maps.event.clearListeners(polygon.getPath(), 'remove_at');

    const handlePathChanged = () => {
      const path = polygon.getPath();

      const bounds = new window.google.maps.LatLngBounds();
      for (let i = 0; i < path.getLength(); i++) {
        bounds.extend(path.getAt(i));
      }

      const center = bounds.getCenter();

      console.log(`Polygon ${index} new center:`, center.lat(), center.lng());

      // Fetch new address details
      fetchAddressDetails(center, (prevAddresses) => {
        const newAddresses = [...prevAddresses];
        newAddresses[index] = { city: '', pincode: '' }; // Default fallback
        return newAddresses;
      });

      geocoder.geocode({ location: center }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const addressComponents = results[0].address_components;
          let pincode = '';
          let city = '';

          addressComponents.forEach(component => {
            if (component.types.includes('postal_code')) {
              pincode = component.long_name;
            }
            if (component.types.includes('locality')) {
              city = component.long_name;
            } else if (component.types.includes('sublocality') && !city) {
              city = component.long_name;
            } else if (component.types.includes('administrative_area_level_2') && !city) {
              city = component.long_name;
            }
          });

          const addressDetails = { pincode, city };
          console.log(`Updated Polygon ${index} address:`, addressDetails);

          setPolygonAddresses(prev => {
            const updated = [...prev];
            updated[index] = addressDetails;
            return updated;
          });
        } else {
          console.error(`Geocode failed for polygon ${index} with status:`, status);
        }
      });
    };

    // Listen for path changes
    polygon.getPath().addListener('set_at', handlePathChanged);
    polygon.getPath().addListener('insert_at', handlePathChanged);
    polygon.getPath().addListener('remove_at', handlePathChanged);
  });
}, [geocoder, polygons]);


  // Function to select a polygon for editing or removal
  const selectPolygon = (index) => {
    // First deselect any currently selected polygon
    deselectPolygon();
    
    // Then select the new one
    setSelectedPolygonIndex(index);
    
    // Make the polygon editable
    polygons[index].setOptions({
      editable: true,
      fillColor: "#FF5722", // Change color to indicate selection
      strokeColor: "#FF5722"
    });
  };
  
  // Function to deselect the currently selected polygon
  const deselectPolygon = () => {
    if (selectedPolygonIndex !== null && polygons[selectedPolygonIndex]) {
      polygons[selectedPolygonIndex].setOptions({
        editable: false,
        fillColor: "#4285F4",
        strokeColor: "#4285F4"
      });
      setSelectedPolygonIndex(null);
    }
  };
  
  const handleAddArea = () => {
    if (!map || !drawingManager) {
      console.error("Map or drawing manager not initialized");
      return;
    }
    
    // Exit edit mode if it was active
    if (isEditMode) {
      setIsEditMode(false);
      deselectPolygon();
    }

    // Set the drawing manager on the map
    drawingManager.setMap(map);
    // console.log(map,"sai")
    drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.POLYGON);
    setIsDrawingActive(true);
    
    // Show instructions to the user
    console.log("Click on the map to start drawing a polygon");
  };
  
  // Handle Edit Area Mode
  const handleEditAreaMode = () => {
    setIsEditMode(!isEditMode);
    
    if (isEditMode) {
      // Exiting edit mode, deselect any polygon
      deselectPolygon();
    } else {
      // Entering edit mode
      if (drawingManager) {
        drawingManager.setDrawingMode(null);
        drawingManager.setMap(null);
      }
      setIsDrawingActive(false);
      setSelectedPolygonIndex(null)
      
      // Show instruction to the user
      console.log("Click on a polygon to edit it");
    }
  };

  const handleRemoveArea = () => {
    if (polygons.length === 0) return;
  
    let updatedPolygons = [...polygons];
  
    if (selectedPolygonIndex !== null) {
      polygons[selectedPolygonIndex].setMap(null);
      updatedPolygons = updatedPolygons.filter((_, index) => index !== selectedPolygonIndex);
  
      setPolygonAddresses(prev => prev.filter((_, index) => index !== selectedPolygonIndex));
      setSelectedPolygonIndex(null);
    } else {
      const lastPolygon = polygons[polygons.length - 1];
      lastPolygon.setMap(null);
      updatedPolygons.pop();
  
      setPolygonAddresses(prev => prev.slice(0, -1));
    }
  
    setPolygons(updatedPolygons);
    setIsAreaRemoved(true);
    setIsEditMode(false);
  
    // Update the locationData with the new last polygon (if any)
    if (updatedPolygons.length > 0) {
      const lastPolygonPath = updatedPolygons[updatedPolygons.length - 1].getPath();
      const bounds = new window.google.maps.LatLngBounds();
      for (let i = 0; i < lastPolygonPath.getLength(); i++) {
        bounds.extend(lastPolygonPath.getAt(i));
      }
      const center = bounds.getCenter();
  
      getGeocodeDetails(center).then(({ city, pincode }) => {
        const coordinates = Array.from({ length: lastPolygonPath.getLength() }, (_, i) => {
          const point = lastPolygonPath.getAt(i);
          return { lat: point.lat(), lng: point.lng() };
        });
  
        const data = {
          city,
          postcode: pincode,
          miles: 0,
          coordinates: JSON.stringify(coordinates),
        };
  
        setLocationData(data);
      });
    } else {
      setLocationData(null); // If no polygons remain
    }
  };
  
  const getGeocodeDetails = (latLng) => {
    return new Promise((resolve) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          let city = '';
          let pincode = '';
  
          results[0].address_components.forEach(component => {
            if (component.types.includes('postal_code')) {
              pincode = component.long_name;
            }
            if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
              city = component.long_name;
            }
          });
  
          resolve({ city, pincode });
        } else {
          resolve({ city: '', pincode: '' });
        }
      });
    });
  };
  
  // const handleRemoveArea = () => {
  //   if (polygons.length === 0) return;

  //   if (selectedPolygonIndex !== null) {
  //     // Remove the selected polygon
  //     polygons[selectedPolygonIndex].setMap(null);
      
  //     // Update state
  //     setPolygons(prevPolygons => 
  //       prevPolygons.filter((_, index) => index !== selectedPolygonIndex)
  //     );
  //     // setPolygons([]);
      
  //     // Also remove address details
  //     // setPolygonAddresses(null);
  //     setIsAreaRemoved(true)
      
  //     // // Also remove address details
  //     setPolygonAddresses(prevAddresses => 
  //       prevAddresses.filter((_, index) => index !== selectedPolygonIndex)
  //     );
      
  //     // Reset selection
  //     setSelectedPolygonIndex(null);
  //   } else {
  //     // If no polygon is selected, remove the last one
  //     const lastPolygon = polygons[polygons.length - 1];
  //     lastPolygon.setMap(null);
      
  //     // Update state
  //     // setPolygons([]);
  //     setPolygonAddresses(prevAddresses => prevAddresses.slice(0, -1));
  //     console.log(polygons,"prem")
  //   }
    
  //   // Exit edit mode if it was active
  //   if (isEditMode) {
  //     setIsEditMode(false);
  //   }
  // };

  // const getGeocodeDetails = (center) => {
  //   return new Promise((resolve, reject) => {
  //     if (!geocoder) return resolve({ city: '', pincode: '' });
  
  //     geocoder.geocode({ location: center }, (results, status) => {
  //       if (status === 'OK' && results[0]) {
  //         // const addressComponents = results[0].address_components;
  //         let addressComponents =[];
  //          results?.forEach((item)=>{
            
  //           item?.address_components.forEach((chld)=>{
  //             if(chld.types.includes('postal_code')){
  //             addressComponents=item.address_components}
  //           })
  //         });
  //         let pincode = '';
  //         let city = '';
  // console.log(addressComponents,results,'addressComponents')
  //         addressComponents.forEach(component => {
  //           if (component.types.includes('postal_code')) {
  //             pincode = component.long_name;
  //           }
  //           if (
  //             component.types.includes('locality') || 
  //             component.types.includes('administrative_area_level_2')
  //           ) {
  //             city = component.long_name;
  //           }
  //         });
  
  //         resolve({ city, pincode });
  //       } else {
  //         console.error('Geocode failed:', status);
  //         resolve({ city: '', pincode: '' }); // Return blank if failed
  //       }
  //     });
  //   });
  // };
  
  const handleSubmit = async () => {
    const polygonPromises = polygons.map(async (polygon) => {
      const path = polygon.getPath();
  
      // Get bounds & center
      const bounds = new window.google.maps.LatLngBounds();
      for (let i = 0; i < path.getLength(); i++) {
        bounds.extend(path.getAt(i));
      }
      const center = bounds.getCenter();
      // Get geocode info
      const { city, pincode } = await getGeocodeDetails(center);
      console.log(pincode,'pincode')
  
      // Get coordinates
      const coordinates = Array.from({ length: path.getLength() }, (_, i) => {
        const point = path.getAt(i);
        return { lat: point.lat(), lng: point.lng() };
      });
      console.log(coordinates,"8899")
  
      return {
        coordinates,
        city,
        pincode,
        location: `${city},${pincode}`
      };
    });
  console.log(polygons,"all")
    const allPolygonData = await Promise.all(polygonPromises);
console.log(allPolygonData,"allPolygonData")
// const pincodeData = allPolygonData?.find(item => item?.pincode)
const data={
  city:allPolygonData?.[0]?.city,
  postcode:allPolygonData?.[0]?.pincode,
  miles:0,
  coordinates:JSON.stringify(allPolygonData?.[allPolygonData?.length-1]?.coordinates)
  
}

    setLocationData(data);
    onNext(data);
    onClose();
  };
  
  
  useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, []);
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2 className={styles.title}>Draw on a map</h2>

        <p className={styles.description}>
          <span className={styles.infoIcon}>
            <img src={iIcon} alt="Info" />
          </span>
          You can add multiple drawn areas to define the specific places you
          provide services.
        </p>

        <div className={styles.areaButtonGroup}>
          <button 
            className={`${styles.areaButton} ${isDrawingActive ? styles.activeButton : ''}`} 
            onClick={handleAddArea}
            disabled={isEditMode}
          >
            <img src={AddLocation} alt="..." /> Add new area
          </button>
          <button 
            className={`${styles.areaButton} ${isEditMode ? styles.activeButton : ''}`}
            onClick={handleEditAreaMode}
            disabled={polygons.length === 0}
          >
            <img src={EditLocation} alt="..." width={15} height={15} /> Edit an area
          </button>
          <button 
            className={styles.areaButton} 
            onClick={handleRemoveArea}
            disabled={polygons.length === 0}
          >
            <img src={RemoveLocation} alt="..." /> Remove an area {selectedPolygonIndex !== null ? '(Selected)' : ''}
          </button>
        </div>

        <div
          ref={mapRef}
          style={{ width: "100%", height: "400px", margin: "16px 0" }}
        ></div>

        {/* We've removed the display area details section as requested */}

        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button 
            className={styles.nextButton} 
            onClick={handleSubmit}
            // disabled={polygons.length === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrawOnMapModal;