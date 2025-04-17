import { allBlogs } from ".contentlayer/generated";
import BlogPost from ".";
import { appConfig } from "@/appConfig";

// Define the type for params
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params; // Await the params to get the slug
  const post = allBlogs.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: appConfig.url,
      images: [{ url: `${appConfig.url}/blog/${post.slug}/og.png` }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${appConfig.url}/blog/${post.slug}/og.png`],
    },
    alternates: {
      canonical: `${appConfig.url}/blog/${post.slug}`,
    },
    article: {
      publishedTime: post.publishDate,
    },
  };
}

async function BlogPage({ params }: PageProps) {
  const { slug } = await params; // Await the params to get the slug
  return <BlogPost slug={slug} />;
}

export default BlogPage;
