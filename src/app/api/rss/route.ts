import RSS from "rss";
import { allBlogs } from "~contentlayer/generated";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import sanitizeHtml from "sanitize-html";
import { appConfig } from "@/appConfig";

export async function GET() {
  const feed = new RSS({
    title: appConfig.url,
    description: appConfig.description,
    site_url: appConfig.url,
    feed_url: `${appConfig.url}/api/rss`,
    language: "en-us",
  });

  const blogPosts = allBlogs.filter((post) => !post.draft);

  for (const post of blogPosts) {
    const { content } = await compileMDX({
      source: post.body.raw,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                theme: "github-dark",
                keepBackground: true,
              },
            ],
          ],
        },
      },
    });

    const htmlContent = content as unknown as string; // Type assertion since content is JSX

    feed.item({
      title: post.title,
      description: post.description ?? "",
      url: `${appConfig.url}/${post.slug}`,
      date: post.publishDate,
      custom_elements: [
        {
          content: sanitizeHtml(htmlContent, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
          }),
        },
      ],
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
