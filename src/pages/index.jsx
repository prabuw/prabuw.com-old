import React, { Component } from "react";
import Helmet from "react-helmet";
import { Divider } from "antd";
import { SiteLayout } from "../components/SiteLayout";
import config from "../../site-config";

class HomePage extends Component {
  render() {
    return (
      <SiteLayout>
        <Helmet title={`${config.siteTitle}`} />
        <p>I am Prabu Weerasinghe , a software engineer based in London, UK.</p>
        <p>
          I am interested in software, product management and engineering
          management.
        </p>
        <Divider />
      </SiteLayout>
    );
  }
}

export default HomePage;
