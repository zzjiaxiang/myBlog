---
id: docusaurus-syntax
title: docusaurus语法
tags: [docusaurus-syntax]
keywords: [docusaurus-syntax]
description: Markdown 语法
last_update:
  date: 9/14/2023
  author: ZhangJiaxiang
---

## [markdown语法](https://markdown.com.cn/basic-syntax/)

markdown语法在这里也适用,可以点击标题进入查看详细语法,这里列举一些常用的.

`** 粗体 **`  
** 粗体 **
***
`> 引用语法`
> Dorothy followed her through many of the beautiful rooms in her castle.


## [Images](https://docusaurus.io/zh-CN/docs/markdown-features/assets#images)

docusaurus里面有三种不同的方式展示图像：Markdown 语法、CJS require、ES import 语法。

```javascript
// Markdown 语法
![示例横幅](../../static/img/docusaurus.png)

// CJS require
<img
  style={{width:300+'px',height:300+'px'}}
  src={require('../../static/img/docusaurus.png').default}
  alt="Example banner"
/>

// ES import
import myImageUrl from '../../static/img/docusaurus.png';
<img src={myImageUrl} alt="Example banner" />;
```

可以直接使用CJS require语法支持图片自定义大小.
<img
style={{width:300+'px',height:300+'px'}}
src={require('../../static/img/docusaurus.png').default}
alt="Example banner"
/>

## [告示框](https://www.docusaurus.cn/docs/markdown-features/admonitions)

:::note可选标题!

Some **content** with _Markdown_ `syntax`. note(备注).

:::

:::tip

Some **content** with _Markdown_ `syntax`. tip(提示).

:::

:::info

Some **content** with _Markdown_ `syntax`. info(信息).

:::

:::caution

Some **content** with _Markdown_ `syntax`.caution(警告).

:::

:::danger

Some **content** with _Markdown_ `syntax`.danger(危险).

:::
