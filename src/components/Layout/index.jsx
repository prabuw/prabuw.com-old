import React from "react";
import Helmet from "react-helmet";
import config from "../../../data/SiteConfig";

export const Layout = ({ children }) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="en" />
      </Helmet>
      {children}
    </div>
  );
};
