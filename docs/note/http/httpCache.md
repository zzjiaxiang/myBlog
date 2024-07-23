---
id: httpCache
title: http缓存
tags: [http缓存,httpCache]
keywords: [http缓存,httpCache]
description: http缓存
last_update:
  date: 6/3/2024
  author: ZhangJiaxiang
---

### 先简单介绍一下http缓存,[更新策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Conditional_requests#%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)

![http 没有缓存或者缓存为空](https://png.zjiaxiang.cn/blog/202407231824125.png)
假如缓存为空，或者是没有缓存的话，被请求资源会以状态码 200 OK 返回。验证器会同资源一起返回，它们出现在首部字段中。在这个例子中， Last-Modified 与 ETag 都被返回，不过如果只返回其中的一个也是可以的。这些验证器会同资源一起被缓存起来（与所有的首部一样），并在在缓存失效的时候用来发起条件式请求。

只要缓存未失效，就不会发起任何请求。但是一旦失效——主要是由 [Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control) 首部控制——客户端就不会采用缓存值而是发起条件式请求。验证器的值会用作 If-Modified-Since 和 If-Match 首部字段的参数。

假如资源未发生变化，服务器就返回状态码为 304 Not Modified 的响应。这样相当于对缓存资源进行了刷新，而客户端则采用被缓存的资源。尽管这里有一次请求/响应往返会消耗一定的资源，但是这样做比将整个资源通过网络再传输一遍更高效。

![使用缓存](https://png.zjiaxiang.cn/blog/202407231826198.png)
假如资源发生了变化，服务器就直接返回 200 OK 响应码，连同新版本的资源，就像是没有应用条件式请求一样；客户端则采用新版本资源（并将其缓存起来）。

![新缓存](https://png.zjiaxiang.cn/blog/202407231827857.png)

#### [Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)

Cache-Control 通用消息头字段，被用于在 http 请求和响应中，通过指定指令来实现缓存机制。缓存指令是单向的，这意味着在请求中设置的指令，不一定被包含在响应中。

- no-store 禁止缓存
- no-cache 需要进行协商缓存
- max-age=`<seconds>` 缓存的最大周期

这里只列举这几种缓存指令，更多可以查看[文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)

### 总结一下
- 没有缓存或者缓存为空，请求资源状态码返回200,以及验证器一起返回，并缓存起来.
- 根据 Cache-Control 判断缓存是否失效并发起请求.

### 单页面应用缓存方法
无论使用vue或者react框架,都会使用到webpack 等构建工具可以[自动执行向资源网址分配哈希指纹的过程](https://webpack.js.org/guides/caching/#output-filenames)。

即前端打包后的生成一个`index.html`(这个文件会引入所有的css,js文件),服务端在`index.html`响应消息中添加 `Cache-Control: no-cache`,表示需要走协商缓存,同时设置 Last-Modified 或 ETag 中一个(用于协商缓存),建议 ETag.

其他的js,css文件都会嵌入文件哈希值(会随着文件内容的改变而发生变化),例如:`style.x234dff.css`,这样我们在它的响应头中可以添加`Cache-Control: max-age=31536000`(即告诉浏览器这个资源在一年内无需请求,可以直接使用缓存内容.)

这样一来再升级更新时,假设我们只修改一处样式从而引起了一个style文件哈希值发生变化,同时index.html文件内容也发生了变化(因为index文件会引入style文件),用户在请求时,因为index文件走的是协商缓存`no-cache`,需要发送一次请求验证,文件内容发生变化,从而 Last-Modified 或 ETag 都会发生变化,浏览器返回新的资源同时返回200.而哈希值没有发生变化的那些js,css文件因为缓存时间是31536000(一年),所以浏览器会直接使用缓存,从而不会发起请求.


### [参考](https://web.dev/articles/http-cache?hl=zh-cn#browser-compatibility)
- [Google 如何利用“在重新验证时过时”功能提升广告效果](https://web.dev/case-studies/ads-case-study-stale-while-revalidate?hl=zh-cn)
