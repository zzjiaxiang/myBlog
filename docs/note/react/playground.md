---
id: react-playground
title: playground
tags: [react-playground]
keywords: [react-playground, reactPlayground, react, playground]
description: react-playground
last_update:
  date: 3/10/2024
  author: ZhangJiaxiang
---

## 分析

参考[Vue SFC Playground](https://play.vuejs.org/) 实现效果,我们用 react 实现一个 [react playground](https://react.jiaxiang.me/)

- 左边代码编译,右边实时预览
- 可以分享代码
- 主题色切换
- 代码下载

## 代码编辑器

编辑器用的 [monaco-react](https://github.com/suren-atoyan/monaco-react#readme)

```js
<MonacoEditor
  height="100%"
  path={name}
  language={language}
  value={value}
  onChange={onChange}
  onMount={handleEditorMount}
  options={editorOptions}
/>
```

它提供的配置项,直接传入对于的文件类型即可。当我们编辑的时候会触发 onChange 回调拿到的是当前代码的字符串形式.

例如:

```js
;`import React, { useState } from 'react'
import './App.css'

const App: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello World13</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App`
```

这样的代码直接在浏览器上面运行不了的,所以我们要利用 babel 进行编译.

## 代码编译

编译用的 [@babel/standalone](https://babeljs.io/docs/babel-standalone) babel 的浏览器版本,可以把 tsx 编译成 js

<!-- 编译过程中用自己写的 babel 插件实现 import 的 source 的修改，变为 URL.createObjectURL + Blob 生成的 [blob url](https://developer.mozilla.org/en-US/docs/Web/API/Blob#creating_a_url_representing_the_contents_of_a_typed_array)，把模块内容内联进去。 -->

### babel/standalone 示例

我们从代码编辑器拿到的值就是类似下面 code 变量,当前代码的字符串形式.

```js
import { transform } from '@babel/standalone'

const code = `import { useEffect, useState } from "react";
import App1 from './App.tsx';
  function App() {
    const [num, setNum] = useState(0);
  
    return (
      <div>
      <App1 />
      <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
      </div>
    );
  }
  
  export default App;
  `

const res = transform(code, {
  presets: ['react', 'typescript'],
  filename: 'test.tsx',
})
// 指定他的presets为react和typescript。
console.warn(res.code)
```

把这一段放到代码里面去跑,可以看到控制台输出:

```js
import { useState } from 'react'
import App1 from './App.tsx'
function App() {
  const [num, setNum] = useState(0)
  return /*#__PURE__*/ React.createElement(
    'div',
    null,
    /*#__PURE__*/ React.createElement(App1, null),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        onClick: () => setNum((prevNum) => prevNum + 1),
      },
      num
    )
  )
}
export default App
```

对于文件引入的情况，比如 `import App from './App.tsx`，我们可以把 App.tsx 内容变成 blob url，然后替换 import。

### blob url 示例:

简单来说就是将 js 文件变成 url 使用

```js
const code1 = `
function add(a, b) {
    return a + b;
}
export { add };
`

const url = URL.createObjectURL(
  new Blob([code1], { type: 'application/javascript' })
)
// url = `blob:https://developer.mozilla.org/968ee7ac-87df-4566-8890-e388d67fed8d`
// 可以看到code1这段代码被转换成了blob url
// 这里因为是在mdn控制台跑的,所以地址前缀是mdn网站的.

const code2 = `import { add } from "${url}"; console.log(add(2, 3));`
// code2 = 'import { add } from "blob:https://developer.mozilla.org/968ee7ac-87df-4566-8890-e388d67fed8d"; console.log(add(2, 3));'

const script = document.createElement('script')
script.type = 'module'
script.textContent = code2
document.body.appendChild(script)
```

在浏览器控制台跑下这段代码如下: 可以看到输出了 5 ![](https://png.zjiaxiang.cn/blog/202410010102112.png)

### import maps 示例

对于 `import { useState } from 'react';` 这样代码没在左边写的模块,引入我们可以采用 import maps.

```js
    <script type="importmap">
      {
        "imports": {
          "react": "https://esm.sh/react@18.2.0"
        }
      }
    </script>
    <script type="module">
      import React from 'react'

      console.log(React)
    </script>
```

将这一段放到 html 的 script 标签里面去跑,可以看到控制台输出了 React 的对象。
[esm](https://esm.sh/)是专门提供 es6 模块的 cdn
![](https://png.zjiaxiang.cn/blog/202410031609445.png)
它返回的也是 import url 的方式.

### 替换 import 的 source

比如 `import App from './App.tsx;`

我们拿到到 App.tsx 的内容，然后通过 Bob 和 URL.createObjectURL 的方式把 App.tsx 内容变为一个 blob url，替换 import 的路径.

这个替换过程我们可以利用 babel 自[定义插件](https://babeljs.io/docs/babel-standalone#custom-plugins)来完成

babel 编译流程分为 parse、transform、generate 三个阶段,是在 transform 的阶段增删改 AST 的.
![](https://png.zjiaxiang.cn/blog/202410031627483.png)
对 ImportDeclaration 的 AST 做处理，把 source.value 替换为对应文件的 blob url 就行了

比如:

```js
import { transform } from '@babel/standalone'
import type { PluginObj } from '@babel/core'

function App() {
  const code1 = `
    function add(a, b) {
        return a + b;
    }
    export { add };
    `

  const url = URL.createObjectURL(
    new Blob([code1], { type: 'application/javascript' })
  )

  const transformImportSourcePlugin: PluginObj = {
    visitor: {
      ImportDeclaration(path) {
        path.node.source.value = url
      },
    },
  }

  const code = `import { add } from './add.ts'; console.log(add(2, 3));`

  function onClick() {
    const res = transform(code, {
      presets: ['react', 'typescript'],
      filename: 'file.ts',
      plugins: [transformImportSourcePlugin],
    })
    console.log(res.code)
  }

  return (
    <div>
      <button onClick={onClick}>编译</button>
    </div>
  )
}

export default App
```

代码[路径](https://github.com/zzjiaxiang/react-playground/blob/main/src/components/Preview/compiler.worker.ts)

这里对 tsx 直接用 babel 编译 , css 模块通过 js 把它添加到 head 里的 style 标签里,json 直接导出

```js
const json2Js = (file: File): string => {
  const js = `export default ${file.value}`
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}

const css2Js = (file: File): string => {
  const randomId = Date.now()
  const js = `
(() => {
  const stylesheet = document.createElement('style');
  stylesheet.id = 'style_${randomId}_${file.name}';
  stylesheet.textContent = \`${file.value}\`;
  document.head.appendChild(stylesheet);
})()`
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}
```

在转换前还要对当前没有引入 react 的文件做处理,因为编译后有的文件可能没有引入 React.

```js
const regexReact = /import\s+React\s*(,?\s*\{[^}]*\}\s*)?from\s+['"]react['"]/

export const beforeTransformCode = (filename: string, code: string) => {
  return (filename.endsWith('.jsx') || filename.endsWith('.tsx')) &&
    !regexReact.test(code)
    ? `import React from 'react';\n${code}`
    : code
}
```

## 预览

右边预览是一个 iframe,src 同样是一个 blob url.

部分代码

```js
const IframeUrl = useMemo(() => {
  const res = iframeRaw
    .replace(
      '<script type="importmap"></script>',
      `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
    )
    .replace(
      '<script type="module" id="appSrc"></script>',
      `<script type="module" id="appSrc">${compiledCode}</script>`
    )
  return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
}, [files, compiledCode])

return <iframe src={IframeUrl} />
```

## 分享

将文件通过 fflate, btoa 编码到 url hash.

## 参考

[参考](https://juejin.cn/book/7294082310658326565/section/7358469142178955299)
