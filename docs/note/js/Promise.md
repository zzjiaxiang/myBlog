---
id: Promise
title: Promise
tags: [Promise]
keywords: [Promise]
description: Promise
last_update:
  date: 6/12/2024
  author: ZhangJiaxiang
---

## Promise

Promise 对象表示异步操作最终的完成（或失败）以及其结果值。

一个 Promise 必然处于以下几种状态之一：

- 待定（pending）：初始状态，既没有被兑现，也没有被拒绝。
- 已兑现（fulfilled）：意味着操作成功完成。
- 已拒绝（rejected）：意味着操作失败。

### Promise 并发

Promise 类提供了四个静态方法来促进异步任务的并发：

#### Promise.all()

在所有传入的 Promise 都被兑现时兑现；在任意一个 Promise 被拒绝时拒绝。并带有第一个被拒绝的原因。

```ts
const customPromiseAll = (promises) => {
  const { promise, reject, resolve } = Promise.withResolvers()

  const results = []
  let count = 0
  // 检查传入的是否是一个数组
  if (!Array.isArray(promises)) {
    return reject(new TypeError('Argument must be an array'))
  }
  // 如果传入的是空数组，直接解析一个空数组
  if (promises.length === 0) {
    return resolve(results)
  }
  promises.forEach((promise, index) =>
    Promise.resolve(promise).then(
      (value) => {
        results[index] = value
        count++
        if (count === promises.length) {
          resolve(results)
        }
      },
      (reason) => {
        reject(reason)
      }
    )
  )

  return promise
}
```

这里是一个简单的实现，注意点

- 传入的数据要使用 Promise.resolve 包裹下.因为数据里面可能包括非 promise 的值
- 返回的 Promise 结果如果全部成功，则返回全部成功的结果，(结构也要按照传入的顺序)如果其中一个失败，则返回第一个失败的原因。

#### Promise.race()

返回一个 Promise，不管他是成功还是失败的.

```ts
const customRace = (promises) => {
  const { promise, reject, resolve } = Promise.withResolvers()

  promises.forEach((promise) => {
    Promise.resolve(promise).then(resolve, reject)
  })

  return promise
}
```

这里利用了 promise 状态改变不能再次发生改变的特性,实现 race 方法.

#### Promise.allSettled()

在所有的 Promise 都被敲定时兑现。不管是成功还是失败。返回一个对象数组.

```ts
const customAllSettled = (promises) => {
  const { promise, resolve } = Promise.withResolvers()
  const results = []
  let count = 0

  promises.forEach((promise, index) =>
    Promise.resolve(promise)
      .then(
        (value) => {
          results[index] = { status: 'fulfilled', value }
        },
        (reason) => {
          results[index] = { status: 'rejected', reason }
        }
      )
      .finally(() => {
        count++
        if (count === promises.length) {
          resolve(results)
        }
      })
  )

  return promise
}
```

手动简单实现了下,注意 allSettled 方法成功失败的结构都要.

#### Promise.any()

一旦有一个 Promise 兑现，它就会立即返回，因此不会等待其他 Promise 完成。当所有输入 Promise 都被拒绝（包括传递了空的可迭代对象）时，它会以一个包含拒绝原因数组的 AggregateError 拒绝。

```ts
const customAny = (promises) => {
  const { promise, reject, resole } = Promise.withResolvers()
  let count = 0
  const result = []
  promises.forEach((promise, index) => {
    promise.then(resole).catch((err) => {
      count++
      result[index] = err
      if (count === promises.length) {
        reject(result)
      }
    })
  })
  return promise
}
```

简单的模拟下,实际的 any 方法,全部 reject 的时候返回的是 AggregateError

#### Promise.withResolvers()

返回一个对象，其包含一个新的 Promise 对象和两个函数，用于解决或拒绝它，对应于传入给 Promise() 构造函数执行器的两个参数。

示例:

```ts
const { promise, resolve, reject } = Promise.withResolvers()

// 等同于以下代码:
let resolve, reject
const promise = new Promise((res, rej) => {
  resolve = res
  reject = rej
})
```

使用

```ts
const fn = (flag) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      flag ? resolve('ok') : reject('err')
    }, 2000)
  })
}
// 使用 withResolvers
const fn = (flag) => {
  const { promise, resolve, reject } = Promise.withResolvers()
  setTimeout(() => {
    flag ? resolve('ok') : reject('err')
  }, 2000)

  return promise
}
```

可以看到这个方法并没有减少代码量上的优化,但是减少了代码的层级,提高了代码的可读性。

```ts
const myWithResolvers = () => {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}
```

自己实现一个 withResolvers.

## async

async 避免了 promise 的链式调用.

async 函数总是返回一个 promise。

### async 地狱

```ts
(async () => {
  const getList = await getList()
  const getAnotherList = await getAnotherList()
})()
// 如果这两个函数没有依赖关系的话,这样写虽然代码简洁了,但是getAnotherList函数的执行推迟到了getList函数执行完成之后才执行.
// 可以使用Promise.all()来解决
(async () => {
  Promise.all([getList(), getAnotherList()]).then(...);
})();
```

### 继发与并发

#### 问题：给定一个 URL 数组，如何实现接口的继发和并发？

async 继发实现：

```ts
// 继发一
async function loadData() {
  const res1 = await fetch(url1)
  const res2 = await fetch(url2)
  return 'whew all done'
}
// 继发二
async function loadData(urls) {
  for (const url of urls) {
    const response = await fetch(url)
    console.log(await response.text())
  }
}
```

async 并发实现:

```ts
// 并发一(使用Promise.all)
async function loadData() {
  const res = await Promise.all([fetch(url1), fetch(url2), fetch(url3)])
  return 'whew all done'
}

// 并发二
async function loadData(urls) {
  // 并发读取 url
  const textPromises = urls.map(async (url) => {
    const response = await fetch(url)
    return response.text()
  })

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise)
  }
}
```

## 红绿灯问题

题目：红灯三秒亮一次，绿灯一秒亮一次，黄灯 2 秒亮一次；如何让三个灯不断交替重复亮灯？（用 Promse 实现）

三个亮灯函数已经存在：

```ts
const red = () => {
  console.log('red')
}
const green = () => {
  console.log('green')
}
const yellow = () => {
  console.log('yellow')
}
```

利用 then 和递归实现：

```ts
const light = (fn, time) =>
  new Promise((resolve) =>
    setTimeout(() => {
      fn()
      resolve()
    }, time)
  )

const run = () =>
  Promise.resolve()
    .then(() => light(red, 3000))
    .then(() => light(green, 2000))
    .then(() => light(yellow, 1000))
    .then(() => run())

run()
```

使用 async/await 简化代码：

```ts
const run = async () => {
  await light(red, 3000)
  await light(green, 2000)
  await light(yellow, 1000)
}
```

## 参考

[https://github.com/mqyqingfeng/Blog/issues/98](https://github.com/mqyqingfeng/Blog/issues/98)

[https://github.com/mqyqingfeng/Blog/issues/100](https://github.com/mqyqingfeng/Blog/issues/100)
