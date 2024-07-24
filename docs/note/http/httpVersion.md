---
id: httpVersion
title: http版本
tags: [http版本, httpVersion]
keywords: [http版本, httpVersion]
description: http版本
last_update:
  date: 6/4/2024
  author: ZhangJiaxiang
---

### HTTP/1.1——标准化的协议

前面还有 0.9 , 1.0,两个版本的协议,这里就不做介绍.

主要新特性:

- 连接可以复用，节省了多次打开 TCP 连接加载网页文档资源的时间。
- 增加管线化技术，允许在第一个应答被完全发送之前就发送第二个请求，以降低通信延迟。(可以并发请求,但是必须排队响应-队头阻塞)
- 新的缓存机制：Etag, If-None-Match, Cache-Control 等专用头部。

HTTP/1.1 有队头阻塞，是一个纯文本协议，它只在有效荷载（payload）的前面附加头（headers）。它不会进一步区分单个（大块）资源与其他资源。因为它需要完整地发送响应，并且不能多路复用它们.

### HTTP/2——为了更优异的表现

- 二进制协议
  允许客户端和服务器将 HTTP 消息分解为独立的帧，交错发送，然后在另一端重新组装这些帧。

- 多路复用协议
  并行的请求能在同一个链接中处理，移除了 HTTP/1.x 中顺序和阻塞的约束(但 TCP 层的队列头阻塞问题仍然存在)。

- 标头压缩
  因为标头在一系列请求中常常是相似的，其移除了重复和传输重复数据的成本。

- 服务器推送([chrome106 已移除](https://developer.chrome.com/blog/removing-push?hl=zh-cn))
  服务器能够针对单个客户端请求发送多个响应。也就是说，除了对原始请求的响应之外，服务器还可以向客户端推送其他资源，而无需客户端明确请求每项资源。

HTTP/2 通过引入“帧”（frames）标识每个资源块属于哪个“流”（stream）来解决这个问题
然而，TCP 不知道这些单独的“流”（streams），只是把所有的东西看作一个大流（1 big stream）
如果一个 TCP 包丢失，所有后续的包都需要等待它的重传，即使它们包含来自不同流的无关联数据。

TCP 队头阻塞是真实存在的，但是它对 Web 性能的影响要比 HTTP/1.1 队头阻塞小得多，HTTP/1.1 队头阻塞几乎可以保证每次都会遇到它，而且它也会受到 TCP 队头阻塞的影响！

### HTTP/3——基于 QUIC 的 HTTP

解决的问题

HTTP/2 通过单个 TCP 连接运行，所以在 TCP 层处理的数据包丢失检测和重传可以阻止所有流。QUIC 通过 UDP 运行多个流，并为每个流独立实现数据包丢失检测和重传，因此如果发生错误，只有该数据包中包含数据的流才会被阻止。

### 参考

- [HTTP 的发展](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP)
- [HTTP/2 简介](https://web.dev/articles/performance-http2?hl=zh-cn)
- [关于队头阻塞（Head-of-Line blocking），看这一篇就足够了](https://zhuanlan.zhihu.com/p/330300133)
