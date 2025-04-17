import { appConfig } from "@/appConfig";
import Script from "next/script";

interface Props {
  title: string;
  description?: string;
  publishDate: string;
  tags: string[];
}

export default function BlogPostJSONLD({
  title,
  description,
  publishDate,
  tags,
}: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    keywords: tags,
    author: {
      "@type": "Person",
      name: appConfig.name,
      url: appConfig.url,
    },
    datePublished: publishDate.substring(0, 10),
  };

  return (
    <Script
      id={`jsonld-${title}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
