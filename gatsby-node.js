const path = require("path");
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
  const promises = result[0].egghead.map((item) => {
    return ogs({ url: item });
  });
  const data = await Promise.all(promises);
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
};

exports.onCreateNode = async ({
  node,
  getNode,
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
}) => {
  if (node.internal.type === `Mdx`) {
    if (node.frontmatter.banner) {
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
    }
    const parent = getNode(node.parent);
    const slug = createFilePath({ node, getNode, basePath: `content` }).replace(
      /\//gi,
      ""
    );
    createNodeField({
      name: "slug",
      node,
      value: slug,
    });
  }
  if (node.internal.type === "Egghead") {
    try {
      const fileNode = await createRemoteFileNode({
        url: node.twitterImage.url,
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
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
        "@/assets": path.join(__dirname, "assets"),
      },
    },
  });
};

// Posts
exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
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
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
    return;
  }
  const posts = result.data.allMdx.edges;
  posts.forEach(({ node }) => {
    actions.createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        id: node.id,
        pagePath: node.fields.slug,
      },
    });
  });
};
