const config = {
  siteTitle: "Prabu Weerasinghe", // Site title.
  siteTitleShort: "Prabu's Blog", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Prabu Weerasinghe", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://www.prabuw.com", // Domain of your website.
  siteDescription: "Prabu Weerasinghe's Blog.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteRssTitle: "Prabu Weerasinghe's Blog", // Title of the RSS feed
  siteFBAppID: "1825356251115265", // FB Application ID for using app insights
  googleAnalyticsID: "UA-47311644-5", // GA tracking ID.
  disqusShortname: "https-vagr9k-github-io-gatsby-advanced-starter", // Disqus shortname.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  postsPerPage: 4, // Amount of posts displayed per listing page.
  userName: "Prabu Weerasinghe", // Username to display in the author segment.
  userEmail: "prabu.weerasinghe@gmail.com", // Email used for RSS feed's author segment
  userTwitter: "prabz", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "London, UK", // User location to display in the author segment.
  userAvatar: "https://api.adorable.io/avatars/150/test.png", // User avatar to display in the author segment.
  userDescription: "Random thoughts from my mind. Forgive me. ;)", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/prabuw",
      iconClassName: "fa fa-github"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/prabz",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:prabu.weerasinghe@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2020.", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
};

module.exports = config;
