---
id: definePropertyProxy
title: defineProperty与Proxy
tags: [defineProperty, Proxy]
keywords: [defineProperty, Proxy]
description: defineProperty与Proxy
last_update:
  date: 6/13/2024
  author: ZhangJiaxiang
---

## defineProperty

Object.defineProperty() 静态方法会直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象。

### 语法参数

```ts
Object.defineProperty(obj, prop, descriptor)
```

- obj: 要在其上定义属性的对象。

- prop: 要定义或修改的属性的名称。

- descriptor: 将被定义或修改的属性的描述符。

#### 举个例子:

```ts
const object1 = {}

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false,
})

object1.property1 = 77
// Throws an error in strict mode

console.log(object1.property1)
// Expected output: 42
```

### descriptor

函数的第三个参数 descriptor 所表示的属性描述符有两种形式：数据描述符和存取描述符。

两者均具有以下两种键值：

- configurable
  - 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，也能够被删除。默认为 false。
- enumerable
  - 当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。

数据描述符同时具有以下可选键值：

- value
  - 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
- writable
  - 当且仅当该属性的 writable 为 true 时，该属性才能被赋值运算符改变。默认为 false。

存取描述符同时具有以下可选键值：

- get
  - 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined。
- set
  - 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined。

### 注意

属性描述符必须是数据描述符或者存取描述符两种形式之一，不能同时是两者 。

如果描述符没有 value、writable、get 和 set 键中的任何一个，它将被视为数据描述符。

如果描述符同时具有 [value 或 writable] 和 [get 或 set] 键，则会抛出异常。

```ts
// 报错
Object.defineProperty({}, 'num', {
  value: 1,
  get: function () {
    return 1
  },
})
```

所有的属性描述符都是非必须的，但是 descriptor 这个字段是必须的，如果不进行任何配置，可以这样

```ts
const obj = Object.defineProperty({}, 'num', {})
console.log(obj.num) // undefined
```

### Setters 和 Getters

存取描述符中的 get 和 set，这两个方法又被称为 getter 和 setter.

当程序查询存取器属性的值时，JavaScript 调用 getter 方法。这个方法的返回值就是属性存取表达式的值。当程序设置一个存取器属性的值时，JavaScript 调用 setter 方法，将赋值表达式右侧的值当做参数传入 setter。

举个例子:

```ts
const obj = {
  name: 'test',
  age: 18,
  sex: 'male',
}

Object.keys(obj).forEach((key) => {
  let value = obj[key]
  Object.defineProperty(obj, key, {
    get: () => value,
    set: (newValue) => {
      console.log('set', key, value)
      value = newValue
    },
  })
})
```

这样一来我们就对 obj 这个对象所有属性的读取进行了代理,当读取或者修改对象值的时候都可以监听到了.

注意 set 时给 obj[value]赋值时,不能直接在 set 函数里面 obj[key] = newValue,因为这样会导致死循环.
所以要使用额外的变量来保存值.

## [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

使用 defineProperty 只能重定义属性的读取（get）和设置（set）行为，到了 ES6，提供了 Proxy，可以重定义更多的行为，比如 in、delete、函数调用等更多行为。

```ts
const p = new Proxy(target, handler)
```

- target

  要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

- handler

  一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

```ts
// 回调函数参数
// target(目标对象) property(属性key),receiver(调用的代理对象),value(新属性值)
const proxy = new Proxy(target, {
  get: (target, property, receiver) => target[property],
  set: (target, property, value, receiver) => (target[property] = value),
})
```

除了 get 和 set 之外，proxy 可以拦截多达[13 种操作](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy)

## [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与 proxy handler 的方法相同。Reflect 不是一个函数对象，因此它是不可构造的。

它主要提供了很多操作 JavaScript 对象的方法，有点像 Object 中操作对象的方法.

例如:

- Reflect.getPrototypeOf() 与 Object.getPrototypeOf()
- Reflect.defineProperty() 与 Object.defineProperty() 方法，唯一不同是返回 Boolean 值。
- Reflect.ownKeys() 与 Object.Keys() 方法
- Reflect.setPrototypeOf() 与 Object.setPrototypeOf()

  等等,就不一一列举.

这里用 Reflect.get()和 Reflect.set()来代替对象赋值与获取.

```ts
const proxy = new Proxy(target, {
  get: (target, property, receiver) => Reflect.get(target, property),
  set: (target, property, value, receiver) =>
    Reflect.set(target, property, value),
})
```

## 实现 watch 函数

实现这样一个函数,第一个参数是要监听的对象,第二个是回调函数.发现对象属性的修改,就会执行回调函数.

这里分别用 Object.defineProperty 和 Proxy 实现.

### Proxy

```ts
const obj = {
  name: 'test',
  age: 18,
  sex: 'male',
}
const watch = (obj, fn) =>
  new Proxy(obj, {
    get: (target, property) => Reflect.get(target, property),
    set: (target, property, value) => {
      fn(value, target[property])
      Reflect.set(target, property, value)
    },
  })

const proxy = watch(obj, (value, oldValue) => {
  console.log(`watch  ${value}  ${oldValue}`)
})
proxy.name = 'kobe'
proxy.age = 30
console.log(proxy.name)
```

### Object.defineProperty

```ts
const obj = {
  name: 'test',
  age: 18,
  sex: 'male',
}
const watch = (obj, fn) =>
  Reflect.ownKeys(obj).forEach((key) => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
      get: () => value,
      set: (newValue) => {
        fn(newValue, value)
        value = newValue
      },
    })
  })
watch(obj, (value, oldValue) => {
  console.log(`watch  ${value}  ${oldValue}`)
})
obj.name = 'kobe'
obj.age = 30
console.log(obj.name)
```

可以看到 defineProperty 和 proxy 的区别.

- proxy 直接代理整个对象,而 defineProperty 是代理对象中的每一个属性(要代理整个对象,需要遍历操作)
- 使用 proxy 必须修改代理对象才可以触发拦截,而 defineProperty 修改原来的 obj 对象就可以触发拦截.

除了这个例子的区别,还有

- Proxy 拦截的方法多达 13 种,而 defineProperty 只有 get 和 set 两种.
- Proxy 可以代理数组,而 defineProperty 对数组数据的变化无能为力.

### 参考

[https://github.com/mqyqingfeng/Blog/issues/107](https://github.com/mqyqingfeng/Blog/issues/107)
