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
    <nav>
      <Container>
        <Link to="/" className="text-xl">
          Prabu Weerasinghe
        </Link>
      </Container>
    </nav>
    <main>
      <Container>{children}</Container>
    </main>
  </>
);
