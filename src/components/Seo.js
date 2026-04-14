import { useEffect } from "react";

export default function Seo({ title, description, canonicalPath = "/", structuredData }) {
  useEffect(() => {
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    const base = window.location.origin;
    canonical.setAttribute("href", `${base}${canonicalPath}`);
  }, [title, description, canonicalPath]);

  useEffect(() => {
    if (!structuredData) return undefined;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [structuredData]);

  return null;
}
