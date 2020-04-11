import React, { Component } from "react";
import Helmet from "react-helmet";
import { Layout, Row, Col, Divider } from "antd";
import config from "../../site-config";

class HomePage extends Component {
  render() {
    const { Content } = Layout;

    return (
      <Row justify="center">
        <Col span={14}>
          <Helmet title={`${config.siteTitle}`} />
          <Content style={{ height: "100vh" }}>
            <p>
              I am <span style={{ fontWeight: "bold" }}>Prabu Weerasinghe</span>
              , a software engineer based in London, UK.
            </p>
            <p>
              I am interested in software, product management and engineering
              management.
            </p>
            <Divider />
          </Content>
        </Col>
      </Row>
    );
  }
}

export default HomePage;
