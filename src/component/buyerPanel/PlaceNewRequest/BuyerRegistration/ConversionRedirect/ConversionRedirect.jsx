import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ConversionRedirect = () => {
  const navigate = useNavigate();
  const { requestId } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/bids-list/${requestId}`, { replace: true });
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate, requestId]);

  return (
    <>
      <Helmet>
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
    </>
  );
};

export default ConversionRedirect;
