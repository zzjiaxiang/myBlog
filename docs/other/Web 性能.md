---
id: WebPerformance
title: Web 性能
tags: [Web performance]
keywords: [Web, performance]
description: Web 性能
last_update:
  date: 5/22/2024
  author: ZhangJiaxiang
---

### 为什么要优化 Web 性能? 或者说 Web 速度为什么很重要?

总结一下 [web.dev(性能)](https://web.dev/learn/performance/why-speed-matters?hl=zh-cn)这篇文章这几点(建议阅读原文,其中有不少案例).

- 关乎用户留存率
- 提高转化次数
- 用户体验

相比于加载速度缓慢,加载速度快并能及时响应用户输入的网站能更好地吸引并留住用户。性能不佳可能会对业务成果产生负面影响.

速度慢的网站会对收入产生不利影响，而速度较快的网站可以提高转化率并改善业务成果.

网页加载速度延迟的网站可能会让用户感受到压力.

#### [衡量网页指标](https://web.dev/articles/user-centric-performance-metrics?hl=zh-cn)

- [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp?hl=zh-cn)：衡量加载性能。为了提供良好的用户体验，LCP 应在网页首次开始加载后的 2.5 秒内发生。
- [Interaction to Next Paint (INP)](https://web.dev/articles/inp?hl=zh-cn)：衡量互动。为了提供良好的用户体验，网页的 INP 应不超过 200 毫秒。
- [Cumulative Layout Shift (CLS)](https://web.dev/articles/cls?hl=zh-cn)：衡量视觉稳定性。为了提供良好的用户体验，网页应将 CLS 保持在 0.1 或更低。
- [First Contentful Paint (FCP)](https://web.dev/articles/fcp?hl=zh-cn)
  从网页开始加载到网页任何部分的内容呈现在屏幕上所用的时间。
- [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp?hl=zh-cn)
  从网页开始加载到屏幕上呈现最大的文本块或图片元素所用的时间。
- [首字节时间 (TTFB)](https://web.dev/articles/ttfb?hl=zh-cn)
  网络使用资源的第一个字节响应用户请求所需的时间。

#### 如何测量速度？

在Chrome 开发者工具中可以使用[lighthouse](https://developer.chrome.com/docs/lighthouse/overview?hl=zh-cn)来分析当前网页性能.

在[PageSpeed Insights](https://pagespeed.web.dev/?hl=zh-cn)中输入网址,可以分析你的网页性能.给出评分和建议.

#### 参考[web.dev(性能)](https://web.dev/learn/performance/why-speed-matters?hl=zh-cn)
