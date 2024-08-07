---
id: vuePersistence
title: vue状态管理及持久化存储
tags: [vue状态管理及持久化存储, vue-persistence, pinia-plugin-persistedstate]
keywords:
  [vue状态管理及持久化存储, vue-persistence, pinia-plugin-persistedstate]
description: vue状态管理及持久化存储,pinia-plugin-persistedstate
last_update:
  date: 8/2/2024
  author: ZhangJiaxiang
---

## vue 持久化存储

vue 的状态管理库不管是 vuex 还是 pinia,如果你不做处理的话,刷新当前页面的时候,数据会丢失,所以我们需要一个持久化的插件.

### [pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate)

介绍一个 pinia 持久化的插件,[pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/),使用起来很简单.

`src/stores/index.ts`

```js
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
```

使用 piniaPluginPersistedstate 插件.

`src/main.ts`

```js
import pinia from '@/stores'
app.use(pinia)
```

main 注册

`src/stores/user.ts`

```js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      someState: '你好 pinia',
    }
  },
  actions: {
    changeUserName(str: string) {
      this.someState = str
    },
  },
  persist: true,
})
```

模块化里面直接开启 `persist: true`表示开启持久化.

pinia 的用法可以看 pinia [官网](https://pinia.vuejs.org/).

`pinia-plugin-persistedstate`配置查看[官网设置](https://prazdevs.github.io/pinia-plugin-persistedstate/).

### [vuex-persist](https://github.com/championswimmer/vuex-persist)

`vuex-persist` 作为对 vuex 的持久化插件.详细用法可以查看[官网](https://championswimmer.in/vuex-persist/)

- [Vuex 框架原理与源码分析](https://tech.meituan.com/2017/04/27/vuex-code-analysis.html)
- [遇见面试 Vuex 原理解析](https://github.com/yang-ruiyuan/web01/blob/master/vue%E5%8E%9F%E7%90%86/vuex.md)
- [pinia 实现原理](http://wangtongmeng.com/fe/vue/pinia%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.html)
