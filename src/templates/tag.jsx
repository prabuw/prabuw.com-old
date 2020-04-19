import React from 'react';
import { graphql } from 'gatsby';
import { PostsByTagFeed } from '../components/PostsByTagFeed';

export const TagTemplate = ({ pageContext, data }) => {
  const postEdges = data.allMarkdownRemark.edges;

  return <PostsByTagFeed tag={pageContext.tag} postEdges={postEdges} />;
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
            dateFormatted
          }
          excerpt
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
