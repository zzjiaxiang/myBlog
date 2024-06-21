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

# [模版编译](https://cn.vuejs.org/guide/scaling-up/sfc.html#how-it-works)

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

# [vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)

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

1. 在模块转化中使用 parse API 将源码解析为 descriptor
   通过 debugger 我们可以看到 descriptor 是一个包含着 ast 和源模版的对象
   ![](https://png.zjiaxiang.cn/blog/202406220010712.jpg)
2. 使用 compileScript 处理脚本.
   ![](https://png.zjiaxiang.cn/blog/202406220015916.jpg)
3. 在模板转换中，用于 compileTemplate 将原始模板编译为 render 函数代码。
   ![](https://png.zjiaxiang.cn/blog/202406220019080.jpg)
   其中 code 就是编译后的 render 函数字符串

```js
"import { openBlock as _openBlock, createBlock as _createBlock } from \"vue\"\n\nexport function render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (_openBlock(), _createBlock($setup[\"home\"]))\n}"
```

4. compileStyleAsync 处理样式.

![](https://png.zjiaxiang.cn/blog/202406220159763.jpg)

```js
'\n.container[data-v-9551a707] {\n  height: 100%;\n  width: 100%;\n  display: grid;\n  overflow: hidden;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  grid-template-rows: repeat(2, minmax(0, 1fr));\n}\n'
```
