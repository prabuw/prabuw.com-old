import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { PostsByTagFeed } from '../components/PostsByTagFeed';
import config from '../../site-config';

export const TagTemplate = ({ pageContext, data }) => {
  const postEdges = data.allMarkdownRemark.edges;

  return (
    <>
      <Helmet title={`Posts tagged as "${pageContext.tag}" | ${config.siteTitle}`} />
      <PostsByTagFeed tag={pageContext.tag} postEdges={postEdges} />
    </>
  );
};

export default TagTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          frontmatter {
            title
            shortDate: date(formatString: "DD MMMM YYYY")
          }
        }
      }
    }
  }
`;
