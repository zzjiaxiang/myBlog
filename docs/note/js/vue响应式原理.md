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

## vue 2

先做几道题来了解一下

### getter-setter

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

### dependency-tracking

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

调用 dep.depend()时,会将当前正在运行的 update 函数加入到 subscribers 中.所以 depend 方法就直接添加 activeUpdate(activeUpdate 全局变量方便外部访问,即添加订阅的时候用) 到 subscribers 中.

autorun 方法的实现就比较简单了,先保存下当前正在运行的 update 函数,然后调用 update 函数(update 函数内部调用了 dep.depend())

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

### mini-observer

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

autorun 函数里面的依赖项函数只输出当前的 count.注意这段代码会在控制台输出 0 和 1,第一次是原始值 0(调用 autorun 函数会运行一次它的回调函数),第二次是我们设置了 state.count++,触发了 setter,会调用 dep.notify(),触发了 autorun 函数里面的依赖项函数,输出 1.

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

这就是 vue 响应式的简化版,在初始化的时候执行一次 autorun 函数(vue 渲染函数会在这里面运行),那么所有被渲染所依赖的数据就会被 getter 收集到 Dep 的 subscribers 中去。在对数据进行修改的时候 setter 只会触发 Dep 的 subscribers 的函数。

activeUpdate 全局变量,用来记录当前正在运行的 update 函数.

## vue3

### base

假设有这么一个依赖关系,`total = price * quantity`, 当 price 和 quantity 变化时,我们希望 total 也会变化。

```ts
let price = 5
let quantity = 2
let total = price * quantity // total = 10

price = 20 // total = 10
```

首先我们需要一个函数(effect),保存这段运算关系代码(有可能还有很多功能),在依赖发生变化的时候重新调用,即可以算出新的 total 值.

track 函数用于保存 effect 代码.我们使用了 Set
来保存 effect. trigger 来运行保存在 dep 里面的所有 effect.

```ts
let dep = new Set()

const effect = () => (total = price * quantity)

const track = () => dep.add(effect)

const trigger = () => dep.forEach((effect) => effect())

track()
effect()
```

这样一来修改 price 和 quantity 的时候,调用 effect 方法就会重新计算 total 值.

### 02-depsMap

通常每个对象有很多属性,如何让每个属性都有自己的依赖呢?

```ts
let product = { price: 5, quantity: 2 }
let total = 0

const depsMap = new Map()

const effect = () => (total = product.price * product.quantity)

const track = (key) => {
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(effect)
}

const trigger = (key) => depsMap.get(key)?.forEach(effect)

track('quantity')
console.log(total) // 0
product.quantity = 3
effect()
console.log(total) //15
product.quantity = 4
trigger('quantity')
console.log(total) //20
```

我们使用 Map 来保存每个属性的依赖关系,key 是对象的属性名,value 是 Set,保存 effect 函数的合集.

### 03-targetMap

这里只假设了我们只有 product 这一个对象需要依赖如果有多个对象需要依赖的话,我们可以使用 targetMap 来保存每个对象对应的 depsMap.

```ts
const product = { price: 5, quantity: 2 }
let total = 0
const targetMap = new WeakMap()

const effect = () => (total = product.price * product.quantity)

const track = (target, key) => {
  let depsMap = targetMap.get(target)

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(effect)
}

const trigger = (target, key) =>
  targetMap.get(target)?.get(key)?.forEach(effect)

track(product, 'quantity')
effect()
console.log(total) // 10
product.quantity = 3
trigger(product, 'quantity')
console.log(total) //15
```

