---
id: WebPerformance
title: Web 性能
tags: [Web performance]
keywords: [Web, performance]
description: Web 性能
last_update:
  date: 6/3/2024
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

### [衡量网页指标](https://web.dev/articles/user-centric-performance-metrics?hl=zh-cn)

- [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp?hl=zh-cn) 最大内容绘制：
衡量加载性能。为了提供良好的用户体验，LCP 应在网页首次开始加载后的 2.5 秒内发生。
- [Interaction to Next Paint (INP)](https://web.dev/articles/inp?hl=zh-cn)：衡量互动。为了提供良好的用户体验，网页的 INP 应不超过 200 毫秒。
- [Cumulative Layout Shift (CLS)](https://web.dev/articles/cls?hl=zh-cn)：衡量视觉稳定性。为了提供良好的用户体验，网页应将 CLS 保持在 0.1 或更低。
- [First Contentful Paint (FCP)](https://web.dev/articles/fcp?hl=zh-cn) 首次内容绘制
  从网页开始加载到网页任何部分的内容呈现在屏幕上所用的时间。
- [(TTFB)](https://web.dev/articles/ttfb?hl=zh-cn)加载第一个字节所需时间
  网络使用资源的第一个字节响应用户请求所需的时间。

### 如何测量速度？

在Chrome 开发者工具中可以使用[lighthouse](https://developer.chrome.com/docs/lighthouse/overview?hl=zh-cn)来分析当前网页性能.

在[PageSpeed Insights](https://pagespeed.web.dev/?hl=zh-cn)中输入网址,可以分析你的网页性能.给出评分和建议.
[webpagetest](https://www.webpagetest.org/)会识别阻塞渲染和解析器的资源.

### [关键路径](https://web.dev/learn/performance/understanding-the-critical-path?hl=zh-cn)

关键路径是指网页开始在浏览器中呈现之前所涉及的步骤,为了呈现网页，浏览器需要 HTML 文档本身以及呈现该文档所需的所有关键资源。

#### 渐进式渲染

浏览器不会等待所有的资源下载完成才渲染网页,浏览器非常擅长渐进式渲染.

#### 关键渲染路径

浏览器在执行初始渲染之前执行的一系列步骤称为“关键渲染路径”。

了解关键渲染路径可确保您不会过度地阻止初始网页渲染，从而帮助您提高网页性能。但同时，也请务必从关键渲染路径中移除首次渲染所需的资源，以免过早地进行渲染。

- 通过 HTML 构建文档对象模型 (DOM)。
- 通过 CSS 构建 CSS 对象模型 (CSSOM)。
- 应用任何会更改 DOM 或 CSSOM 的 JavaScript。
- 通过 DOM 和 CSSOM 构建渲染树。
- 在页面上执行样式和布局操作，看看哪些元素适合显示。
- 在内存中绘制元素的像素。
- 如果有任何像素重叠，则合成像素。
- 以物理方式将所有生成的像素绘制到屏幕上。

如果需要详细了解各个步骤[阅读这篇文章](https://web.dev/articles/critical-rendering-path?hl=zh-cn),[这些步骤可能更复杂](https://developer.chrome.com/docs/chromium/renderingng-architecture?hl=zh-cn)

![渲染过程示意图（如前面的列表中所述）。](https://png.zjiaxiang.cn/blog/202406031306329.svg)
.不过通过上面图片可以对网页渲染有一个简单的了解.

#### 关键渲染路径上的资源

浏览器需要等待一些关键资源下载完毕，然后才能完成初始渲染。这些资源包括：

- HTML 的一部分。
- `<head> `元素中阻塞渲染的 CSS。
- `<head> `元素中的阻塞渲染的 JavaScript。
  在首次渲染时，浏览器通常不会等待：

- 所有 HTML。
- 字体。
- Images.
- `<head> `元素外（例如，位于 HTML 末尾的 `<script>` 元素）之外的非阻塞渲染的 JavaScript。
- `<head>` 元素外或media 属性值不适用于当前视口的 CSS，不会阻止内容渲染。

#### 阻塞渲染的资源

CSS 默认会阻塞渲染,浏览器在完成对该 CSS 的下载和处理之前，将避免呈现更多内容。尽管 CSS 默认会阻塞渲染,但也可以通过更改` <link>` 元素的 media 属性来指定与当前条件不匹配的值，将其转换为不阻塞渲染的资源：`<link rel=stylesheet href="..." media=print>`。 以允许非关键 CSS 以不阻塞渲染的方式加载。

#### 阻塞解析器的资源

阻塞解析器的资源是指那些阻止浏览器通过继续解析 HTML 来寻找要执行的其他工作的资源。默认情况下，JavaScript 会阻塞解析器（除非明确标记为异步或延迟），因为 JavaScript 可能会在执行时更改 DOM 或 CSSOM.

### 优化资源加载

#### CSS

CSS 是一种阻止呈现的资源,因此优化 CSS 可能会对整体网页加载时间产生重大影响。

- 缩减大小
  简而言之就是通过压缩css文件里面的空格或其他不可见的字符使得压缩后的文件大小变小。现在工程化框架在build后会自动压缩css文件。

- 避免使用 CSS @import 声明
  HTML `<link>` 元素是 HTML 响应的一部分，因此会比通过 @import 声明下载的 CSS 文件更早地被发现。

#### JavaScript

JavaScript 作为影响网页解析的资源.加载不带 defer 或 async 属性的` <script>` 元素时，浏览器会阻止解析和呈现，直到脚本下载、解析并执行完毕。同样，内联脚本也会阻止解析器，直到解析和执行脚本。
![描述各种属性的加载机制](https://png.zjiaxiang.cn/blog/202406031415532.svg)
图片来自[html.spec.whatwg.org](https://html.spec.whatwg.org/multipage/scripting.html)

使用 async 加载的脚本会在下载后立即解析和执行，而使用 defer 加载的脚本会在 HTML 文档解析完成时执行 - 这与浏览器的 DOMContentLoaded 事件同时发生。此外，async 脚本可能会不按顺序执行，而 defer 脚本则会按照它们在标记中出现的顺序执行。

默认情况下，使用 type="module" 属性加载的脚本会处于延迟状态，而使用 JavaScript 将 `<script> `标记注入 DOM 中加载的脚本则像 async 脚本。

- [拆分代码](https://web.dev/learn/performance/code-split-javascript?hl=zh-cn)
  与css类似,使用构建工具打包时会自动压缩js文件使得脚本变得更小。

### 通过资源提示更快的加载资源

- 资源提示可以告知浏览器如何加载资源并确定资源优先级，从而帮助开发者进一步缩短网页加载时间。
- 资源提示会指示浏览器提前执行某些操作，这些操作可以提高加载性能。
- 资源提示可以执行操作，例如执行早期 DNS 查找、提前连接到服务器，甚至在浏览器通常发现资源之前提取资源。

#### [preconnect](https://web.dev/learn/performance/resource-hints?hl=zh-cn#preconnect)

后续需要链接的域名,跨源服务器,常用用例是对提供字体的网域执行preconnect

```javascript
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

#### [dns-prefetch](https://web.dev/learn/performance/resource-hints?hl=zh-cn#dns-prefetch)

虽然尽早打开与跨源服务器的连接可以显著缩短初始网页加载时间，但同时与多个跨源服务器建立连接可能不合理或不可行。如果您担心可能过度使用了 preconnect，可以使用 dns-prefetch 提示来使用开销大大降低的资源提示。DNS 查找的费用相当低廉，并且由于费用相对较小，在某些情况下，它们可能比 preconnect 更适合。

```javascript
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://fonts.gstatic.com">
```

#### [preload](https://web.dev/learn/performance/resource-hints?hl=zh-cn#preload)

提前请求呈现网页所需的资源,使用 preload 指令下载的资源会以高优先级有效下载，如果过度使用，preload 可能会造成带宽争用，对网页加载速度产生负面影响。

```javascript
<link rel="preload" href="/lcp-image.jpg" as="image">
```

#### [prefetch](https://web.dev/learn/performance/resource-hints?hl=zh-cn#prefetch)

针对可能会用于未来导航的资源发起低优先级请求

- Prefetch 预取回的资源并不会被立刻解析、运行,例如取回的js文件不会被执行,只是文件保存到了浏览器缓存中。
  这也是Prefetch与普通 link 标签的核心区别。

- Prefetch 的触发时机不确定,由浏览器决定.

### [fetchpriority](https://web.dev/articles/fetch-priority?hl=zh-cn)
fetchpriority 属性在用于页面的 LCP 映像时尤其有效。通过使用此属性提高 LCP 图片的优先级，您可以相对轻松地改进网页的 LCP。
```javascript
<div class="gallery">
  <div class="poster">
    <img src="img/poster-1.jpg" fetchpriority="high">
  </div>
  <div class="thumbnails">
    <img src="img/thumbnail-2.jpg" fetchpriority="low">
    <img src="img/thumbnail-3.jpg" fetchpriority="low">
    <img src="img/thumbnail-4.jpg" fetchpriority="low">
  </div>
</div>
```
默认情况下，系统会以较低的优先级提取图片。完成布局后，如果发现图片位于初始视口内，优先级将提升为高。在前面的 HTML 代码段中，fetchpriority 会立即告知浏览器以高优先级下载较大的 LCP 图片，而以较低的优先级下载不太重要的缩略图。

现代浏览器分两个阶段加载资源。第一阶段预留给关键资源，并在所有阻塞脚本下载和执行后结束。在此阶段，低优先级资源的下载可能会延迟。通过使用 fetchpriority="high"，您可以提高资源的优先级，使浏览器能够在第一阶段下载资源。

不过此属性兼容性还不是很好 Chrome 102版本得到了支持,Firefox 截止2024-06-03 尚未支持。



#### 参考[web.dev(性能)](https://web.dev/learn/performance/why-speed-matters?hl=zh-cn)
