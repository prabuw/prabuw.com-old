import React from "react";
import { Link } from "gatsby";
import { Layout } from "../Layout";
import { Container } from "../Container";

export const PostFeed = ({ postEdges }) => {
  return (
    <Layout>
      <Container>
        <section>
          {postEdges.map(postEdge => (
            <Link to={postEdge.node.fields.slug} className="flex flex-row mb-2">
              <div className="flex-grow">{postEdge.node.frontmatter.title}</div>
              <div className="flex-grow-0">
                {postEdge.node.frontmatter.shortDate}
              </div>
            </Link>
          ))}
        </section>
      </Container>
    </Layout>
  );
};
