import React from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import { Container } from "../Container";
import config from "../../../site-config";

export const Layout = ({ children }) => (
  <>
    <Helmet>
      <meta name="description" content={config.siteDescription} />
      <html lang="en" />
    </Helmet>
    <Container>
      <nav>
        <Link to="/" className="text-xl">
          Prabu Weerasinghe
        </Link>
      </nav>
    </Container>
    <main>{children}</main>
  </>
);
