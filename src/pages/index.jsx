import React from "react";
import { graphql, Link } from "gatsby";
import Helmet from "react-helmet";
import { Container } from "../components/Container";
import { PostFeedItem } from "../components/PostFeedItem";
import config from "../../site-config";

const HomePage = ({ data }) => {
  const postEdges = data.allMarkdownRemark.edges;

  return (
    <>
      <Helmet>
        <title>{config.siteTitle}</title>
        <meta name="description" content={config.siteDescription} />
      </Helmet>
      <nav className="pt-16">
        <Container>
          <p>
            I am{" "}
            <Link to="/" className="font-bold">
              <mark>Prabu Weerasinghe</mark>
            </Link>
            , a software engineer based in London, UK.
          </p>
          <p>
            I am interested in software, product strategy and engineering
            management.
          </p>
        </Container>
      </nav>
      <main className="py-8">
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
      </main>
    </>
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
