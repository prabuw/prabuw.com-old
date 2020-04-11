import React from "react";
import Helmet from "react-helmet";
import { Layout, Typography, Divider } from "antd";
import { Tag } from "./Tag";
import { SiteLayout } from "../SiteLayout";
import Disqus from "../Disqus/Disqus";
import { Share } from "./Share";
import SEO from "../SEO/SEO";
import config from "../../../site-config";
import "./post.css";

export const Post = ({ slug, postNode }) => {
  const post = postNode.frontmatter;

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
        {post.tags.map(tag => (
          <Tag key={tag} tag={tag} />
        ))}
        <Divider />
        <Share postPath={slug} postNode={postNode} />
        <Disqus postNode={postNode} />
      </Layout.Content>
    </SiteLayout>
  );
};
