// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/**/*.md`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    summary: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" } },
    cover: { type: "string" }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\..*\.md$/, "").replace(/\.md$/, "")
    },
    lang: {
      type: "string",
      resolve: (doc) => {
        if (doc._raw.sourceFileName.endsWith(".sv.md"))
          return "sv";
        if (doc._raw.sourceFileName.endsWith(".fa.md"))
          return "fa";
        return "en";
      }
    }
  }
}));
var Portfolio = defineDocumentType(() => ({
  name: "Portfolio",
  filePathPattern: `portfolio/**/*.md`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    status: { type: "string" },
    permalink: { type: "string" },
    author: { type: "string" },
    type: { type: "string" },
    id: { type: "number" },
    agency: { type: "string" },
    category: { type: "list", of: { type: "string" } },
    tag: { type: "list", of: { type: "string" } },
    case_link_url: { type: "string" },
    client: { type: "string" },
    tagline: { type: "string" },
    background_image: { type: "string" },
    logo: { type: "string" },
    images: { type: "list", of: { type: "string" } },
    port_date: { type: "list", of: { type: "string" } }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => {
        const pathParts = doc._raw.flattenedPath.split("/");
        return pathParts[pathParts.length - 2];
      }
    },
    lang: {
      type: "string",
      resolve: (doc) => {
        if (doc._raw.sourceFileName.endsWith(".sv.md"))
          return "sv";
        if (doc._raw.sourceFileName.endsWith(".fa.md"))
          return "fa";
        return "en";
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "src/content",
  documentTypes: [Blog, Portfolio]
});
export {
  Blog,
  Portfolio,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-5MAPOCLN.mjs.map
