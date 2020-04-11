import React from "react";
import { graphql, Link } from "gatsby";
import Helmet from "react-helmet";
import { Row, Col, Divider, List } from "antd";
import { SiteLayout } from "../components/SiteLayout";
import config from "../../site-config";

const HomePage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <SiteLayout>
      <Helmet title={`${config.siteTitle}`} />
      <div>
        I am Prabu Weerasinghe, a software engineer based in London, UK.
      </div>
      <div>
        I am interested in software, product management and engineering
        management.
      </div>
      <Divider />
      {posts.length === 0 ? (
        <div>None</div>
      ) : (
        <List
          itemLayout="horizontal"
          size="small"
          dataSource={posts}
          renderItem={post => (
            <List.Item>
              <Link to={post.node.fields.slug} style={{ width: "100%" }}>
                <Row>
                  <Col span={8}>{post.node.frontmatter.title}</Col>
                  <Col span={4} offset={4}>
                    {post.node.frontmatter.shortDate}
                  </Col>
                </Row>
              </Link>
            </List.Item>
          )}
        />
      )}
    </SiteLayout>
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
