import React from 'react';
import _ from 'lodash';
import { Link, graphql } from 'gatsby';
import { Layout } from '../components/Layout';

const formatTime = mins => {
  if (mins < 60) {
    return `${mins} mins`;
  }

  const hours = mins / 60;
  const minsLeftOver = mins % 60;

  if (minsLeftOver === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${minsLeftOver}`;
};

const ReceipeTemplate = ({ data }) => {
  const { html, frontmatter, fields } = data.markdownRemark;

  return (
    <Layout title={frontmatter.title}>
      <section className="mb-4">
        <h2 className="">{frontmatter.title}</h2>
        <time dateTime={frontmatter.date} className="text-sm mr-3 text-gray-500">
          {fields.dateFormatted}
        </time>
        <div className="mb-6">
          {frontmatter.tags.map(tag => (
            <Link key={tag} className="mr-3 text-sm" to={`/tags/${_.kebabCase(tag)}`}>
              {tag}
            </Link>
          ))}
        </div>
      </section>
      <section className="mb-10 text-gray-700">
        <div className="flex flex-row mb-1">
          <div className="pr-1">Preparation time:</div>
          <div>{formatTime(frontmatter.prepTime)}</div>
        </div>
        <div className="flex flex-row">
          <div className="pr-1">Cooking time:</div>
          <div>{formatTime(frontmatter.cookingTime)}</div>
        </div>
      </section>
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export default ReceipeTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ReceipeBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        tags
        prepTime
        cookingTime
      }
      fields {
        dateFormatted
      }
    }
  }
`;
