---
id: vueReactivity
title: vue响应式原理
tags: [vue响应式原理]
keywords: [vue响应式原理]
description: vue响应式原理
last_update:
  date: 6/18/2024
  author: ZhangJiaxiang
---

## vue 2

先通过这几道题了解一下

### 01-getter-setter

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

这道题是在对对象的读取进行拦截.

前面有篇文章讲过 defineProperty 对数据的拦截,可以[点击这里查看](../js/defineProperty&Proxy.md),这里就直接贴出答案.

```js
const convert = (obj) =>
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

const obj = { foo: 123 }
convert(obj)

obj.foo // should log: 'getting key "foo": 123'
obj.foo = 234 // should log: 'setting key "foo" to: 234'
obj.foo // should log: 'getting key "foo": 234'
```

### 02-dependency-tracking

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

```js
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

const autorun = (update) => {
  activeUpdate = update
  update()
  activeUpdate = null
}
```

### 03-mini-observer

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
将 convert 方法改名为 autorun

获取对象属性时会调用 getter,所以 `dep.depend()`在 getter 方法里面调用.设置属性时会调用 setter,所以 `dep.notify()`在 setter 方法里面调用.

autorun 函数里面的依赖项函数只输出当前的 count.注意这段代码会在控制台输出 0 和 1,第一次是原始值 0(调用 autorun 函数会运行一次它的回调函数)访问了代理对象的属性.这里相当于收集依赖,第二次是我们设置了 state.count++,触发了 setter,会调用 dep.notify(),触发了 autorun 函数里面的依赖项函数,输出 1.

完整代码如下:

```js
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

const autorun = (update) => {
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

这就是 vue2 响应式的简化版,在初始化的时候执行一次 autorun 函数(vue 渲染函数会在这里面运行),那么所有被渲染所依赖的数据就会被 getter 收集到 Dep 的 subscribers 中去。在对数据进行修改的时候 setter 只会触发 Dep 的 subscribers 的函数。

activeUpdate 全局变量,用来记录当前正在运行的 update 函数.

## vue3

上面简单的实现了 vue2 里面的响应式,接下来继续通过几道题来实现 vue3 的响应式.

### 01-base

假设有这么一个依赖关系,`total = price * quantity`, 当 price 和 quantity 变化时,我们希望 total 也会变化。

```js
let price = 5
let quantity = 2
let total = price * quantity // total = 10

price = 20

// total = 10,希望变成40
```

首先可以想到在 price 发生变化之后我们再执行一遍`total = price * quantity` ,那 total 就可以发生变化了.所以我们用一个函数(effect),保存这段运算关系代码.

```js
// 例如:还有这么一个关系,新价格是原价格的0.8.
let newPrice = price * 0.8
// 用effect函数来声明这段依赖关系.
const effect = () => (total = price * quantity)
const effect = () => (newPrice = price * 0.8)
```

在依赖发生变化的时候重新调用,即可以算出新的值(如 total).

- 新建一个全局变量 dep 它是[Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)类型用来保存 effect(因为有可能有许多依赖的函数要运行).
- track 函数用于将这些 effect 保存到 dep 里面.
- trigger 来运行保存在 dep 里面的所有 effect.

```js
let dep = new Set()

const effect = () => (total = price * quantity)

const track = () => dep.add(effect)

const trigger = () => dep.forEach((effect) => effect())

track()
trigger()
```

首先我们先 track 跟踪 这些依赖将他们都加在 dep 里面,然后在数据修改后调用 trigger 函数,这样保存的 effect 就会运行了.

### 02-depsMap

通常每个对象有很多属性,如何让每个属性都有自己的依赖呢?

我们使用 Map 来保存每个属性的依赖关系,key 是对象的属性名,value 是保存 effect 函数的集合.

```js
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

### 03-targetMap

这里只假设了我们只有 product 这一个对象需要依赖,那么如果有多个对象需要依赖的话怎么办呢?

我们可以使用 targetMap([WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) 类型) 来保存每个对象对应的 depsMap(对象属性及其依赖关系),

