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

## [IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)

Intersection Observer API 提供了一种异步检测目标元素与祖先元素或 [viewport(视口)](https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport) 相交情况变化的方法。    
简单示例

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
2. 目标 (target) 元素与设备视窗或者其他指定元素发生交集的时候,或者目标元素与指定元素的交集大小超过阈值 (threshold) 规定的大小时候被执行.   

这里解释一下上面两点
1. 第一次代码运行注册了监听,这时目标元素与指定元素不管有没有相交部分都会运行一次回调函数,区别在于回调函数的参数不同.
2. 当目标元素进入或离开指定元素的时候执行,(没有指定options里面的root时这里的指定元素就是浏览器视口)或者他两相交的值(threshold)发生变化时执行.这里的**threshold**为**options**里面的参数,下面会介绍到.

### options
[options](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API#rootmargin) 对象有以下几个参数
#### root
指定根 (root) 元素，用于检查目标的可见性。必须是目标元素的父级元素。如果未指定或者为null，则默认为浏览器视窗。

#### rootMargin
根 (root) 元素的外边距。

#### threshold
可以是单一的 number 也可以是 number 数组，target 元素和 root 元素相交程度达到该值的时候 IntersectionObserver 注册的回调函数将会被执行。

### 交集的计算
我们将容器(根)元素又称为 intersection root，或 root element。这个既可以是 target 元素祖先元素也可以是指定 null 则使用浏览器视口做为容器 (root)。[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API#%E4%BA%A4%E9%9B%86%E7%9A%84%E8%AE%A1%E7%AE%97)里面有这么一个词**root intersection rectangle**是用来对目标元素进行相交检测的矩形,它的大小有以下几种情况
- 如果 intersection root 隐含 root (值为null) (也就是顶级 Document), 那么 root intersection 矩形就是视窗的矩形大小。
- 如果 intersection root 有溢出部分，则 root intersection 矩形是 root 元素的内容 (content) 区域。
- 否则，root intersection 矩形就是 intersection root 的 bounding client rectangle (可以调用元素的 [getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect) 方法获取).

简单解释一下上面几点
- **root intersection rectangle**是对目标进行相交检测的矩形,当目标元素与**root intersection rectangle**交集发生变化的时候,就会触发回调函数.
- 没有指定根元素的时候**root intersection rectangle**就是浏览器视口.
- 根元素有溢出部分的时候**root intersection rectangle**是根元素的内容区域.
- 有根元素且根元素没有溢出,这里我试了一下**root intersection rectangle**就是根元素.

:::tip

简单来说当没有指定根元素时,target元素进入了视口回调函数出发.  
指定了根元素 
1. 没有溢出时target进入根元素,回调函数触发(根元素为target的祖先元素,且没有发生溢出说明target元素相对于根元素完全可见,第一次回调函数运行的回调参数isIntersecting为true也可以说明).
2. 有溢出时,target进入根元素的内容部分(盒模型的content部分,也可以理解为可见的滚动区域?),回调函数触发.

:::

## [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
MutationObserver 接口提供了监视对 DOM 树所做更改的能力。(包括节点属性的变化,节点中发生节新增与删除)
简单示例

```javascript
// 观察器的配置（需要观察什么变动）
const config = {
  childList: true, 
  subtree: true, 
}

// 当观察到变动时执行的回调函数
const callback = (mutations, observer) => {
  console.log({ mutations, observer })
}

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback)

const target = document.getElementById('scrollArea')
// 以上述配置开始观察目标节点
observer.observe(targetNode, config);
```
### [observe](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe)
observe方法接受两个参数,第一个为观察节点,第二个为配置选项.配置选项有以下几个参数,配置项描述了 DOM 的哪些变化应该报告给 MutationObserver 的 callback。
参数的具体作用点击标题可以查看具体文档
- childList
- attributes
- characterData
- subtree
- attributeOldValue
- characterDataOldValue

### [callback](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/MutationObserver#callback)
创建观察器时传入的回调函数每当被指定的节点或子树以及配置项有 DOM 变动时会被调用。
有两个参数
- 所有被触发改动的[MutationRecord]对象数组(https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord)这个参数很重要,经常来利用它里面的参数来判断对某个元素的属性或着dom是否发生变化.
- 调用该函数的 MutationObserver 对象.

:::tip
在前端开发水印时,利用这个API特性对生成的水印元素进行监听,以便在水印元素被删除时能够重新渲染水印.
:::

## [ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/Resize_Observer_API)

Resize Observer API 可以监视元素的大小更改，并且每次大小更改时都会向回调函数传递最新监听元素的大小信息。


简单示例
```javascript
const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    console.log(entry.contentRect);
  }
});

resizeObserver.observe(document.querySelector('.box'));
```
用法和上面两个API基本一样具体的参数可以[查看文档](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver),值得一提的是 ResizeObserver 避免了通过在回调函数内部去调整元素大小带来的无限循环.

## [PerformanceObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver)

PerformanceObserver 可以获取到与当前页面中性能相关的信息.
