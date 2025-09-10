import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ConversionRedirect = () => {
  const navigate = useNavigate();
  const { requestId } = useParams();

  useEffect(() => {
    // Redirect after a small delay so conversion script can fire
    const timer = setTimeout(() => {
      navigate(`/bids-list/${requestId}`, { replace: true });
    }, 100000); // 300–500ms safe delay

    return () => clearTimeout(timer);
  }, [navigate, requestId]);

  return (
    <>
      <Helmet>
       {/* <!-- Event snippet for Submit lead form conversion page --> */}
        <script>
          {`
            gtag('event', 'conversion', {
              'send_to': 'AW-17528251553/iVB9CJjZsZMbEKHJj6ZB',
              'value': 1.0,
              'currency': 'GBP'
            });
          `}
        </script>
      </Helmet>
      {/* Nothing visible */}
    </>
  );
};

export default ConversionRedirect;
