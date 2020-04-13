/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Layout } from '../Layout';
import { PostFeed } from '../PostFeed';

export const PostsByTagFeed = ({ tag, postEdges }) => {
  return (
    <Layout>
      <h2 className="mb-12">
        Posts tagged as <span className="italic underline">{tag}</span>
      </h2>
      <PostFeed postEdges={postEdges} />
    </Layout>
  );
};
