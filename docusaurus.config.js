// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Nebulon",
  tagline: "Le blog de l'Alliance Rebelle contre l'Empire du Microservice",
  url: "https://brack0.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "brack0", // Usually your GitHub org/user name.
  projectName: "nebulon", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          blogDescription:
            "Le blog de l'Alliance Rebelle contre l'Empire du Microservice",
          showReadingTime: true,
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
        blogDescription:
          "Retrouvez tous les épisodes du podcast Front-End Chronicles",
        blogSidebarCount: "ALL",
        blogSidebarTitle: "Les épisodes du podcast",
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
      navbar: {
        title: "brack0.dev",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/fec", label: "Front-End Chronicles", position: "left" },
          { to: "/references", label: "References", position: "left" },
          {
            href: "https://github.com/brack0",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://gitlab.com/brack0",
            label: "GitLab",
            position: "right",
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
                href: "https://www.linkedin.com/in/denis-souron/",
              },
              {
                label: "Pluralsight",
                href: "https://app.pluralsight.com/profile/denis-souron",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Dev.to",
                href: "https://dev.to/brack0",
              },
              {
                label: "Anchor",
                href: "https://anchor.fm/front-end-chronicles",
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
                href: "https://github.com/brack0",
              },
              {
                label: "GitLab",
                href: "https://gitlab.com/brack0",
              },
            ],
          },
          {
            title: "Support me",
            items: [
              {
                html: `<a href="https://www.buymeacoffee.com/brack0" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>`,
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
