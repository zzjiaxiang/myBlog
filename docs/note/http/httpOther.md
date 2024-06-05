---
id: httpOther
title: http压缩
tags: [http压缩]
keywords: [http压缩]
description: http压缩
last_update:
  date: 6/5/2024
  author: ZhangJiaxiang
---
## 压缩算法
现代浏览器都普遍支持gzip, deflate, br这三类压缩算法.

浏览器发送HTTP请求时，会根据本地支持的压缩算法类型，自动生成请求头`Accept-Encoding: gzip, deflate, br`来告知服务器浏览器支持的压缩算法。`gzip, deflate, br`表示浏览器支持这三种压缩算法.而服务器会通过响应头`Content-Encoding: gzip`来标注响应使用的是哪一种算法，gzip即表明服务器响应的静态资源经过了gzip压缩算法处理。浏览器可以在接收文件时自行解压缩文件.

Brotli 与大多数现代浏览器兼容,提供比 gzip 更好的压缩率，压缩速率也与 deflate 相当。但 brotli 压缩速度比 gzip 慢.
![请求头](https://png.zjiaxiang.cn/blog/202406051522811.jpg)
![响应头](https://png.zjiaxiang.cn/blog/202406051529391.jpg)



[参考](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Compression)
