import React from 'react';
import { graphql } from 'gatsby';
import { Post } from '../components/Post';

const PostTemplate = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;

  return <Post slug={slug} postNode={postNode} />;
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
        shortDate: date(formatString: "MMMM DD, YYYY")
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`;
