import React from "react";
import { Layout } from "../Layout";
import { Container } from "../Container";
import { PostFeedItem } from "../PostFeedItem";

export const PostFeed = ({ postEdges }) => {
  return (
    <Layout>
      <Container>
        <section>
          {postEdges.map(postEdge => (
            <PostFeedItem postEdge={postEdge} />
          ))}
        </section>
      </Container>
    </Layout>
  );
};
