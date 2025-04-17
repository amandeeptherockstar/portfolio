import { allBlogs } from ".contentlayer/generated";
import BlogPost from ".";
import { appConfig } from "@/appConfig";

export async function generateStaticParams() {
  return allBlogs
    .filter((post) =>
      process.env.NODE_ENV === "production" ? !post.draft : true
    )
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const searchParams = await params;
  const post = allBlogs.find((p) => p.slug === searchParams.slug);
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

async function BlogPage({ params }: { params: { slug: string } }) {
  const searchParams = await params;
  return <BlogPost slug={searchParams.slug} />;
}

export default BlogPage;
