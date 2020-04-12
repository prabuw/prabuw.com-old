import React from "react";
import { Link } from "gatsby";

export const PostFeedItem = ({ postEdge }) => (
  <Link to={postEdge.node.fields.slug} className="flex flex-row mb-2">
    <div className="flex-grow">{postEdge.node.frontmatter.title}</div>
    <div className="flex-grow-0">{postEdge.node.frontmatter.shortDate}</div>
  </Link>
);
