// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    publishDate: { type: "date", required: true },
    modifyDate: { type: "date", required: false },
    tags: { type: "list", of: { type: "string" }, required: true },
    draft: { type: "boolean", required: false, default: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\//, "")
    }
  }
}));
var generated = makeSource({
  contentDirPath: "src/content",
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: true
        }
      ]
    ]
  }
});
var contentlayer_config_default = generated;
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-GNOVEWRS.mjs.map
