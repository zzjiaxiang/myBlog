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
