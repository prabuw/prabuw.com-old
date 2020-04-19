/* eslint "no-console": "off" */

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');
const moment = require('moment');

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
              template
              tags
            }
          }
        }
      }
    }
  `);

  if (markdownQueryResult.errors) {
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();
  const { edges } = markdownQueryResult.data.allMarkdownRemark;

  edges.forEach(({ node }) => {
    const { frontmatter, fields } = node;

    if (frontmatter.tags) {
      frontmatter.tags.forEach(tagSet.add, tagSet);
    }

    createPage({
      path: fields.slug,
      component: path.resolve(`src/templates/${frontmatter.template}.jsx`),
      context: {
        slug: fields.slug,
      },
    });
  });

  tagSet.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: path.resolve('src/templates/tag.jsx'),
      context: { tag },
    });
  });
};
