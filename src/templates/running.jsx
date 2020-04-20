import React from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';
import { Layout } from '../components/Layout';

function metersToKilometers(meters) {
  return _.round(meters / 1000, 2).toFixed(2);
}

function formatTimeToMinutes(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const RunningTemplate = ({ data }) => {
  const postNode = data.markdownRemark;
  const activities = data.allStravaActivity.edges.map(e => e.node.activity);

  return (
    <Layout title={postNode.frontmatter.title}>
      <p dangerouslySetInnerHTML={{ __html: postNode.html }} />
      <table className="w-full mt-8">
        <thead>
          <tr>
            <th>Date</th>
            <th>Distance (km)</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(a => (
            <tr key={a.id}>
              <td className="text-center">{a.start_date}</td>
              <td className="text-center">{metersToKilometers(a.distance)}</td>
              <td className="text-center">{formatTimeToMinutes(a.moving_time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default RunningTemplate;

/* eslint no-undef: "off" */
export const runningQuery = graphql`
  query RunningBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
    allStravaActivity(
      filter: { activity: { type: { eq: "Run" }, distance: { gte: 4000 } } }
      sort: { order: DESC, fields: activity___start_date }
    ) {
      edges {
        node {
          activity {
            name
            distance
            id
            start_date(formatString: "DD MMM YYYY")
            moving_time
          }
        }
      }
    }
  }
`;
