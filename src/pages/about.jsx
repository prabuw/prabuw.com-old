import React from "react";
import Helmet from "react-helmet";
import { Layout } from "../components/Layout";
import config from "../../site-config";

const AboutPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>{`About — ${config.siteTitle}`}</title>
        <meta name="description" content={config.siteDescription} />
      </Helmet>
      <section>
        <p>I am a software engineer based in London, UK.</p>
        <p>
          I am interested in software, product strategy and engineering
          management.
        </p>
      </section>
    </Layout>
  );
};

export default AboutPage;
