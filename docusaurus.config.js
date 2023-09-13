const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'zjx Site',
  tagline: 'zjx blog',
  favicon: 'img/favicon.ico',
  url: 'https://www.zjiaxiang.cn',
  baseUrl: '/',
  organizationName: 'zzjiaxiang',
  projectName: 'myBlog',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime:true,
          showLastUpdateAuthor:true
        },
        blog: {
          showReadingTime: true
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // see(https://docusaurus.io/zh-CN/docs/api/themes/configuration#announcement-bar)
      // announcementBar: {
      //   id: 'support_us',
      //   content:
      //     'We are looking to revamp our docs, please fill <a target="_blank" rel="noopener noreferrer" href="#">this survey</a>',
      //   backgroundColor: '#fafbfc',
      //   textColor: '#091E42',
      //   isCloseable: true,
      // },
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'My Site',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            label: '笔记',
            position: 'left',
            docId:'note/readme',
          },
          {to: 'blog', label: '博客', position: 'left'},
          {
            href: 'https://github.com/zzjiaxiang',
            label: 'GitHub',
            position: 'right'
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/',
              },
              {
                label: 'Docusaurus',
                href: 'https://docusaurus.io/docs',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `<a href="https://beian.miit.gov.cn/" target="_blank">陕ICP备2023001423号-1</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: 'javascript',
      },
      algolia: {
        appId: 'D1NP13ZOC9',
        apiKey: '76f80e365e39eb2b8ad9f0683ce069c2',
        indexName: 'zjiaxiang',
      },
    }),
};

module.exports = config;
