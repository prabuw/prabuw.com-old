import React, { useState } from 'react';
import Helmet from 'react-helmet';
import _ from 'lodash';
import { Link } from 'gatsby';
import { TwitterShareButton } from 'react-share';
import urljoin from 'url-join';
import { Layout } from '../Layout';
import { Seo } from '../Seo';
import config from '../../../site-config';
import TwitterLogo from './twitter-logo.svg';

export const Post = ({ postNode }) => {
  const [shouldShowTwitterIcon, setShouldShowTwitterIcon] = useState(false);
  const { frontmatter: post, fields } = postNode;

  function toggleTwitterIcon() {
    setShouldShowTwitterIcon(!shouldShowTwitterIcon);
  }

  const twitterIconOpacityClass = shouldShowTwitterIcon ? 'opacity-100' : 'opacity-0';

  return (
    <Layout title={post.title}>
      <Seo postPath={fields.slug} postNode={postNode} />
      <h1>{post.title}</h1>
      <div className="text-sm">
        <time dateTime={post.date} className="mr-3 text-gray-500">
          {fields.dateFormatted}
        </time>
        <TwitterShareButton
          url={urljoin(config.siteUrl, fields.slug)}
          title={post.title}
          onMouseEnter={toggleTwitterIcon}
          onMouseLeave={toggleTwitterIcon}
        >
          <span className="mr-2 text-gray-700 hover:text-black">Share</span>
          <TwitterLogo
            className={`${twitterIconOpacityClass} inline-block h-4 w-4 fill-current text-blue-400 transition-opacity duration-300 linear`}
          />
        </TwitterShareButton>
      </div>
      {post.tags.map(tag => (
        <Link key={tag} className="mr-3 text-sm" to={`/tags/${_.kebabCase(tag)}`}>
          {tag}
        </Link>
      ))}
      <article className="mt-12" dangerouslySetInnerHTML={{ __html: postNode.html }} />
    </Layout>
  );
};
