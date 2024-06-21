---
id: vueDiff
title: vue diff算法
tags: [vue diff]
keywords: [vue diff]
description: vue2 与 vue3 diff区别
last_update:
  date: 6/21/2024
  author: ZhangJiaxiang
---

## patch(vue3)

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

这部分就不截图了,贴上尤大的注释,这个函数做了这五件事.

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

## vue2 vs vue3 diff

vue2 通过双端对比与生成索引 map 两种方式减少了简单算法中的多次循环操作，新旧数组均只需要进行一次遍历即可将所有节点进行对比。其中会分别进行四次对比和移动.

Vue 3 中引入了 最长递增子序列(第 5 步) 的方式来 替代双端对比，而其余部分则依然通过转为索引 map 的形式利用空间扩展来减少时间复杂度，从而更高的提升计算性能。

# 总结

## 参考

- [Vue2 diff 算法图解](https://segmentfault.com/a/1190000043632772#item-6-10)
- [Vue3 源码解析（五）：Patch 算法](https://juejin.cn/post/6968585717924495368#heading-8)
