const path = require("path");
require("dotenv").config({
  path: `.env`,
});

const baseUrl = "https://www.matiashernandez.dev";
const title = "Digital Garden de Matias Hernandez";
const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = baseUrl,
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
  BUZZSPROUT_TOKEN,
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === "production";
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
  flags: { FAST_DEV: true, PRESERVE_WEBPACK_CACHE: true },
  pathPrefix: "/",
  siteMetadata: {
    author: "Matías Hernández",
    siteUrl,
    seo: {
      canonicalUrl: siteUrl,
      organization: {
        name: "Matias Hernandez Tech LLC",
        url: siteUrl,
        logo: "images/logo.png",
      },
      title,
      author: {
        name: "Matias Hernandez A.",
        minibio: `
            <strong>Matias Hernandez A.</strong>
            Ingeniero de Producto/Software Chileno. Ha escrito cientos de lineas de código para diversas compañias y clientes en EE.UU y Europa construyendo diversos productos.
      `,
      },
    },
    title,
    ogSiteName: "Matias Hernandez A.", // Facebook Site Name
    ogLanguage: "es_CL",
    // Social component
    twitter: "https://twitter.com/matiasfha/",
    twitterHandle: "@matiasfha",
    github: "https://github.com/matiasfha/",
    linkedin: "https://www.linkedin.com/in/mhernand/",
    image: "/images/photo.jpg",
    description:
      "Hola! Soy Matias Hernandez. Ingeniero de Producto/Software, Podcaster e Instructor.",
    keywords: [
      "Javascript",
      "React",
      "hooks",
      "es6",
      "egghead",
      "tutoriales",
      "Software Engineer",
      "Product Engineer",
      "Web Developer",
      "Consultant",
      "Freelancer",
    ],
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "cyypawp1",
        dataset: "production",
      },
    },
    {
      resolve: `gatsby-source-buzzsprout-api`,
      options: {
        name: "ControlRemoto",
        token: BUZZSPROUT_TOKEN,
        podcastId: "1057351",
      },
    },
    {
      resolve: `gatsby-source-buzzsprout-api`,
      options: {
        name: "CafeConTech",
        token: BUZZSPROUT_TOKEN,
        podcastId: "1081172",
      },
    },
    "gatsby-plugin-emotion",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/photo.jpg",
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: path.join(__dirname, "./src/templates/page.js"),
        },
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
            },
          },
        ],
      },
    },
    `gatsby-plugin-mdx-embed`,
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "A learning, teaching and writing software engineer",
        short_name: "MHA",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#525dce",
        display: "standalone",
        icon: "assets/logo.png",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        "@": path.join(__dirname, "src"),
        "@/assets": path.join(__dirname, "assets"),
      },
    },
    "gatsby-plugin-workerize-loader",
    "gatsby-plugin-catch-links",
    `gatsby-plugin-advanced-sitemap`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: "*" }],
          },
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          "@/assets": path.resolve(__dirname, "assets"),
          "@/components": path.resolve(__dirname, "src/components"),
          "@/images": path.resolve(__dirname, "src/images"),
        },
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url:
          "https://www.freecodecamp.org/espanol/news/author/matias-hernandez/rss/",
        name: "FCCEs",
        parserOption: {
          customFields: {
            item: [["media:content", "image"]],
          },
        },
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: "https://www.freecodecamp.org/news/author/matias-hernandez/rss/",
        name: "FCCEn",
        parserOption: {
          customFields: {
            item: [["media:content", "image"]],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
        head: false,
        defer: true,
      },
    },
    `gatsby-plugin-image`,
  ],
};
