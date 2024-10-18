---
id: react-hook
title: hook学习
tags: [react-hook]
keywords: [react-hook]
description: react-hook学习
last_update:
  date: 10/18/2024
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

## [useMemo](https://zh-hans.react.dev/reference/react/useMemo)

在每次重新渲染的时候能够缓存计算的结果

```js
function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab])
}
```

当依赖项没有发生变化的时候，useMemo 会直接返回缓存的值，不会重新计算。

- 跳过需要时间的计算
  如上面的例子，当依赖项没有发生变化的时候，useMemo 会直接返回缓存的值，不会重新计算。
- 跳过组件的重新渲染

```js
export default function TodoList({ todos, tab, theme }) {
  // 告诉 React 在重新渲染之间缓存你的计算结果...
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab] // ...所以只要这些依赖项不变...
  )
  return (
    <div className={theme}>
      {/* ... List 也就会接受到相同的 props 并且会跳过重新渲染 */}
      <List items={visibleTodos} />
    </div>
  )
}
// 这里的 List 组件需要用memo包裹
```

如果不用 useMemo filterTodos 每次会返回一个新的数组，导致 List 组件重新渲染。

## [useCallback](https://zh-hans.react.dev/reference/react/useCallback)

在多次渲染中缓存函数

- 跳过组件的重新渲染

```js
function ProductPage({ productId, referrer, theme }) {
  // 在多次渲染中缓存函数
  const handleSubmit = useCallback(
    (orderDetails) => {
      post('/product/' + productId + '/buy', {
        referrer,
        orderDetails,
      })
    },
    [productId, referrer]
  ) // 只要这些依赖没有改变

  return (
    <div className={theme}>
      {/* ShippingForm 就会收到同样的 props 并且跳过重新渲染 */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  )
}
// ShippingForm 也需要用memo包裹
```

不使用 useCallback 的话，每次重新渲染都会重新创建一个函数，导致 ShippingForm 重新渲染。
