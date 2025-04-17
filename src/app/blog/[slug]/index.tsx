import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import BlogPostJSONLD from "@/components/BlogPostJSONLD";
import { allBlogs } from ".contentlayer/generated";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { appConfig } from "@/appConfig";

function BlogPost({ slug }: { slug: string }) {
  if (!allBlogs) return <p>No blog posts available.</p>;
  const post = allBlogs.find((p) => p.slug === slug);
  if (!post) notFound();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <>
      <BlogPostJSONLD
        title={post.title}
        description={post.description}
        publishDate={post.publishDate}
        tags={post.tags}
      />
      <header className="mt-16">
        <div className="mt-8 flex items-center justify-between text-zinc-400">
          <Link
            className="flex items-center gap-1 text-sm hover:text-white md:text-base lg:text-lg"
            href="/"
          >
            <Icon icon="octicon:arrow-left-16" />
            <span>home</span>
          </Link>
          <div className="flex items-center gap-3">
            <a href={appConfig.socials.linkedin}>
              <Icon icon="mdi:linkedin" className="hover:text-white" />
            </a>
            <a href={appConfig.socials.github}>
              <Icon icon="mdi:github" className="hover:text-white" />
            </a>
            <a href={appConfig.socials.medium}>
              <Icon icon="simple-icons:medium" className="hover:text-white" />
            </a>
          </div>
        </div>
        <h1 className="mt-8 text-3xl font-bold md:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <div className="mt-2 text-xs text-zinc-400 md:text-sm lg:text-base">
          {formatDate(post.publishDate)}
        </div>
      </header>
      <article className="prose prose-invert prose-sm md:prose-base lg:prose-lg prose-a:decoration-zinc-400 prose-a:text-white prose-a:underline prose-a:underline-offset-2 prose-code:text-white prose-headings:font-bold prose-li:text-zinc-400 prose-ol:list-disc prose-ol:my-1 prose-p:text-zinc-400 prose-strong:font-normal prose-strong:text-white prose-ul:list-disc prose-ul:my-1 hover:prose-a:decoration-current mt-16 pb-8">
        <MDXRemote
          source={post.body.raw}
          components={{ Image }}
          options={{
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
          }}
        />
      </article>
    </>
  );
}

export default BlogPost;
