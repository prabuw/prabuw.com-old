const config = {
  siteTitle: 'Prabu Weerasinghe', // Site title.
  siteTitleShort: "Prabu's Blog", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: 'Prabu Weerasinghe', // Alternative site title for SEO.
  siteLogo: '/logos/logo-1024.png', // Logo used for SEO and manifest.
  siteUrl: 'https://www.prabuw.com', // Domain of your website.
  siteDescription: "Prabu Weerasinghe's Blog.", // Website description used for RSS feeds/meta description tag.
  siteRss: '/rss.xml', // Path to the RSS file.
  siteRssTitle: "Prabu Weerasinghe's Blog", // Title of the RSS feed
  siteFBAppID: '1825356251115265', // FB Application ID for using app insights
  googleAnalyticsID: 'UA-47311644-5', // GA tracking ID.
  dateFromFormat: 'YYYY-MM-DD', // Date format used in the frontmatter.
  dateFormat: 'DD/MM/YYYY', // Date format for display.
  userEmail: 'prabu.weerasinghe@gmail.com', // Email used for RSS feed's author segment
  userTwitter: 'prabz', // Optionally renders "Follow Me" in the UserInfo segment.
  copyright: 'Copyright © 2020.', // Copyright string for the footer of the website and RSS feed.
  themeColor: '#c62828', // Used for setting manifest and progress theme colors.
  backgroundColor: '#e0e0e0', // Used for setting manifest background color.
};

module.exports = config;