和 02-depsMap 的区别在于我们使用 WeakMap 来保存各个`响应式对象`的依赖关系,WeakMap 的 key 是对象本身,value 是每个对象属性的依赖关系.可以直接在 02-depsMap 的基础上面增加一个 target 参数.表示目标对象.
![](https://png.zjiaxiang.cn/blog/202406161959304.jpg)

### 04-all-together

至此,我们发现实现的效果,需要在对象属性变化的时候显式的调用 track,trigger 函数来跟踪和触发计算.联想到前面讲到的[数据代理](./defineProperty&Proxy.md),我们可以使用 Proxy 来实现.

```ts
const targetMap = new WeakMap()
const track = (target, key) => {
  let depsMap = targetMap.get(target)

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(effect)
}

const reactive = (target) =>
  new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (result && oldValue !== value) {
        trigger(target, key)
      }
      return result
    },
  })

const trigger = (target, key) =>
  targetMap.get(target)?.get(key)?.forEach(effect)

const product = reactive({ price: 5, quantity: 2 })
let total = 0
const effect = () => (total = product.price * product.quantity)

effect()

console.log(total) // 10
product.quantity = 3
console.log(total) //15
```

这里新增了 reactive 函数,用来代理对象,在 get 方法里面调用 track 函数,在 set 方法里面调用 trigger 函数.这样一来第一次调用 effect 函数,这个函数会对 product 属性进行访问这时候就会自动跟踪,修改数据的时候触发保存的 effect 函数.

### 05-activeEffect(优化)

对与 04 的代码,你会发现只要访问了 product 对象的属性,如:`console.log(product.price)`那么就会调用 track ,保存 effect 函数,即使这个属性没有在 effect 函数里面用到,我们不需要每次访问对象属性的时候就调用 track. 我们只关心发生变化属性的 effect.

所以做了下面两点改变:

- 新增了 activeEffect 变量,用来保存当前正在执行的 effect 函数,判断是否要 track.
- 新增 effect 函数,将传入的函数设置为 activeEffect,并且调用传入的函数(如果这个函数里面有代理对象的属性访问,那么就会调用 track).最后将 activeEffect 设置为 null.

这样一来对于没有在 effect 函数里面用到的属性访问,就不会调用 track.(在 effect 里面调用 track)
以下为代码示例:

```ts
const targetMap = new WeakMap()
let activeEffect = null

const track = (target, key) => {
  if (activeEffect) {
    let depsMap = targetMap.get(target)

    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }

    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect)
  }
}

const reactive = (target) =>
  new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (result && oldValue !== value) {
        trigger(target, key)
      }
      return result
    },
  })

const trigger = (target, key) =>
  targetMap.get(target)?.get(key)?.forEach(effect)

const effect = (eff) => {
  activeEffect = eff
  eff()
  activeEffect = null
}

const product = reactive({ price: 5, quantity: 2 })
let salePrice = 0
let total = 0

effect(() => {
  total = product.price * product.quantity
})
effect(() => {
  salePrice = product.price * 0.9
})

console.log(
  `Before updated quantity total (should be 10) = ${total} salePrice (should be 4.5) = ${salePrice}`
)
product.quantity = 3
console.log(
  `After updated quantity total (should be 15) = ${total} salePrice (should be 4.5) = ${salePrice}`
)
product.price = 10
console.log(
  `After updated price total (should be 30) = ${total} salePrice (should be 9) = ${salePrice}`
)
```

### Ref 实现原理

05 实现了 vue3 中的 reactive api,那么 Ref 怎么实现的呢?

我们可以直接使用 reactive 来返回一个 Ref

```ts
const ref = (value) => reactive({ value })
```

但是 vue 里面不是这样做的.

```ts
const ref = (raw) => {
  const r = {
    get value() {
      track(r, 'value')
      return raw
    },
    set value(newVal) {
      raw = newVal
      trigger(r, 'value')
    },
  }
  return r
}
```

它的核心是这样的,实际上更复杂.

![](https://png.zjiaxiang.cn/blog/202406170209111.jpg)
更新下测试用例,并将 ref 函数放进去

```ts
const targetMap = new WeakMap()
let activeEffect = null
const track = (target, key) => {
  if (activeEffect) {
    let depsMap = targetMap.get(target)

    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }

    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect)
  }
}

const reactive = (target) =>
  new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (result && oldValue !== value) {
        trigger(target, key)
      }
      return result
    },
  })

const trigger = (target, key) =>
  targetMap.get(target)?.get(key)?.forEach(effect)

const effect = (eff) => {
  activeEffect = eff
  eff()
  activeEffect = null
}
const ref = (raw) => {
  const r = {
    get value() {
      track(r, 'value')
      return raw
    },
    set value(newVal) {
      if (newVal !== raw) {
        raw = newVal
        trigger(r, 'value')
      }
    },
  }
  return r
}
const product = reactive({ price: 5, quantity: 2 })
let salePrice = ref(0)
let total = 0

effect(() => {
  salePrice.value = product.price * 0.9
})

effect(() => {
  total = salePrice.value * product.quantity
})

console.log(
  `Before updated quantity total (should be 9) = ${total} salePrice (should be 4.5) = ${salePrice.value}`
)
product.quantity = 3
console.log(
  `After updated quantity total (should be 13.5) = ${total} salePrice (should be 4.5) = ${salePrice.value}`
)
product.price = 10
console.log(
  `After updated price total (should be 27) = ${total} salePrice (should be 9) = ${salePrice.value}`
)
```

可以看到 salePrice 也是响应式发生变化.

### computed 实现原理

一般我们这么使用 computed:

```ts
const salePrice = computed(() => product.price * 0.9)
```

- 创建一个响应式的引用
- 在 effect 里面调用 get,和 set,获取和设置它的响应值.
- 返回一个 ref

基于上面我们可以这么写

```ts
const computed = (getter) => {
  const result = ref()
  effect(() => (result.value = getter()))
  return result
}
```

### vue3 源码文件

![](https://png.zjiaxiang.cn/blog/202406170244822.jpg)

## 参考

[https://github.com/d-levin/vue-advanced-workshop](https://github.com/d-levin/vue-advanced-workshop)
[https://github.com/Code-Pop/vue-3-reactivity](https://github.com/Code-Pop/vue-3-reactivity)
[https://github.com/answershuto/learnVue/blob/master/docs/%E4%BE%9D%E8%B5%96%E6%94%B6%E9%9B%86.MarkDown](https://github.com/answershuto/learnVue/blob/master/docs/%E4%BE%9D%E8%B5%96%E6%94%B6%E9%9B%86.MarkDown)
