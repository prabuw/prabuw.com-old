import React from "react";
import Helmet from "react-helmet";
import { Layout, Row, Col } from "antd";
import config from "../../../site-config";
import "./index.css";

export const SiteLayout = ({ children }) => {
  const { Content } = Layout;

  return (
    <Row justify="center">
      <Col span={14}>
        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <html lang="en" />
        </Helmet>
        <Content style={{ height: "100vh" }}>{children}</Content>
      </Col>
    </Row>
  );
};
