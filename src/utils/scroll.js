export const handleScrollToBottom = () => {
  // Method 1: Regular scroll
  window.scrollTo({ top: 0, behavior: "smooth" });
  
  // Method 2: Fallback for iOS
  setTimeout(() => {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
  
  // Method 3: Alternative for Safari
  setTimeout(() => {
    document.documentElement.scrollTop = 0;
  }, 200);
};