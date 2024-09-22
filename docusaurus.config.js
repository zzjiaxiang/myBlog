const { themes } = require('prism-react-renderer')
const { github: theme, dracula: darkTheme } = themes

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'zjx Site',
  tagline: 'zjx blog',
  favicon: 'https://png.zjiaxiang.cn/wenjian/myIcon.webp',
  url: 'https://www.jiaxiang.me',
  baseUrl: '/',
  organizationName: 'zzjiaxiang',
  projectName: 'myBlog',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  plugins: [
    'docusaurus-plugin-sass',
    './docusaurus-plugin/injectHtmlTags.js',
    './docusaurus-plugin/webpack.js',
  ],
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
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // see(https://docusaurus.io/zh-CN/docs/api/themes/configuration#announcement-bar)
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '',
        hideOnScroll: true,
        logo: {
          alt: 'My Site Logo',
          src: 'https://png.zjiaxiang.cn/wenjian/myIcon.webp',
          style: { borderRadius: '50%' },
        },
        items: [
          {
            type: 'doc',
            label: '笔记',
            position: 'right',
            docId: 'note/readme',
          },
          { to: 'blog', label: '博客', position: 'right' },
          {
            label: '更多',
            position: 'right',
            items: [
              {
                label: '网站资源',
                to: 'resource',
              },
            ],
          },
          {
            href: 'https://github.com/zzjiaxiang',
            label: 'GitHub',
            position: 'right',
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
        theme,
        darkTheme,
        defaultLanguage: 'javascript',
      },
      algolia: {
        appId: 'BVQJGT9WCV',
        apiKey: 'f0f5fe6ade9f5fab830487a39130661c',
        indexName: 'jiaxiang',
      },
    }),
}

module.exports = config
