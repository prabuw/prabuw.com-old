import React, { useState } from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import { Link } from 'gatsby';
import { TwitterShareButton } from 'react-share';
import urljoin from 'url-join';
import { Layout } from '../Layout';
import { Seo } from '../SEO';
import config from '../../../site-config';

import './styles.css';

export const Post = ({ postNode }) => {
  const [shouldShowTwitterIcon, setShouldShowTwitterIcon] = useState(false);
  const { frontmatter: post, fields } = postNode;

  function toggleTwitterIcon() {
    setShouldShowTwitterIcon(!shouldShowTwitterIcon);
  }

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
          <span
            className={clsx(
              { 'text-black': shouldShowTwitterIcon },
              { 'text-gray-700': !shouldShowTwitterIcon },
              'mr-1'
            )}
          >
            Share
          </span>
          <span
            className={clsx(
              { 'opacity-100': shouldShowTwitterIcon },
              { 'opacity-0': !shouldShowTwitterIcon },
              'inline-block transition-opacity duration-200 ease-in'
            )}
          >
            on twitter
          </span>
        </TwitterShareButton>
      </div>
      {post.tags.map(tag => (
        <Link key={tag} className="mr-3 text-sm" to={`/tags/${_.kebabCase(tag)}`}>
          {tag}
        </Link>
      ))}
      <article className="mt-12 post" dangerouslySetInnerHTML={{ __html: postNode.html }} />
    </Layout>
  );
};
