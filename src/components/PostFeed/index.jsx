import React from 'react';
import { Link } from 'gatsby';

export const PostFeed = ({ postEdges }) => {
  return (
    <section>
      {postEdges.map(postEdge => (
        <Link
          key={postEdge.node.fields.slug}
          to={postEdge.node.fields.slug}
          className="flex flex-row mb-2"
        >
          <div className="flex-grow">{postEdge.node.frontmatter.title}</div>
          <div className="flex-grow-0">{postEdge.node.fields.dateFormatted}</div>
        </Link>
      ))}
    </section>
  );
};
