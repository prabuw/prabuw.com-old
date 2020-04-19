import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/Layout';

const PageTemplate = ({ data }) => {
  const postNode = data.markdownRemark;

  return (
    <Layout title={postNode.frontmatter.title}>
      <article dangerouslySetInnerHTML={{ __html: postNode.html }} />
    </Layout>
  );
};

export default PageTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
