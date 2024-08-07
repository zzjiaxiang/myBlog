---
id: ES6add
title: ES6+ 代码如何在低版本上运行?
tags: [学习 ES2015, ES6, Babel兼容]
keywords: [学习 ES2015, ES6, Babel兼容]
description: 学习 ES2015,ES6,Babel兼容
last_update:
  date: 8/8/2024
  author: ZhangJiaxiang
---

## [介绍](https://babeljs.io/docs/learn)

ECMAScript 2015 是 2015 年 6 月被采纳的 ECMAScript 标准。具体包含的语法可以在[babeljs 这里查看](https://babeljs.io/docs/learn).现在我们称 ES6 基本上包括了 2015 年以后的所有特性。

ES 语法截止现在最新的版本为 ES2025。但是有些较旧的浏览器不支持这些新特性,所以需要使用 [Babel](https://babeljs.io/) 来转换这些含有新特性的代码到我们的目标浏览器,具体使用方法可以参考[这里](https://babeljs.io/setup)。

简单来说[babel](https://babeljs.io/docs/babel-preset-env#browserslist-integration) 从指定的任何目标环境中提取信息(建议使用[.browserslistrc](https://github.com/browserslist/browserslist)文件来指定目标),以确定应该转换哪些新特性使代码在这些环境中运行.通过[core-js](https://github.com/zloirock/core-js)来 polyfill 新的特性(babel 转换不了一些新的 api 如 Set,Map 等,所以需要 core-js 来打补丁.但是不是所有的 api 都能被 polyfill 的,比如 Proxy,这也就是 vue3 不支持 ie 的原因)。

关于 [browserslist](https://github.com/browserslist/browserslist),可以在[这里查看](https://www.typescriptlang.org/zh/play/)它的运行.如果你的项目里正确的设置了配置文件也可以在终端运行`npx browserslist`来查看项目的目标浏览器.

## 示例

可以通过[typescriptlang](https://www.typescriptlang.org/zh/play/)里面的在线编译器来查看 ES6 语法的转换效果.选择配置-编译目标.选择一个较低的编译目标,比如`ES2015`.在左边代码区输入高版本的语法,右侧就可以看到转换后的效果了.

也可以通过[babeljs repl](https://babeljs.io/repl)达到类似的效果,只不过这里的 target 选项是[browserslist](https://github.com/browserslist/browserslist?tab=readme-ov-file#full-list)里面的语法.

## 参考

- [browserslist github](https://github.com/browserslist/browserslist)
- [browsersl playground](https://browsersl.ist/)
- [typescriptlang](https://www.typescriptlang.org/zh/play/)
- [babeljs repl](https://babeljs.io/repl)
