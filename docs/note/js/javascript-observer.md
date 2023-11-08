---
id: javascript-observer
title: javascript Observer API
tags:
  [ResizeObserver, IntersectionObserver, MutationObserver, PerformanceObserver]
keywords:
  [ResizeObserver, IntersectionObserver, MutationObserver, PerformanceObserver]
description: javascript Observer API
last_update:
  date: 11/6/2023
  author: ZhangJiaxiang
---

## [IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)

Intersection Observer API 提供了一种异步检测目标元素与祖先元素或 [viewport(视口)](https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport) 相交情况变化的方法。
简单使用

```javascript
const options = {
  root: document.querySelector('#main'), // default root(浏览器视窗)
  rootMargin: '0px', // default 0
  threshold: 1.0, // default 0
}
const callback = (entries, observer) => {
  console.log({ entries, observer })
}
const observer = new IntersectionObserver(callback, options)
const target = document.getElementById('scrollArea')
observer.observe(target)
```
可以看到**IntersectionObserver**接受两个参数,第一个为回调函数,第二个为配置选项.   

回调函数运行时机
1. Observer 第一次监听目标元素的时候
2. 目标 (target) 元素与设备视窗或者其他指定元素发生交集的时候,或者目标元素与指定元素的相交部分大小发生变化时执行。   

这里解释一下上面两点
- 第一次代码运行注册了监听,这时目标元素与指定元素不管有没有相交部分都会运行一次回调函数,区别在于回调函数的参数不同.
- 当目标元素进入或离开指定元素的时候执行,或者他两相交的值(threshold)发生变化时执行,这里的**threshold**为**options**里面的参数,下面会介绍到.
## [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

## [ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)

## [PerformanceObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver)
