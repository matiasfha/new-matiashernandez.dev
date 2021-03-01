const path = require("path");
const crypto = require(`crypto`);

const fetch = require("node-fetch");
const {
  createFilePath,
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`);

const ogs = require("open-graph-scraper");

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions;
  const request = await fetch(
    "https://cyypawp1.api.sanity.io/v1/data/query/production?query=*%5B_type%20%3D%3D%20%22siteSettings%22%5D"
  );
  const { result } = await request.json();
  let promises = result[0].Esegghead.map((item) => {
    return ogs({ url: item });
  });
  let data = await Promise.all(promises);
  data.forEach((item, index) => {
    createNode({
      ...item.result,
      id: createNodeId(`Egghead-${index}`),
      parent: null,
      children: [],
      internal: {
        type: "Egghead",
        content: JSON.stringify(item.result),
        contentDigest: createContentDigest(item.result),
      },
    });
  });

  promises = result[0].Enegghead.map((item) => {
    return ogs({ url: item });
  });
  data = await Promise.all(promises);
  data.forEach((item, index) => {
    createNode({
      ...item.result,
      id: createNodeId(`EggheadEn-${index}`),
      parent: null,
      children: [],
      internal: {
        type: "EggheadEn",
        content: JSON.stringify(item.result),
        contentDigest: createContentDigest(item.result),
      },
    });
  });
};

exports.onCreateNode = async ({
  node,
  createContentDigest,
  getNode,
  actions: { createNode, createNodeField, createParentChildLink },
  createNodeId,
  getCache,
}) => {
  if (
    node.internal.type === "SanityAboutPage" ||
    node.internal.type === "SanityNewsletterPage" ||
    node.internal.type === "SanityThankyouPage"
  ) {
    let mdxContent = node.content;

    createNode({
      id: createNodeId(`MDX-${node.id}`),
      parent: node.id,
      frontmatter: {
        title: node.title,
        description: node.description,
        locale: node.locale || "es",
      },
      internal: {
        type: `MDX${node.internal.type}`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(mdxContent)
          .digest(`hex`),
        mediaType: `text/markdown`,
        content: mdxContent,
        description: `My custom MDX nodes`,
      },
    });
  }
  if (node.internal.type === `Mdx`) {
    if (node.frontmatter.banner != null) {
      const fileNode = await createRemoteFileNode({
        // the url of the remote image to generate a node for
        url: node.frontmatter.banner,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        getCache,
      });
      if (fileNode) {
        //node.remoteImage___NODE = fileNode.id;
        node.frontmatter.banner___NODE = fileNode.id;
      }
      const parent = getNode(node.parent);
      const slug = createFilePath({
        node,
        getNode,
        basePath: `content`,
      }).replace(/\//gi, "");
      const { lang } = node.frontmatter;
      createNodeField({
        name: "slug",
        node,
        value: lang === "en" ? `en/${slug}` : slug,
      });
    }
  }

  if (node.internal.type === "Egghead" || node.internal.type === "EggheadEn") {
    try {
      console.log(node);
      const fileNode = await createRemoteFileNode({
        url: node.ogImage.url,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        getCache,
      });

      if (fileNode) {
        node.remoteImage___NODE = fileNode.id;
      }
    } catch (e) {
      console.error(e);
    }
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
        "@/assets": path.join(__dirname, "assets"),
      },
    },
  });
};

const getSpanishPosts = async (graphql, createPage, reporter) => {
  //Get spanish posts
  const result = await graphql(
    `
      query {
        allMdx(
          filter: { frontmatter: { tag: { ne: "en" } } }
          sort: { order: DESC, fields: frontmatter___date }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
    return;
  }
  const posts = result.data.allMdx.edges;
  posts.forEach(({ node }) => {
    if (node.fields) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/post.js`),
        context: {
          id: node.id,
          pagePath: `/${node.fields.slug}`,
          locale: "es",
        },
      });
    }
  });
};

const getEnglishPosts = async (graphql, createPage, reporter) => {
  //Get spanish posts
  const result = await graphql(
    `
      query {
        allMdx(
          filter: { frontmatter: { tag: { eq: "en" } } }
          sort: { order: DESC, fields: frontmatter___date }
        ) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  );
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
    return;
  }
  const posts = result.data.allMdx.edges;
  posts.forEach(({ node }) => {
    if (node.fields) {
      createPage({
        path: `en/${node.fields.slug}`,
        component: path.resolve(`./src/templates/post.js`),
        context: {
          id: node.id,
          pagePath: `en/${node.fields.slug}`,
          locale: "en",
        },
      });
    }
  });
};

// Sanity pages
const AboutPage = async (graphql, createPage, reporter) => {
  const result = await graphql(`
    query {
      allMdxSanityAboutPage {
        edges {
          node {
            childMdx {
              body
            }
            frontmatter {
              title
              description
              locale
            }
          }
        }
      }
    }
  `);

  result.data.allMdxSanityAboutPage.edges.forEach(({ node }) => {
    const localePath = node.frontmatter.locale[0] === "es" ? "" : "en/";
    createPage({
      path: `${localePath}about`,
      component: path.resolve(`./src/templates/page.js`),
      context: {
        id: node.id,
        pagePath: `${localePath}/about`,
        ...node,
      },
    });
  });
};

const NewsletterPage = async (graphql, createPage, reporter) => {
  const result = await graphql(`
    query {
      allMdxSanityNewsletterPage {
        edges {
          node {
            childMdx {
              body
            }
            frontmatter {
              title
              description
            }
          }
        }
      }
    }
  `);

  const { node } = result.data.allMdxSanityNewsletterPage.edges[0];
  createPage({
    path: `newsletter`,
    component: path.resolve(`./src/templates/page.js`),
    context: {
      pagePath: `newsletter`,
      locale: "es",
      id: node.id,
      ...node,
    },
  });
};

const ThankYouPage = async (graphql, createPage, reporter) => {
  const result = await graphql(`
    query {
      allMdxSanityThankyouPage {
        edges {
          node {
            childMdx {
              body
            }
            frontmatter {
              title
              description
            }
          }
        }
      }
    }
  `);

  const { node } = result.data.allMdxSanityThankyouPage.edges[0];
  createPage({
    path: `thankyou`,
    component: path.resolve(`./src/templates/page.js`),
    context: {
      pagePath: `thankyou`,
      locale: "es",
      id: node.id,
      ...node,
    },
  });
};
const BlogPage = async (graphql, createPage, reporter) => {
  const result = await graphql(`
    query {
      site {
        siteMetadata {
          title
          description
          author
          keywords
          siteUrl
          image
        }
      }
      allMdx(
        filter: { frontmatter: { tag: { ne: "en" } } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        nodes {
          id
          slug
          frontmatter {
            banner {
              childImageSharp {
                fluid(maxWidth: 320) {
                  src
                }
              }
            }
            title
            description
            keywords
          }
        }
      }
    }
  `);
  const { nodes } = result.data.allMdx;
  createPage({
    path: "blog",
    component: path.resolve(`src/templates/blog.js`),
    context: {
      pagePath: "es",
      locale: "es",
      nodes: nodes.filter((item) => item.slug != null),
      frontmatter: {
        ...result.data.site.siteMetadata,
        keywords: result.data.site.siteMetadata.keywords.join(", "),
      },
    },
  });
};
// Posts
exports.createPages = async ({ actions, graphql, reporter }) => {
  await getSpanishPosts(graphql, actions.createPage, reporter);
  await getEnglishPosts(graphql, actions.createPage, reporter);
  await AboutPage(graphql, actions.createPage, reporter);
  await NewsletterPage(graphql, actions.createPage, reporter);
  await ThankYouPage(graphql, actions.createPage, reporter);
  await BlogPage(graphql, actions.createPage, reporter);
};
