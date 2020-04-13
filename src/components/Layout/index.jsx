import React from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import { Container } from "../Container";
import config from "../../../site-config";

import "./styles.css";

export const Layout = ({ children }) => (
  <>
    <Helmet>
      <html lang="en" />
      <meta name="description" content={config.siteDescription} />
    </Helmet>
    <nav className="pt-16">
      <Container className="flex">
        <Link to="/">
          <mark className="font-semibold p-2">Prabu Weerasinghe</mark>
        </Link>
        <div className="ml-auto nav-links">
          <Link to="/about">About me</Link>
        </div>
      </Container>
    </nav>
    <main className="py-8">
      <Container>{children}</Container>
    </main>
  </>
);
