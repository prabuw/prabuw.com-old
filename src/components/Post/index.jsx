import React from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import { Tag } from "./Tag";
import { Layout } from "../Layout";
import Disqus from "../Disqus/Disqus";
import { Share } from "./Share";
import SEO from "../SEO/SEO";
import { Container } from "../Container";
import { Divider } from "../Divider";
import config from "../../../site-config";
import "./post.css";

export const Post = ({ slug, postNode }) => {
  const post = postNode.frontmatter;

  return (
    <Layout>
      <Container>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} />
        <div className="container">
          <h1>{post.title}</h1>
          <div>
            <Link to={`/categories/${post.category}`}>
              <h4>{post.category}</h4>
            </Link>
            <time dateTime={post.date}>{post.shortDate}</time>
          </div>
          <div className="container markdown-body">
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          </div>
          <Divider />
          {post.tags.map(tag => (
            <Tag key={tag} tag={tag} />
          ))}
          <Divider />
          <Share postPath={slug} postNode={postNode} />
          <Disqus postNode={postNode} />
        </div>
      </Container>
    </Layout>
  );
};
