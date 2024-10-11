---
id: react-render
title: render
tags: [react-render]
keywords: [react-render, render]
description: react-render
last_update:
  date: 11/10/2024
  author: ZhangJiaxiang
---

## React 渲染流程

React 编译后会将 jsx 语法转换成 render function 也就是 React.createElement 等

```js
<div>
  <App1 />
  <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
</div>
```

转换成下面的:

```js
return /*#__PURE__*/ React.createElement(
  'div',
  null,
  /*#__PURE__*/ React.createElement(App1, null),
  /*#__PURE__*/ React.createElement(
    'div',
    {
      onClick: () => setNum((prevNum) => prevNum + 1),
    },
    num
  )
)
```

render function 执行后会产生 vdom,vdom 换转化成 fiber 结构.

Fiber 可以理解为是一个执行单元，也可以理解为是一种数据结构。每一个 React 元素都对应一个 fiber 对象.

fiber 通过 child、sibling、return 关联了父节点、子节点、兄弟节点.
![](https://png.zjiaxiang.cn/blog/202410112223263.png)

### Fiber 执行原理

从根节点开始调度和渲染可以分为两个阶段 render 和 commit.

#### render 阶段

从 vdom 转 fiber 的过程叫做 reconcile，这个过程还会找到所有节点的变更，比如说节点新增，编辑，删除等等。这个 reconcile 的过程叫做 render 阶段,也可以认为是 diff 阶段。在这个阶段，任务是可以终止的。
遍历 Fiber tree 时采用的是后序遍历方法(左右根).

#### commit 阶段

与 render 阶段不同，commit 阶段是同步操作的,会根据标记来增删改 dom。

commit 阶段也分为了 3 个小阶段，before mutation、mutation、layout。

mutation 阶段会增删改 dom，before mutation 是在 dom 操作之前，layout 是在 dom 操作之后。

## 参考

- [fiber 原理解析](https://juejin.cn/post/7161704351847677983?searchId=20241009002820C26C0517FA0B5597D7BB)
