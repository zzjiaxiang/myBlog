---
id: react-hook
title: hook学习
tags: [react-hook]
keywords: [react-hook]
description: react-hook学习
last_update:
  date: 15/10/2024
  author: ZhangJiaxiang
---

## [useState](https://zh-hans.react.dev/reference/react/useState)

为组件添加一个状态变量,是前端应用的核心。setState 可以触发页面的重新渲染.

几点[注意事项](https://zh-hans.react.dev/reference/react/useState#setstate-caveats):

- set 函数仅更新下一次渲染的状态变量。如果在调用 set 函数后读取状态变量，则仍会得到在调用之前显示在屏幕上的旧值。

- 如果你提供的新值与当前 state 相同（由 Object.is 比较确定），React 将跳过重新渲染该组件及其子组件。这是一种优化。

因为通过 Object.is 比较所以对于对象的修改每次必须返回一个新的对象.

这就是所说的 React 推崇的是数据不可变.

- React 会对 state 更新进行批处理(加入队列)

## [useEffect](https://zh-hans.react.dev/reference/react/useEffect)

副作用

在组件从 DOM 中移除后，React 将最后一次运行 cleanup 函数。

依赖数组:

- 如果指定了依赖项，则 Effect 在 初始渲染后以及依赖项变更的重新渲染后 运行。
- 如果依赖数组为空，则只会在第一次渲染后执行。
- 完全不传递依赖数组，则 Effect 会在组件的 每次单独渲染（和重新渲染）之后 运行。
