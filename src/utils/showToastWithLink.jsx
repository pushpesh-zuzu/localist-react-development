import { toast } from "react-toastify";

// New function - toast with clickable link text
export const showToastWithLink = (
  type,
  message,
  redirectUrl,
  linkText,
  autoClose = true 
) => {
  const options = {
    position: "top-right",
    autoClose: autoClose ? 3000 : 20000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const parts = message.split(linkText);

  const styledMessage =
    parts[0] +
    `<span style="color:#4A90E2;text-decoration:underline;cursor:pointer;font-weight:600;">${linkText}</span>` +
    (parts[1] || "");

  const ToastContent = () => (
    <div
      onClick={(e) => {
        if (e.target.tagName === "SPAN") {
          window.location.href = redirectUrl;
        }
      }}
      dangerouslySetInnerHTML={{ __html: styledMessage }}
    />
  );

  if (type === "success") toast.success(<ToastContent />, options);
  if (type === "error") toast.error(<ToastContent />, options);
  if (type === "info") toast.info(<ToastContent />, options);
  if (type === "warning") toast.warn(<ToastContent />, options);
};
