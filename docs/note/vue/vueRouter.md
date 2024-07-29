---
id: vueRouter
title: vue router
tags: [vue router]
keywords: [vue router]
description: vue router 几种模式
last_update:
  date: 7/30/2024
  author: ZhangJiaxiang
---

# [vue router 几种模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

Vue Router 通过 URL 路径来匹配显示哪些组件(监听 url 的改变进行内容映射)。具体介绍可以看[官网](https://router.vuejs.org/zh/guide/),这里记录下它几种模式的区别.

## Hash 模式

它在内部传递的实际 URL 之前使用了一个哈希字符(#).URL 的 hash 改变不会刷新网页,所以不需要在服务端额外处理.`hashchange`事件监听 hash 的改变.

## HTML5 模式

history 接口是 HTML5 新增的. `popstate`事件监听 url 的改变. 这种模式 URL 会看起来很 "正常"，例如 `https://example.com/user/id`,但是需要在服务端配置返回根目录下的 index.html.

## [Memory 模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html#Memory-%E6%A8%A1%E5%BC%8F)

这个模式很少用到,可以看官网介绍.