```js
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

effect()
track(product, 'quantity')
console.log(total) // 10
product.quantity = 3
trigger(product, 'quantity')
console.log(total) //15
```

和上面 02-depsMap 的区别在于我们使用 WeakMap 来保存各个`响应式对象`的依赖关系,WeakMap 的 key 是对象本身,value 是每个对象属性的依赖关系.可以直接在 02-depsMap 的基础上面增加一个 target 参数.表示目标对象.
![](https://png.zjiaxiang.cn/blog/202406161959304.jpg)

### 04-all-together

至此,我们发现实现的效果,需要调用 track 跟踪收集 effect,在对象属性变化的时候调用 trigger 来触发计算.联想到前面讲到的[数据代理](../js/defineProperty&Proxy.md),我们可以使用 Proxy 来实现.

```js
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

const product = reactive({ price: 5, quantity: 2, name: 'apple' })
let total = 0
const effect = () => (total = product.price * product.quantity)

effect()
console.log(total) // 10
product.quantity = 3
console.log(total) //15
```

这里新增了 reactive 函数,用来代理对象,在 get 方法里面调用 track 函数,在 set 方法里面调用 trigger 函数.这样一来第一次调用 effect 函数,这个函数会对 product 属性进行访问这时候就会自动跟踪,修改数据的时候会触发保存的 effect 函数.

### 05-activeEffect(优化)

对与 04 的代码,你会发现只要访问了 product 对象的属性,如:`console.log(product.name)`那么就会调用 track ,保存 effect 函数,即使这个属性没有在 effect 函数里面作为依赖项,我们不需要每次访问对象属性的时候就调用 track. 我们只关心发生变化属性的 effect.

所以做了下面三点改变:

- 新增了 activeEffect 变量,用来保存当前正在执行的 effect 函数.
- 修改 effect 函数,将依赖关系作为它的参数传入.
- track 根据 activeEffect 来判断是否要将 effect 保存

effect 函数做了下面三件事:

1.  将传入的函数设置为 activeEffect.
2.  调用传入的函数(如果这个函数里面有代理对象的属性访问,那么就会调用 track 进行依赖追踪,保存 effect ).
3.  将 activeEffect 设置为 null(表示此次 track 已经结束,现在没有要进行依赖追踪的 effect 函数了).

```js
const effect = (eff) => {
  activeEffect = eff
  eff()
  activeEffect = null
}
effect(() => {
  total = product.price * product.quantity
})
```

这样一来对于没有在 effect 函数里面属性访问,就不会调用 track 了.(在 effect 里面调用 track),举个例子:

```js
effect(() => {
  total = product.price * product.quantity
})
console.log(product.name)
```

effect 函数在运行这一段时`total = product.price * product.quantity`,因为有了属性访问会进行 track,而程序运行到`console.log(product.name)`的时候,因为上一个 effect 函数已经运行完成 activeEffect 已经为 null,所以就不会在进行 track 了.

完整代码示例:

```js
const targetMap = new WeakMap() // WeakMap<target, Map<key, Set<effect>>>
let activeEffect = null // 正在运行的 effect
const track = (target, key) => {
  if (activeEffect) {
    // 检查当前是否有运行中的effect,确保这种依赖是否要跟踪
    let depsMap = targetMap.get(target)
    //获取当前 depsMap,没有的话就创建它,注意它的value是一个Map
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }

    let dep = depsMap.get(key)
    //获取当前依赖项 effects,没有的话就创建它,注意它是一个Set
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    // 最后将依赖关系添加到依赖项集合中
    dep.add(activeEffect)
  }
}

const reactive = (target) =>
  new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      // 在访问属性时,跟踪
      track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (result && oldValue !== value) {
        // 如果属性值改变,触发依赖
        trigger(target, key)
      }
      return result
    },
  })

// 触发依赖 这个函数就比较简单了,获取目标对象target,根据key找到effects(Set),运行所有的effect.
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

```js
const ref = (value) => reactive({ value })
```

但是 vue 是这样做的.

```js
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
```

它的核心是这样的,实际上更复杂.

![](https://png.zjiaxiang.cn/blog/202406170209111.jpg)

```js
export const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? reactive(value) : value

```

可以看到 set value 时会判断下是否为对象,是对象的话就调用 reactive 方法.

### computed 实现原理

一般我们这么使用 computed:

```js
const salePrice = computed(() => product.price * 0.9)
```

它接受一个 [getter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get#description) 函数 , 返回了一个 ref,

基于上面特点我们可以这么写:

- 创建一个响应式的引用.
- 在 effect 里面调用 getter 并将值赋值到 result.
- 返回一个 ref.

```js
const computed = (getter) => {
  const result = ref()
  effect(() => (result.value = getter()))
  return result
}
```

注意这里的 effect 函数.effect 函数是接受一个响应式的依赖,computed 的 getter 参数正是这个依赖关系的右边,所以可以直接调用它,将结果赋值给 result.value.

```js
// 这样调用
const salePrice = computed(() => product.price * 0.9)
// computed内部,effect函数
effect(() => (result.value = getter()))
// 相当于
effect(() => {
  result.value = product.price * 0.9
})
```

这里的实现只实现了只读的计算属性.

### 测试 ref 和 computed

上面实现了 ref 和 computed.
现在我们更新下测试用例:

```js
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
const computed = (getter) => {
  const result = ref()
  effect(() => (result.value = getter()))
  return result
}
const product = reactive({ price: 5, quantity: 2 })
let salePrice = ref(0)
effect(() => {
  salePrice.value = product.price * 0.9
})
const total = computed(() => product.price * product.quantity)

console.log(
  `Before updated quantity total (should be 10) = ${total.value} salePrice (should be 4.5) = ${salePrice.value}`
)
product.quantity = 3
console.log(
  `After updated quantity total (should be 15) = ${total.value} salePrice (should be 4.5) = ${salePrice.value}`
)
product.price = 10
console.log(
  `After updated price total (should be 30) = ${total.value} salePrice (should be 9) = ${salePrice.value}`
)
```

salePrice 也可以直接使用 computed,但是这里为了测试 ref,就直接用 ref 来定义了,effect 声明依赖关系.

### vue3 源码文件

![](https://png.zjiaxiang.cn/blog/202406170244822.jpg)

## 对比 vue2 和 vue3

至此,我们观察实现 **03-mini-observer** 和 **05-activeEffect(优化)**,发现响应式的实现很类似.数据的劫持一个是用的 Proxy,一个是用 Object.defineProperty.

由于 Vue2 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的.

```js
var vm = new Vue({
  data: {
    a: 1,
  },
})

// `vm.a` 是响应式的

vm.b = 2
// `vm.b` 是非响应式的
Vue.set(vm.someObject, 'b', 2)
// vue提供了set Api来实现这种操作,但是这样看起来不优雅
```

使用 Proxy,就不用担心上面的问题.

另外 vue2 里面用 Dep 类将 notify 和 depend 函数以及 subscribers 封装起来了, 而 vue3 里面单独将 notify(trigger) 和 depend(tarck) 拆开来.

## 总结

![vue响应式](https://png.zjiaxiang.cn/blog/202407091740558.jpg)
vue 使用的是[sfc](https://cn.vuejs.org/guide/scaling-up/sfc.html#introduction),在运行时 sfc 会被编译为 render 函数(render 会生成页面上真实的元素).render 函数会在 effect 中执行,在执行 render 函数的过程中会访问到响应式的变量,如:`state.count`,因为它是一个代理对象所以会触发 getter ,在这里收集到 count 的依赖关系(保存当前的 effect),当我们修改响应式变量的时候,如:`state.count++`,触发 setter,通知依赖更新,调用和 count 有关的所有 effect().

## 参考

- [vue-3-reactivity](https://www.vuemastery.com/courses/vue-3-reactivity/)
- [vue-advanced-workshop](https://github.com/d-levin/vue-advanced-workshop)
- [vue-3-reactivity-Code](https://github.com/Code-Pop/vue-3-reactivity)
- [answershuto/learnVue](https://github.com/answershuto/learnVue/blob/master/docs/%E4%BE%9D%E8%B5%96%E6%94%B6%E9%9B%86.MarkDown)
