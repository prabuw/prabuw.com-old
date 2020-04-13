import React from "react";
import Helmet from "react-helmet";
import _ from "lodash";
import { Link } from "gatsby";
import { TwitterShareButton } from "react-share";
import urljoin from "url-join";
import { Layout } from "../Layout";
import SEO from "../SEO/SEO";
import config from "../../../site-config";

export const Post = ({ slug, postNode }) => {
  const post = postNode.frontmatter;

  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} />
      <h1>{post.title}</h1>
      <div className="text-sm">
        <time dateTime={post.date} className="mr-3 text-gray-500">
          {post.shortDate}
        </time>
        <TwitterShareButton
          url={urljoin(config.siteUrl, slug)}
          title={post.title}
        >
          <span className="mr-3 text-gray-700 hover:text-blue-400">Share</span>
        </TwitterShareButton>
      </div>
      {post.tags.map(tag => (
        <Link className="mr-3 italic text-sm" to={`/tags/${_.kebabCase(tag)}`}>
          {tag}
        </Link>
      ))}
      <div
        className="mt-12"
        dangerouslySetInnerHTML={{ __html: postNode.html }}
      />
    </Layout>
  );
};
