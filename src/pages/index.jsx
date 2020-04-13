import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { Layout } from '../components/Layout';
import { PostFeed } from '../components/PostFeed';
import config from '../../site-config';

const HomePage = ({ data }) => {
  const postEdges = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Helmet>
        <title>{config.siteTitle}</title>
        <meta name="description" content={config.siteDescription} />
      </Helmet>
      <section>
        <p>I am a software engineer based in London, UK.</p>
        <p>I am interested in software, product strategy and engineering management.</p>
      </section>
      <main className="py-8">
        {postEdges.length === 0 ? <>No posts, yet.</> : <PostFeed postEdges={postEdges} />}
      </main>
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
