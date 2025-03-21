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
