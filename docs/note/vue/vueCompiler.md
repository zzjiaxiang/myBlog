---
id: vueCompiler
title: vue模版编译
tags: [vue模版编译]
keywords: [vue模版编译]
description: vue模版编译
last_update:
  date: 6/21/2024
  author: ZhangJiaxiang
---

## [模版编译](https://cn.vuejs.org/guide/scaling-up/sfc.html#how-it-works)

这是 vue 项目里面一个常见单文件组件(SFC).

```vue
<script setup>
import home from './page/home-page.vue'
</script>

<template>
  <home />
</template>
```

当我们导入 sfc 组件时我们打上断点查看,会发现导入的组件被编译成了一个对象.

![](https://png.zjiaxiang.cn/blog/202406211923687.jpg)
这是因为运行时已经被 [@vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc) 编译为标准的 JavaScript 和 CSS，一个编译后的 SFC 是一个标准的 JavaScript(ES) 模块，这也意味着在构建配置正确的前提下，你可以像导入其他 ES 模块一样导入 SFC.

我们使用 vite 脚手架进行项目开发都会用到这个插件`@vitejs/plugin-vue`,正是依赖`@vue/compiler-sfc`才会将 sfc 编译成 js 模块.

webpack 构建的项目一般使用 `vue-loader`,它也是依赖`@vue/compiler-sfc`将 sfc 编译成 js 模块.

### [vite 通用钩子](https://cn.vitejs.dev/guide/api-plugin#universal-hooks)

简单介绍一下 vite 钩子的作用,它会在对应的时候来调用钩子函数,[详情](https://cn.vitejs.dev/guide/api-plugin.html#universal-hooks).`@vitejs/plugin-vue`正是作为一个 plugins 在 vite 中使用的.在`vite.config.js`给`plugins: [vue()]`打上断点,进入 vuePlugin 这个函数可以看到它返回了 `transform,load`(传入模块请求时被调用),buildStart(服务器启动时被调用) 等函数.
![](https://png.zjiaxiang.cn/blog/202406221730028.jpg)

## [vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)

因为 sfc 文件由三部份组成,一个模块转换后还是一个模块.所以使用了一个临时模块组合这三部份.

```js
// main script
import script from '/project/foo.vue?vue&type=script'
// template compiled to render function
import { render } from '/project/foo.vue?vue&type=template&id=xxxxxx'
// css
import '/project/foo.vue?vue&type=style&index=0&id=xxxxxx'

// attach render function to script
script.render = render

// attach additional metadata
// some of these should be dev only
script.__file = 'example.vue'
script.__scopeId = 'xxxxxx'

// additional tooling-specific HMR handling code
// using __VUE_HMR_API__ global

export default script
```

### parse

在模块转化中使用 parse API 将源码解析为 descriptor.

![](https://png.zjiaxiang.cn/blog/202406221347264.jpg)
可以看到 source 就是我们单文件组件的源代码

```js
"<template>\n  <div class=\"container\">\n    <EchartCard :options=\"options1\" />\n    <EchartCard :options=\"options2\" />\n    <EchartCard :options=\"options3\" />\n    <EchartCard :options=\"options4\" />\n    <EchartCard :options=\"options5\" />\n    <EchartCard :options=\"options6\" />\n  </div>\n</template>\n\n<script setup>\nimport EchartCard from '../components/echart-card.vue'\nimport {\n  options1,\n  options2,\n  options3,\n  options4,\n  options5,\n  options6,\n} from './dates'\n</script>\n\n<style scoped>\n.container {\n  height: 100%;\n  width: 100%;\n  display: grid;\n  overflow: hidden;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  grid-template-rows: repeat(2, minmax(0, 1fr));\n}\n</style>\n"
```

parse 返回值 descriptor 是一个包含着 ast 和源模版的对象
![](https://png.zjiaxiang.cn/blog/202406220010712.jpg)
也包含着提取的 css
![](https://png.zjiaxiang.cn/blog/202406221417099.jpg)

### compileScript

使用 compileScript 处理脚本.可以看到他的参数就是 parse 解析后的 descriptor
![](https://png.zjiaxiang.cn/blog/202406220015916.jpg)
resolved.content 属性就是编译后浏览器可直接执行的 js 字符串模块

```js
"import home from './page/home-page.vue'\n\nconst _sfc_main = {\n  __name: 'App',\n  setup(__props, { expose: __expose }) {\n  __expose();\n\n\nconst __returned__ = { home }\nObject.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })\nreturn __returned__\n}\n\n}"
```

### compileTemplate

在模板转换中，用于 compileTemplate 将原始模板编译为 render 函数代码。
![](https://png.zjiaxiang.cn/blog/202406220019080.jpg)
其中 code 就是编译后的 render 函数字符串

```js
"import { openBlock as _openBlock, createBlock as _createBlock } from \"vue\"\n\nexport function render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (_openBlock(), _createBlock($setup[\"home\"]))\n}"
```

### compileStyleAsync 处理样式.

![](https://png.zjiaxiang.cn/blog/202406220159763.jpg)
compileStyleAsync 根据是否有 scoped 给 descriptor 里面的 style 加上了 `data-v-`.

```js
'\n.container[data-v-9551a707] {\n  height: 100%;\n  width: 100%;\n  display: grid;\n  overflow: hidden;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  grid-template-rows: repeat(2, minmax(0, 1fr));\n}\n'
```
