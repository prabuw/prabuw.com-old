const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');
const moment = require('moment');

const formatDate = date => moment(date).format('MMMM DD, YYYY');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const { frontmatter } = node;

    if (typeof frontmatter.slug !== 'undefined') {
      const slug =
        frontmatter.template === 'post'
          ? `/blog/${_.kebabCase(frontmatter.title)}`
          : _.kebabCase(frontmatter.title);

      createNodeField({
        node,
        name: 'slug',
        value: slug,
      });
    } else {
      const value = createFilePath({ node, getNode });
      createNodeField({
        node,
        name: 'slug',
        value,
      });
    }

    if (frontmatter.date) {
      createNodeField({ node, name: 'date', value: frontmatter.date });
      createNodeField({ node, name: 'dateFormatted', value: formatDate(frontmatter.date) });
    }

    if (frontmatter.dateModified) {
      createNodeField({
        node,
        name: 'dateModifiedFormatted',
        value: formatDate(frontmatter.dateModified),
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
