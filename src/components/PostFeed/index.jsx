import React from "react";
import { Layout } from "../Layout";
import { PostFeedItem } from "../PostFeedItem";

export const PostFeed = ({ postEdges }) => {
  return (
    <Layout>
      <section>
        {postEdges.map(postEdge => (
          <PostFeedItem postEdge={postEdge} />
        ))}
      </section>
    </Layout>
  );
};
