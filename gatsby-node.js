// const OptimizePlugin = require('optimize-plugin');
const path = require('path')
const fetch = require('node-fetch')
const {
  createFilePath,
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`)

const ogs = require('open-graph-scraper')

const createPosts = (createPage, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  createNodeId,
  getCache,
}) => {
  const { createNode, createNodeField } = actions
  if (node.internal.type === 'Egghead') {
    const fileNode = await createRemoteFileNode({
      // the url of the remote image to generate a node for
      url: node.ogImage.url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    })
    if (fileNode) {
      node.image___NODE = fileNode.id
    }
  }

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    const slug = createFilePath({ node, getNode, basePath: `content` }).replace(
      /\//gi,
      '',
    )
    createNodeField({
      name: 'id',
      node,
      value: node.id,
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    })

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description,
    })

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date || '',
    })

    createNodeField({
      name: 'favorite',
      node,
      value: node.frontmatter.favorite,
    })

    if (node.frontmatter.banner) {
      const fileNode = await createRemoteFileNode({
        // the url of the remote image to generate a node for
        url: node.frontmatter.banner,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        getCache,
      })
      if (fileNode) {
        //node.remoteImage___NODE = fileNode.id;
        node.frontmatter.banner___NODE = fileNode.id
      }
    }
    createNodeField({
      name: 'banner',
      node,
      value: node.frontmatter.banner,
    })

    createNodeField({
      name: 'keywords',
      node,
      value: node.frontmatter.keywords || [],
    })
  }
}

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions
  // @TODO import this from somewhere else
  const array = [
    'http://egghead.io/playlists/hooks-3d62',
    'https://egghead.io/playlists/creacion-de-un-plugin-de-gatsby-desde-cero-5c8b',
    'https://egghead.io/lessons/react-native-crear-animacion-con-react-native-y-la-api-animated',
  ]

  const promises = array.map((item) => {
    return ogs({ url: item })
  })
  const data = await Promise.all(promises)
  data.forEach((item, index) => {
    createNode({
      ...item.result,
      id: createNodeId(`Egghead-${index}`),
      parent: null,
      children: [],
      internal: {
        type: 'Egghead',
        content: JSON.stringify(item.result),
        contentDigest: createContentDigest(item.result),
      },
    })
  })
}

// exports.onCreateWebpackConfig = ({
//   stage,
//   rules,
//   loaders,
//   plugins,
//   actions,
// }) => {
//   actions.setWebpackConfig({
//     module: {
//       target: ['web', 'es2017'],
//     },
//     output: {
//       module: true
//     },
//     experiments: {
//       outputModule: true
//     },
//     plugins: [
//       new OptimizePlugin(),
//     ],
//   })
// }
