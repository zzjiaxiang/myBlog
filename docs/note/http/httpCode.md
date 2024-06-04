---
id: httpStatus
title: http状态码
tags: [http状态码, httpStatus]
keywords: [http状态码, httpStatus]
description: http状态码
last_update:
  date: 6/4/2024
  author: ZhangJiaxiang
---

## 状态码分类

#### 这里只列举下常用的状态码,详细可考[点击](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

### 1xx（信息响应）：表示服务器收到请求，需要请求者继续执行操作。
### 2xx（成功）：表示请求成功，请求被成功接收并处理。

  - 200 ok
    请求成功。成功的含义取决于 HTTP 方法：

    - GET: 资源已被提取并在消息正文中传输。
    - HEAD: 实体标头位于消息正文中。
    - PUT or POST: 描述动作结果的资源在消息体中传输。
    - TRACE: 消息正文包含服务器收到的请求消息。

  - 201 Created
    该请求已成功，并因此创建了一个新的资源。这通常是在 POST 请求，或是某些 PUT 请求之后返回的响应。

### 3xx（重定向）：表示重定向，需要进一步的操作以完成请求。
  - 301 Moved Permanently (永久重定向)
    请求资源的 URL 已永久更改。在响应中给出了新的 URL。
  - 302 Found (临时重定向)
  - 304 Not Modified
    用于协商缓存,告诉客户端响应还没有被修改，因此客户端可以继续使用相同的缓存版本的响应。
  - 307 Temporary Redirect (临时重定向)
    这与 302 Found HTTP 响应代码具有相同的语义，但用户代理(浏览器)不能更改所使用的 HTTP 方法：如果在第一个请求中使用了 POST，则在第二个请求中必须使用 POST.
  - 308 Permanent Redirect (永久重定向)
    这与 301 Moved Permanently HTTP 响应代码具有相同的语义，但用户代理不能更改所使用的 HTTP 方法：如果在第一个请求中使用 POST，则必须在第二个请求中使用 POST。
### 4xx（客户端错误）：表示客户端错误，请求包含语法错误或无法完成请求。
  - 400 Bad Request
    由于被认为是客户端错误（例如，错误的请求语法、无效的请求消息帧或欺骗性的请求路由），服务器无法或不会处理请求。
  - 401 Unauthorized
    客户端必须对自身进行身份验证才能获得请求的响应。
  - 403 Forbidden
    客户端没有访问内容的权限；也就是说，它是未经授权的，因此服务器拒绝提供请求的资源。与 401 Unauthorized 不同，服务器知道客户端的身份。
  - 404 Not Found
    服务器找不到请求的资源。在浏览器中，这意味着无法识别 URL。在 API 中，这也可能意味着端点有效，但资源本身不存在。
### 5xx（服务器错误）：表示服务器错误，服务器在处理请求的过程中发生了错误。

### [参考](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
