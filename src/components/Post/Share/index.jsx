import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  FacebookShareCount,
  RedditShareCount,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon
} from "react-share";
import urljoin from "url-join";
import config from "../../../../site-config";
import "./styles.css";

export const Share = ({ postNode, postPath, mobile }) => {
  const post = postNode.frontmatter;
  const url = urljoin(config.siteUrl, postPath);
  const iconSize = mobile ? 24 : 36;
  const filter = count => (count > 0 ? count : "");
  const renderShareCount = count => (
    <div className="share-count">{filter(count)}</div>
  );

  return (
    <div className="share-buttons">
      <FacebookShareButton url={url} quote={postNode.excerpt}>
        <FacebookIcon size={iconSize} round />
        <FacebookShareCount url={url}>
          {count => renderShareCount(count)}
        </FacebookShareCount>
      </FacebookShareButton>
      <TwitterShareButton url={url} title={post.title}>
        <TwitterIcon size={iconSize} round />
      </TwitterShareButton>
      <RedditShareButton url={url} title={post.title}>
        <RedditIcon size={iconSize} round />
        <RedditShareCount url={url}>
          {count => renderShareCount(count)}
        </RedditShareCount>
      </RedditShareButton>
      <LinkedinShareButton
        url={url}
        title={post.title}
        description={postNode.excerpt}
      >
        <LinkedinIcon size={iconSize} round />
      </LinkedinShareButton>
    </div>
  );
};
