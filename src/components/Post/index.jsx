import React from "react";
import Helmet from "react-helmet";
import { Layout, Typography, Divider } from "antd";
import { SiteLayout } from "../SiteLayout";
import Disqus from "../Disqus/Disqus";
import PostTags from "../PostTags/PostTags";
import SocialLinks from "../SocialLinks/SocialLinks";
import SEO from "../SEO/SEO";
import config from "../../../site-config";
import "./post.css";

export const Post = ({ slug, postNode }) => {
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
