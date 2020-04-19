/* eslint "no-console": "off" */

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');
const moment = require('moment');
const siteConfig = require('./site-config');

const formatDate = date => moment(date).format('MMMM DD, YYYY');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    if (typeof node.frontmatter.slug !== 'undefined') {
      createNodeField({
        node,
        name: 'slug',
        value: `/blog/${_.kebabCase(node.frontmatter.title)}`,
      });
    } else {
      const value = createFilePath({ node, getNode });
      createNodeField({
        node,
        name: 'slug',
        value,
      });
    }

    if (node.frontmatter.date) {
      createNodeField({ node, name: 'date', value: node.frontmatter.date });
      createNodeField({ node, name: 'dateFormatted', value: formatDate(node.frontmatter.date) });
    }

    if (node.frontmatter.dateModified) {
      createNodeField({
        node,
        name: 'dateModifiedFormatted',
        value: formatDate(node.frontmatter.dateModified),
      });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const postPage = path.resolve('src/templates/post.jsx');
  const tagPage = path.resolve('src/templates/tag.jsx');

  // Get a full list of markdown posts
  const markdownQueryResult = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              dateFormatted
            }
            frontmatter {
              title
              tags
            }
          }
        }
      }
    }
  `);

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();
  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges;

  // Sort posts
  postsEdges.sort((postA, postB) => {
    const dateA = moment(postA.node.frontmatter.date, siteConfig.dateFromFormat);

    const dateB = moment(postB.node.frontmatter.date, siteConfig.dateFromFormat);

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  // Post page creating
  postsEdges.forEach((edge, index) => {
    // Generate a list of tags
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach(tag => {
        tagSet.add(tag);
      });
    }

    // Create post pages
    const nextID = index + 1 < postsEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1;
    const nextEdge = postsEdges[nextID];
    const prevEdge = postsEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug,
      },
    });
  });

  //  Create tag pages
  tagSet.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagPage,
      context: { tag },
    });
  });
};
