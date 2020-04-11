import React from "react";
import { Link } from "gatsby";
import _ from "lodash";
import "./styles.css";

export const Tag = ({ tag }) => {
  return (
    <Link className="tag" to={`/tags/${_.kebabCase(tag)}`}>
      {tag}
    </Link>
  );
};
