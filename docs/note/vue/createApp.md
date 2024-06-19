---
id: createApp
title: createApp做了什么
tags: [createApp]
keywords: [createApp]
description: createApp
last_update:
  date: 6/20/2024
  author: ZhangJiaxiang
---

创建 vue3 项目时,在`main.js`里面一般会有如下代码:

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

我们来看看`createApp(App).mount('#app')`做了什么.

首先利用 vscode 创建一个调试配置文件,配置如下:

```js
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "针对 localhost 启动 Chrome",
      "url": "http://localhost:5173/",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

url 是本地的项目运行地址.创建好后,打上断点,点击绿色小箭头就可以开始调试了.
![](https://png.zjiaxiang.cn/blog/202406191700965.jpg)
点击进入当前函数,就会来到 createApp 定义的地方.
![](https://png.zjiaxiang.cn/blog/202406191702330.jpg)
它的源码在`core/packages/runtime-dom/src/index.ts`这个文件里面.可以直接在源码文件里面查看这个方法的调用.
可以看到实际上是调用了`ensureRenderer`里面的`createApp`方法,并且重写了 mount 挂载方法.

继续搜索到`ensureRenderer`方法,发现它是通过 createRenderer 方法创建的.

```js
function ensureRenderer() {
  return (
    renderer ||
    ((renderer = createRenderer < Node),
    Element | (ShadowRoot > rendererOptions))
  )
}
```

createRenderer 这个方法在`core/packages/runtime-core/src/renderer.ts`里面

```js
export function createRenderer<
  HostNode = RendererNode,
  HostElement = RendererElement
>(options: RendererOptions<HostNode, HostElement>) {
  return baseCreateRenderer < HostNode, HostElement > options
}
```

可以看到实际上还是调用了 baseCreateRenderer 方法.这个方法就在此文件里面,直接搜到会发现它有 2 千多行!.我们现在先不用关心这个函数做了什么,直接看函数的返回.
![](https://png.zjiaxiang.cn/blog/202406191723224.jpg)
可以看到返回的 createApp 函数就是 createAppAPI 函数.
![](https://png.zjiaxiang.cn/blog/202406191725325.jpg)
经过上面几层函数的来回调用,到现在就找到了 createApp 这个函数最终定义的地方了,利用断点,会比我们在原文件里面更方便的找到这里.

看一下返回 app 对象里面的属性
![](https://png.zjiaxiang.cn/blog/202406191732299.jpg)
可以看许多熟悉的 api, use、mixin、component、directive、mount、unmount、provide .
![](https://png.zjiaxiang.cn/blog/202406191743361.jpg)
这就是对应的 app 实例上面的方法.

看了 app 的实例,接着我们在看下 mount 挂载方法.
![](https://png.zjiaxiang.cn/blog/202406191809235.jpg)
虽然这里对 mount 方法进行重写,但是最终还是调用的是 app 里面的 mount 方法.继续回到 createAppAPI,找到 mount 方法.
![](https://png.zjiaxiang.cn/blog/202406191819761.jpg)
可以看到这里面主要就是创建 vnode 和调用 render 函数.其余的边界判断不做分析.
![](https://png.zjiaxiang.cn/blog/202406191952814.jpg)
`core/packages/runtime-core/src/vnode.ts`里面 createBaseVNode 函数定义了一个 vnode 对象.
![](https://png.zjiaxiang.cn/blog/202406191959249.jpg)
最后将这个 vnode 返回,可见 vnode 是一个对象.

这里看一下 render 方法,他是在 baseCreateRenderer 函数里面定义的,作为参数传给 createApp 的
![](https://png.zjiaxiang.cn/blog/202406191829501.jpg)

```js
const render: RootRenderFunction = (vnode, container, namespace) => {
  // 这里先进行了判断,如果没有 vnode 并且已经渲染过vnode,就卸载掉当前的 vnode
  if (vnode == null) {
    if (container._vnode) {
      unmount(container._vnode, null, null, true)
    }
  } else {
    patch(
      container._vnode || null,
      vnode,
      container,
      null,
      null,
      null,
      namespace
    )
  }
  // 更新的队列(vue是异步更新dom的)
  if (!isFlushing) {
    isFlushing = true
    flushPreFlushCbs()
    flushPostFlushCbs()
    isFlushing = false
  }
  // 保存当前的 vnode
  container._vnode = vnode
}
```

通过这函数的最后一段代码可以看到 vue 将 vnode 挂载到容器(也就是它的真实 dom 元素)上.这样方便后面进行新旧节点的比较.我们打上断点在浏览器里面就可以看到.
![](https://png.zjiaxiang.cn/blog/202406192016731.jpg)
这里我们来看下 patch 函数,他也是在 baseCreateRenderer 里面定义的.
patch 函数是实现 dom 更新和 diff 算法的核心函数.
![](https://png.zjiaxiang.cn/blog/202406191847207.jpg)
n1,n2 是传进来的 vnode(新旧),前面几个判断处理了几点特殊的情况.可以直接看下面的 switch 选择.这里是根据不同的组件类型做不同的处理.以第一个 default 选择为例,看下怎么处理的 processElement 处理元素.可以直接在这个函数里面找到.
![](https://png.zjiaxiang.cn/blog/202406200018722.jpg)
这里做了下判断新节点为空,直接就卸载掉旧的节点.否则 patchElement 更新节点.这个函数依赖在这个文件里面,继续往下走
![](https://png.zjiaxiang.cn/blog/202406200041725.jpg)
这个函数有许多注释,提取新旧节点的 Props,更新前触发一些钩子函数,如 beforeUpdate
![](https://png.zjiaxiang.cn/blog/202406200047567.jpg)
继续往下,这里判断如果是动态子节点,则调用 patchBlockChildren 部份更新,否则在没有 optimized 下调用 patchChildren 全部更新.
![](https://png.zjiaxiang.cn/blog/202406200050585.jpg)
可以看到 optimized 来自这里.
进 patchChildren 来看一下是怎么处理的.
![](https://png.zjiaxiang.cn/blog/202406200111921.jpg)
首先根据 patchFlag 变量以及 PatchFlags 分别调用 patchKeyedChildren(有 key 情况下) 和 patchUnkeyedChildren.没有 patchFlag 时,子节点就只有这三种情况 text, array or no children,这里的注释写的也很清楚.重点看一下 patchKeyedChildren 这个方法.对两个节点进行全量更新.
![](https://png.zjiaxiang.cn/blog/202406200119823.jpg)
这里有个重要的变量 patchFlag,先看不满足条件时,它是全量对比.
![](https://png.zjiaxiang.cn/blog/202406200100443.jpg)
展开它条件里面的代码,发现注释越来越多,更有利于理解代码了.
![](https://png.zjiaxiang.cn/blog/202406200055140.jpg)
这里根据 PatchFlags 来判断更新它的 class,style,以及是否要全量对比
