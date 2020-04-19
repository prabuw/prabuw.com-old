import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { Container } from '../Container';
import config from '../../../site-config';

import './styles.css';

export const Layout = ({ title, children }) => {
  const pageTitle = title == null ? config.siteTitle : `${title} — ${config.siteTitle}`;

  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta name="description" content={config.siteDescription} />
        <title>{pageTitle}</title>
      </Helmet>
      <nav className="pt-16">
        <Container className="flex">
          <Link to="/" className="brand">
            <span className="font-semibold text-xl text-black px-2">Prabu Weerasinghe</span>
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
};
