// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
// Provide Open Graph prefix for all pages
const ssrTemplate =
  require("@docusaurus/core/lib/webpack/templates/ssr.html.template").default.replace(
    "<html",
    '<html prefix="og: https://ogp.me/ns#"'
  );

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Nebulon",
  tagline: "The Rebel Alliance's blog vs. the Microservice Empire",
  url: "https://brack0.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/global/favicon.ico",
  organizationName: "brack0", // Usually your GitHub org/user name.
  projectName: "nebulon", // Usually your repo name.
  ssrTemplate,

  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          archiveBasePath: null, // Archive disabled
          blogDescription:
            "The Rebel Alliance's blog vs. the Microservice Empire",
          postsPerPage: 5,
          blogSidebarCount: "ALL",
          blogSidebarTitle: "All posts",
        },
        sitemap: {
          ignorePatterns: [
            "/search",
            "/blog/tags/**",
            "/blog/rss.xml",
            "/fec/tags/**",
            "/fec/rss.xml",
          ],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "fec",
        archiveBasePath: null, // Archive disabled
        blogDescription:
          "Find all the episodes of Front-end chronicles podcast",
        blogSidebarCount: "ALL",
        blogSidebarTitle: "All podcast episodes",
        blogTitle: "Front-End Chronicles",
        showReadingTime: false,
        routeBasePath: "fec",
        path: "./fec",
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
      },
      metadata: [{ property: "og:type", content: "website" }],
      algolia: {
        appId: "HTJ7YUHSQ1",
        apiKey: "7eb295a5197051772951655cb37497c4",
        indexName: "crawler_brack0.dev",
      },
      navbar: {
        title: "brack0.dev",
        logo: {
          alt: "My Site Logo",
          src: "img/global/logo.svg",
          height: "32",
          width: "40",
        },
        items: [
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/fec", label: "Front-End Chronicles", position: "left" },
          {
            type: "dropdown",
            label: "About",
            position: "left",
            items: [
              { to: "/references", label: "References" },
              { to: "/trivia", label: "Trivia" },
            ],
          },
          {
            type: "localeDropdown",
            position: "right",
          },
          {
            href: "//github.com/brack0",
            position: "right",
            className: "header-link header-github-link",
            "aria-label": "GitHub repository",
          },
          {
            href: "//gitlab.com/brack0",
            position: "right",
            className: "header-link header-gitlab-link",
            "aria-label": "Gitlab repository",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "About Me",
            items: [
              {
                label: "LinkedIn",
                href: "//www.linkedin.com/in/denis-souron/",
              },
              {
                label: "Pluralsight",
                href: "//app.pluralsight.com/profile/denis-souron",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Dev.to",
                href: "//dev.to/brack0",
              },
              {
                label: "Anchor",
                href: "//anchor.fm/front-end-chronicles",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "//github.com/brack0",
              },
              {
                label: "GitLab",
                href: "//gitlab.com/brack0",
              },
            ],
          },
          {
            title: "Support Me",
            items: [
              {
                html: `<a href="//ko-fi.com/brack0" target="_blank"><img src="/img/global/ko-fi.png" srcset="/img/global/ko-fi@2x.png 2x, /img/global/ko-fi@3x.png 3x" alt="Buy Me A Coffee" height="46" width="205" ></a>`,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nebulon. Built with Docusaurus 2. Hosted on Vercel.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
