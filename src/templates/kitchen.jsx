import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/Layout';
import { PostFeed } from '../components/PostFeed';

const PageTemplate = ({ data }) => {
  const postNode = data.markdownRemark;
  const postEdges = data.allMarkdownRemark.edges;

  return (
    <Layout title={postNode.frontmatter.title}>
      <section className="mb-6" dangerouslySetInnerHTML={{ __html: postNode.html }} />
      <PostFeed postEdges={postEdges} />
    </Layout>
  );
};

export default PageTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query Kitchen($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "receipe" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            dateFormatted
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`;
