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

# createApp 流程

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

# mount 挂载

看了 app 的实例,接着我们在看下 mount 挂载方法.
![](https://png.zjiaxiang.cn/blog/202406191809235.jpg)
虽然这里对 mount 方法进行重写,但是最终还是调用的是 app 里面的 mount 方法.继续回到 createAppAPI,找到 mount 方法.
![](https://png.zjiaxiang.cn/blog/202406191819761.jpg)
可以看到这里面主要就是创建 vnode 和调用 render 函数.其余的边界判断不做分析.

## vnode

![](https://png.zjiaxiang.cn/blog/202406191952814.jpg)
`core/packages/runtime-core/src/vnode.ts`里面 createBaseVNode 函数定义了一个 vnode 对象.
![](https://png.zjiaxiang.cn/blog/202406191959249.jpg)
最后将这个 vnode 返回,可见 vnode 是一个对象.

## render 方法

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

## patch

vnode 创建完成了,接下来我们来看下 patch 函数,他也是在 baseCreateRenderer 里面定义的.patch 函数还是比较重要的.后面对比节点时会用到.
![](https://png.zjiaxiang.cn/blog/202406191847207.jpg)
n1,n2 是传进来的 vnode(新旧)节点,前面几个判断处理了几点特殊的情况.可以直接看下面的 switch 选择.这里是根据不同的组件类型做不同的处理.以第一个 default 选择为例,看下怎么处理的.展开发现里面调用了 processElement 函数处理元素.可以直接在这个函数里面找到.
![](https://png.zjiaxiang.cn/blog/202406200018722.jpg)
这里做了下判断新节点为空,直接就卸载掉旧的节点.否则 patchElement 更新节点.这个函数依旧在这个文件里面,继续往下看

### patchElement

![](https://png.zjiaxiang.cn/blog/202406200041725.jpg)
提取新旧节点的 Props,更新前触发一些钩子函数,如 beforeUpdate
![](https://png.zjiaxiang.cn/blog/202406200047567.jpg)
继续往下,这里判断如果是动态子节点,则调用 patchBlockChildren 部份更新,否则在没有 optimized 下调用 patchChildren 全部更新.
![](https://png.zjiaxiang.cn/blog/202406200050585.jpg)
可以看到 optimized 来自这里.

#### patchChildren

进 patchChildren 来看一下是怎么处理的.

![](https://png.zjiaxiang.cn/blog/202406201858165.jpg)
分为两部份一部分是快速 patch,另外一部分是元素 children 只有文本、数组或无 children 的情况.展开`patchFlag > 0`的情况,我们发现,调用了一个 patchKeyedChildren 的方法.下面重点看一下这个方法.

## diff (patchKeyedChildren)

这部分就不截图了,贴上尤大的注释(英文与符号都是,中文是我自己加的),这个函数做了这五件事.

首先定义了这四个变量,后面要用到

```js
let i = 0
const l2 = c2.length
let e1 = c1.length - 1 // prev ending index
let e2 = l2 - 1 // next ending index
```

### 1. sync from start

```js
// 1. sync from start
// (a b) c
// (a b) d e
while (i <= e1 && i <= e2) {
  const n1 = c1[i]
  const n2 = (c2[i] = optimized
    ? cloneIfMounted(c2[i] as VNode)
    : normalizeVNode(c2[i]))
  if (isSameVNodeType(n1, n2)) {
    patch(
      n1,
      n2,
      container,
      null,
      parentComponent,
      parentSuspense,
      namespace,
      slotScopeIds,
      optimized,
    )
  } else {
    break
  }
  i++
}
```

这一块比较短贴出源码,意思就是从左边开始遍历,找到相同类型的节点进行 patch 操作,直至类型不同停止.

### 2. sync from end

与第一步类似,只不过是从右边开始遍历.

```js
// 2. sync from end
// a (b c)
// d e (b c)
```

### 3. common sequence + mount

```js
// 3. common sequence + mount
// (a b)
// (a b) c
// i = 2, e1 = 1, e2 = 2
// (a b)
// c (a b)
// i = 0, e1 = -1, e2 = 0
if (i > e1) {
  if (i <= e2) {
    const nextPos = e2 + 1
    const anchor = nextPos < l2 ? (c2[nextPos] as VNode).el : parentAnchor
    while (i <= e2) {
      patch(
        null,
        (c2[i] = optimized
          ? cloneIfMounted(c2[i] as VNode)
          : normalizeVNode(c2[i])),
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
      )
      i++
    }
  }
}
```

下表大于就旧节点长度,并且小于新节点长度(旧节点遍历完成了,新节点还没有完),证明有新增的节点,所以这里的 patch 函数第一个参数传 null.

### 4. common sequence + unmount

```js
// (a b) c
// (a b)
// i = 2, e1 = 2, e2 = 1
// a (b c)
// (b c)
// i = 0, e1 = 0, e2 = -1
else if (i > e2) {
  while (i <= e1) {
    unmount(c1[i], parentComponent, parentSuspense, true)
    i++
  }
}
```

下表小于旧节点,大于新节点,新节点已经没有要比较的了(新节点遍历完成了,旧节点还没有),直接删除掉多余的旧节点.

### 5. unknown sequence

第五点是最复杂的一步了,经过了前面四步,剩下了中间不确定序列的节点了.这里就不贴代码了,就结合着尤大的注释简单的来说一下几点过程. 源码在 `core/packages/runtime-core/src/renderer.ts` 目录下面感兴趣的可以看下.

```js
// 5. unknown sequence
// [i ... e1 + 1]: a b [c d e] f g
// [i ... e2 + 1]: a b [e d c h] f g
// i = 2, e1 = 4, e2 = 5
```

#### 5.1build key:index map for newChildren

用 map 保存新节点的 key:index 类似这样 `map<key,index>`.

#### 5.2 loop through old children left to be patched and try to patch

对能够匹配到的新旧节点进行 patch 操作,删除不存在旧的节点.

#### 5.3 move and mount

这里引入了最长递增子序列,移动和新增节点.

### 总结 diff

1. 新旧节点从前开始比较找到类型相同的节点 patch 操作.
2. 新旧节点从后开始比较找到类型相同的节点 patch 操作.
3. 新节点比旧节点多,新增操作.
4. 旧节点比新节点少,删除操作.
5. 对中间未知序列进行对比,移动和新增操作.

## vue2 diff

双端 diff.
源码路径`src/core/vdom/patch.ts` updateChildren 函数
![](https://png.zjiaxiang.cn/blog/202406210054089.jpg)
看到了这个 while 循环是不是和 vue3 前面几步 diff 很相似

1. 新旧节点数组的两个 起始索引 指向的节点是 基本一致的，那么此时会调用 patchVnode.
2. 新旧节点数组的最后一个节点基本一致，此时一样调用 patchVnode.
3. (旧头等于新尾)旧节点数组 当前起始索引 指向的 vnode 与 新节点数组 当前末尾索引 指向的 vnode 基本一致，一样调用 patchVnode 对两个节点进行处理。
4. (旧尾等于新头)与 3.一致都涉及节点的移动操作.
5. 旧节点生成 `key,index` 对象,根据新节点 key 找
   1. 找到了对应索引 1.相同节点 patchVnode 对比.2. 不同节点 createElm 新建
   2. 没找到直接 createElm 新建
6. 1. 旧节点数组遍历结束、新节点数组仍有剩余，则遍历新节点数组剩余数据，分别创建节点并插入到旧末尾索引对应节点之前

   2. 新节点数组遍历结束、旧节点数组仍有剩余，则遍历旧节点数组剩余数据，分别从节点数组和 dom 树中移除

# 总结

## 参考

[https://segmentfault.com/a/1190000043632772#item-6-10](https://segmentfault.com/a/1190000043632772#item-6-10)
[https://juejin.cn/post/6968585717924495368#heading-8](https://juejin.cn/post/6968585717924495368#heading-8)
