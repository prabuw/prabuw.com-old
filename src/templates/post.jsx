import React from 'react';
import { graphql } from 'gatsby';
import { Post } from '../components/Post';

const PostTemplate = ({ data }) => {
  const postNode = data.markdownRemark;

  return <Post postNode={postNode} />;
};

export default PostTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        tags
      }
      fields {
        slug
        dateFormatted
      }
    }
  }
`;
