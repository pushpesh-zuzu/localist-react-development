import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const CalonicalTags = ({ breadcrumb = [], bannerImage }) => {
  const baseUrl = "https://www.localists.com";
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);
  const lang = parts[0] || "en";
  const country = parts[1] || "gb";
  const path = parts.slice(2).join("/");
<<<<<<< HEAD

  const canonicalUrl = `${baseUrl}/${lang}/${country}/${path}`;
=======
  const cleanPath = (p) => (p ? p.replace(/^\/+/, "") : "");
  const canonicalUrl = `${baseUrl}/en/gb/${path}`;
  const breadcrumbList = breadcrumb.length
    ? [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${baseUrl}/en/gb`,
        },
        ...breadcrumb.map((item, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: item?.title || "",
          item: `${baseUrl}/en/gb/${
            item?.path ? cleanPath(item.path) : `${path}`
          }`,
        })),
      ]
    : [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList || [],
  };
>>>>>>> 2ea0b020843e2730ffc2629097d440d8ad15502c
  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:url" content={canonicalUrl} />

<<<<<<< HEAD
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
=======
      <meta property="og:type" content="website" />

      {/* Hreflang Tags */}
      <link rel="alternate" hreflang="en-gb" href={canonicalUrl} />
      {bannerImage && (
        <meta property="og:image" content={`${baseUrl}${bannerImage}`} />
      )}

      {/* <link rel="alternate" hreflang="x-default" href={`${baseUrl}/${path}`} /> */}

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
>>>>>>> 2ea0b020843e2730ffc2629097d440d8ad15502c
    </Helmet>
  );
};

export default CalonicalTags;
