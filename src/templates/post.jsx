import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { Layout, Typography, Divider } from "antd";
import { SiteLayout } from "../components/SiteLayout";
import Disqus from "../components/Disqus/Disqus";
import PostTags from "../components/PostTags/PostTags";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import SEO from "../components/SEO/SEO";
import config from "../../site-config";
import "./post.css";

const PostTemplate = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }

  return (
    <SiteLayout>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} />
      <Layout.Content>
        <Typography.Title>{post.title}</Typography.Title>
        <time dateTime={post.date}>{post.shortDate}</time>
        <Layout.Content className="markdown-body">
          <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
        </Layout.Content>
        <Divider />
        <div className="post-meta">
          <PostTags tags={post.tags} />
          <SocialLinks postPath={slug} postNode={postNode} />
        </div>
        <Disqus postNode={postNode} />
      </Layout.Content>
    </SiteLayout>
  );
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
        shortDate: date(formatString: "DD MMMM YYYY")
        category
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`;
