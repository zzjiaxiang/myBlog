---
id: docusaurus-optimization
title: 优化docusaurus打包体积
tags: [docusaurus, optimization]
keywords: [docusaurus, optimization]
description: 优化docusaurus打包体积
last_update:
  date: 9/22/2023
  author: ZhangJiaxiang
---

docusaurus 默认会将第三方包都放到 main.js 中，导致打包体积过大。这个 js 加载时间过程.

根据它提供的 [configureWebpack](https://docusaurus.io/zh-CN/docs/api/plugin-methods/lifecycle-apis#configureWebpack)我们可以自己配置 webpack.

```js
// ./docusaurus-plugin/webpack.js
module.exports = (context, options) => ({
  name: 'docusaurus-plugin-webpack',
  configureWebpack(config, isServer, utils) {
    if (!isServer) {
      return {
        optimization: {
          splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: 'react-vendors',
                chunks: 'all',
              },
              lottie: {
                test: /[\\/]node_modules[\\/]lottie-react[\\/]/,
                name: 'lottie-vendors',
                chunks: 'all',
              },
              docusaurus: {
                test: /[\\/]node_modules[\\/]@docusaurus[\\/]/,
                name: 'docusaurus-vendors',
                chunks: 'all',
              },
            },
          },
        },
      }
    }
  },
})
```

这是需要与 docusaurus 合并的 webpack 配置,注意我们只需要在客户端使用这个配置所以加了 !isServer 判断.

在 docusaurus.config.js 中配置,注意引入的路径.

```js
// docusaurus.config.js
plugins: [['./docusaurus-plugin/webpack.js', {}]]
```
