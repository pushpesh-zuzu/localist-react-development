  // ✅ URL Decoding Function - Saare nested parameters extract karega
  export const extractAllParams = (searchString) => {
    try {
      const allParams = {};
      
      // Pehle pure URL ko decode karein
      const decodedUrl = decodeURIComponent(searchString);
      // console.log("Decoded URL:", decodedUrl);
      
      // Regex se saare key=value pairs extract karein
      const paramRegex = /([^?=&]+)=([^&]*)/g;
      let match;
      
      while ((match = paramRegex.exec(decodedUrl)) !== null) {
        const key = match[1];
        const value = match[2];
        
        // Last value ko prioritize karein (outer parameters override karein)
        allParams[key] = value;
      }
      
      // console.log("All extracted parameters:", allParams);
      return allParams;
    } catch (error) {
      console.error("Error decoding URL:", error);
      return {};
    }
  };