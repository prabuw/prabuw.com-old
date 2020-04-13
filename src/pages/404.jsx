import React from "react";
import Helmet from "react-helmet";
import { Layout } from "../components/Layout";
import config from "../../site-config";

const Page404 = () => {
  return (
    <>
      <Helmet>
        <title>{config.siteTitle}</title>
        <meta name="description" content={config.siteDescription} />
      </Helmet>
      <Layout>
        <h2>Sorry, the page you were looking for could not be found.</h2>
      </Layout>
    </>
  );
};

export default Page404;
