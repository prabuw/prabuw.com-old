import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import config from "../../site-config";
import { PostFeedItem } from "../components/PostFeedItem";

const HomePage = ({ data }) => {
  const postEdges = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Helmet title={`${config.siteTitle}`} />
      <Container>
        {postEdges.length === 0 ? (
          <>No posts, yet.</>
        ) : (
          <section>
            {postEdges.map(postEdge => (
              <PostFeedItem postEdge={postEdge} />
            ))}
          </section>
        )}
      </Container>
    </Layout>
  );
};

export default HomePage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            shortDate: date(formatString: "DD MMMM YYYY")
          }
        }
      }
    }
  }
`;
