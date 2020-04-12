import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { PostFeed } from "../components/PostFeed";
import config from "../../site-config";

export const CategoryTemplate = ({ pageContext, data }) => {
  const postEdges = data.allMarkdownRemark.edges;

  return (
    <>
      <Helmet
        title={`Posts in category "${pageContext.category}" | ${config.siteTitle}`}
      />
      <PostFeed postEdges={postEdges} />
    </>
  );
};

export default CategoryTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
