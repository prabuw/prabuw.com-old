import React from "react";
import { graphql, Link } from "gatsby";
import Helmet from "react-helmet";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import config from "../../site-config";

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
              <Link
                to={postEdge.node.fields.slug}
                className="flex flex-row mb-2"
              >
                <div className="flex-grow">
                  {postEdge.node.frontmatter.title}
                </div>
                <div className="flex-grow-0">
                  {postEdge.node.frontmatter.shortDate}
                </div>
              </Link>
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
