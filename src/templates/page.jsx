import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { Layout } from '../components/Layout';
import config from '../../site-config';

const PostTemplate = ({ data }) => {
  const postNode = data.markdownRemark;

  return (
    <>
      <Helmet>
        <title>{`${postNode.frontmatter.title} - ${config.siteTitle}`}</title>
      </Helmet>
      <Layout>
        <article dangerouslySetInnerHTML={{ __html: postNode.html }} />
      </Layout>
    </>
  );
};

export default PostTemplate;

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
