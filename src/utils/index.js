import { toast } from "react-toastify";

export const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

export const showToast = (type, message) => {
  const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  if (type === "success") {
    toast.success(message, options);
  } else if (type === "error") {
    toast.error(message, options);
  } else if (type === "info") {
    toast.info(message, options);
  } else if (type === "warning") {
    toast.warn(message, options);
  }
};

export const BASE_IMAGE_URL = "https://localists.zuzucodes.com/admin/";
export const BASE_URL_IMAGE = "https://localists.zuzucodes.com/admin/storage/app/public/images/category/"


export const loadGooglePlacesAutocomplete = ({
  inputRef,
  setPincode,
  setCity,
  setErrors,
  dispatch,
  setcitySerach,
}) => {
  const initAutocomplete = () => {
    if (!inputRef?.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["geocode"], // Allows both city and pincode based search
        componentRestrictions: { country: "IN" },
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      const postalCode = place.address_components.find((component) =>
        component.types.includes("postal_code")
      )?.long_name;

      const cityName = place.address_components.find((component) =>
        component.types.includes("locality")
      )?.long_name;

      const townName = place.address_components.find((component) =>
        component.types.includes("administrative_area_level_3")
      )?.long_name;

      const formattedAddress = place.formatted_address;

      if (postalCode) {
        setPincode(postalCode);
        inputRef.current.value = postalCode;
        setErrors((prev) => ({ ...prev, pincode: "" }));
      }

      if (cityName || townName) {
        const finalCity = cityName || townName;
        setCity(finalCity);
        dispatch(setcitySerach(finalCity));
      }

      if (!postalCode && !cityName && !townName) {
        alert("No city or PIN code found! Please try again.");
      }
    });
  };

  const loadGoogleMapsScript = () => {
    if (!window.google?.maps) {
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

  loadGoogleMapsScript();
};
