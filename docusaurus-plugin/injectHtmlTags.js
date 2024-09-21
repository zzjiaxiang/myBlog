module.exports = (context, options) => ({
  name: 'docusaurus-plugin',
  injectHtmlTags() {
    return {
      headTags: [
        {
          tagName: 'link',
          attributes: {
            rel: 'dns-prefetch',
            href: 'https://www.png.zjiaxiang.cn',
          },
        },
      ],
    }
  },
})
