const path = require('path')
const fetch = require('node-fetch')
const {
  createFilePath,
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`)

exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  createNodeId,
  getCache,
}) => {
  const { createNode, createNodeField } = actions
}
