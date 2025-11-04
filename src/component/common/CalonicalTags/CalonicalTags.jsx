import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const CalonicalTags = () => {
  const baseUrl = "https://www.localists.com";
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);
  const lang = parts[0] || "en";
  const country = parts[1] || "gb";
  const path = parts.slice(2).join("/");

  const canonicalUrl = `${baseUrl}/${lang}/${country}/${path}`;
  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:url" content={canonicalUrl} />

      <link
        rel="alternate"
        hreflang="en-gb"
        href={`${baseUrl}/en/gb/${path}`}
      />
      <link
        rel="alternate"
        hreflang="en-au"
        href={`${baseUrl}/en/au/${path}`}
      />
      <link
        rel="alternate"
        hreflang="en-ca"
        href={`${baseUrl}/en/ca/${path}`}
      />
      <link
        rel="alternate"
        hreflang="en-ie"
        href={`${baseUrl}/en/ie/${path}`}
      />
      <link
        rel="alternate"
        hreflang="en-nz"
        href={`${baseUrl}/en/nz/${path}`}
      />
      <link
        rel="alternate"
        hreflang="en-sg"
        href={`${baseUrl}/en/sg/${path}`}
      />
      <link
        rel="alternate"
        hreflang="en-za"
        href={`${baseUrl}/en/za/${path}`}
      />
      <link
        rel="alternate"
        hreflang="en-us"
        href={`${baseUrl}/en/us/${path}`}
      />
      <link rel="alternate" hreflang="x-default" href={`${baseUrl}/${path}`} />
    </Helmet>
  );
};

export default CalonicalTags;
