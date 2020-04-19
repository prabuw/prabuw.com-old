import React from 'react';
import Helmet from 'react-helmet';
import urljoin from 'url-join';
import config from '../../../site-config';

export const Seo = ({ postNode, postPath }) => {
  const postMeta = postNode.frontmatter;
  const { title, cover: image } = postMeta;
  const description = postMeta.description ? postMeta.description : postNode.excerpt;

  const postURL = urljoin(config.siteUrl, postPath);
  const blogURL = urljoin(config.siteUrl);

  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: blogURL,
      name: title,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
    },
    {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': postURL,
            name: title,
            image,
          },
        },
      ],
    },
    {
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      url: blogURL,
      name: title,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
      headline: title,
      image: {
        '@type': 'ImageObject',
        url: image,
      },
      description,
    },
  ];

  return (
    <Helmet>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={postURL} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.userTwitter ? config.userTwitter : ''} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
