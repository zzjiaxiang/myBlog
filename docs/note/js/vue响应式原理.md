---
id: vueReactivity
title: vue响应式原理
tags: [vue响应式原理]
keywords: [vue响应式原理]
description: vue响应式原理
last_update:
  date: 6/15/2024
  author: ZhangJiaxiang
---

先做几道题来了解一下

## getter-setter

Implement a `convert` function that:

- takes an Object as the argument

- converts the Object's properties in-place into getter/setters using
  [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

- The converted object should retain original behavior, but at the same time
  log all the get/set operations.

expected usage:

```js
const obj = { foo: 123 }
convert(obj)

obj.foo // should log: 'getting key "foo": 123'
obj.foo = 234 // should log: 'setting key "foo" to: 234'
obj.foo // should log: 'getting key "foo": 234'
```

前面有篇文章讲过 defineProperty 对数据的拦截,可以[点击这里查看](./defineProperty&Proxy.md),这里就直接贴出答案.

```ts
function convert(obj) {
  if (!isObject(obj)) {
    throw new TypeError()
  }

  Object.keys(obj).forEach((key) => {
    let internalValue = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        console.log(`getting key "${key}": ${internalValue}`)
        return internalValue
      },
      set(newValue) {
        console.log(`setting key "${key}" to: ${newValue}`)
        internalValue = newValue
      },
    })
  })
}
```

## dependency-tracking

开始前先做这样一道题:

- Create a `Dep` class with two methods: `depend` and `notify`.
- Create an `autorun` function that takes an updater function.
- Inside the updater function, you can explicitly depend on an instance of `Dep` by calling `dep.depend()`
- Later, you can trigger the updater function to run again by calling `dep.notify()`.

The full usage should look like this:

```js
const dep = new Dep()

autorun(() => {
  dep.depend()
  console.log('updated')
})
// should log: "updated"

dep.notify()
// should log: "updated"
```

下面我们来实现下这个 Dep 类,和 autorun 函数.

Dep 类包含两个方法: depend 和 notify.此外还要有一个属性: subscribers.来收集注册的方法,这里直接用 Set.

notify 方法容易写出,调用后就会触发所有注册的方法.

因为通过`dep.depend()` 来显示的声明依赖,所以需要一个全局变量来记录当前正在运行的 update 函数.

调用 dep.depend()时,会将当前正在运行的 update 函数加入到 subscribers 中.所以 depend 方法就直接添加 activeUpdate 到 subscribers 中.

autorun 方法的实现就比较简单了,先保存下当前正在运行的 update 函数,然后调用 update 函数(update 函数内部调用了 dep.depend()),最后将 activeUpdate 设置为 null(方便解除引用垃圾回收).

```ts
class Dep {
  constructor() {
    this.subscribers = new Set()
  }

  depend() {
    if (activeUpdate) {
      // register the current active update as a subscriber
      this.subscribers.add(activeUpdate)
    }
  }

  notify() {
    // run all subscriber functions
    this.subscribers.forEach((subscriber) => subscriber())
  }
}
let activeUpdate

function autorun(update) {
  activeUpdate = update
  update()
  activeUpdate = null
}
```

## mini-observer

Combine the previous two functions, renaming `convert()` to `observe()` and keeping `autorun()`:

- `observe()` converts the properties in the received object and make them
  reactive. For each converted property, it gets assigned a `Dep` instance which keeps track of a list of subscribing update functions, and triggers them to re-run when its setter is invoked.

- `autorun()` takes an update function and re-runs it when properties that the
  update function subscribes to have been mutated. An update function is said
  to be "subscribing" to a property if it relies on that property during its
  evaluation.

They should support the following usage:

```js
const state = {
  count: 0,
}

observe(state)

autorun(() => {
  console.log(state.count)
})
// should immediately log "count is: 0"

state.count++
// should log "count is: 1"
```

结合前两个问题,并且复用前面的代码.

获取对象属性时会调用 getter,所以 `dep.depend()`在 getter 方法里面调用.设置属性时会调用 setter,所以 `dep.notify()`在 setter 方法里面调用.

autorun函数里面的依赖项函数只输出当前的count.注意这段代码会在控制台输出0和1,第一次是原始值0(调用autorun函数会运行一次它的回调函数),第二次是我们设置了state.count++,触发了setter,会调用dep.notify(),触发了autorun函数里面的依赖项函数,输出1.
```ts
const state = {
  count: 0,
}
class Dep {
  constructor() {
    this.subscribers = new Set()
  }

  depend() {
    if (activeUpdate) {
      // register the current active update as a subscriber
      this.subscribers.add(activeUpdate)
    }
  }

  notify() {
    // run all subscriber functions
    this.subscribers.forEach((subscriber) => subscriber())
  }
}
let activeUpdate

function autorun(update) {
  activeUpdate = update
  update()
  activeUpdate = null
}
const observe = (obj) =>
  Object.keys(obj).forEach((key) => {
    const dep = new Dep()
    let val = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        dep.depend()
        return val
      },
      set(newVal) {
        const isChanged = val !== newVal
        if (isChanged) {
          val = newVal
          dep.notify()
        }
      },
    })
  })

observe(state)

autorun(() => {
  console.log(state.count)
})
// should immediately log "count is: 0"

state.count++
// should log "count is: 1"
```

## 参考

[https://github.com/d-levin/vue-advanced-workshop](https://github.com/d-levin/vue-advanced-workshop)
