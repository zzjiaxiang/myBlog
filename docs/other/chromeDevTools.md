---
id: chrome-devtools
title: chrome-devtools 新功能
tags: [chrome, devtools,调试]
keywords: [chrome, devtools,调试]
description: chrome-devtools 调试技巧
last_update:
  date: 9/21/2023
  author: ZhangJiaxiang
---
近期 Chrome 发布了`117`版本,新增了几项DevTools功能,对开发者来说方便了不少,下面列举几项,更多新功能点击[这里查看](https://developer.chrome.com/blog/new-in-devtools-117/?utm_source=devtools).
## 本地修改网络响应表头和内容
打开DevTools在网络面板中右键一个网络请求选择覆盖内容
![](https://wd.imgix.net/image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BRExqF6iUJioa9YkiUeV.png?auto=format&w=1600)
第一次打卡会让你选择一个文件夹来存放覆盖的文件,这里选择一个文件夹,然后点击同意就行.
![](https://wd.imgix.net/image/NJdAV9UgKuN8AhoaPBquL7giZQo1/cuNvCVUAVtICozqgThQi.png?auto=format&w=1600)
同意后，DevTools 会将您带到`Sources > Overrides`,这里可以看到刚才网络响应的内容,这里可以直接编辑,然后 `command + s` 或者 `Ctrl + S`保存.我们刷新网页就可以看到网络响应内容变成了我们刚才编辑的内容了.
![](https://png.zjiaxiang.cn/blog/20230920234557.png)
注意到我们编辑了响应内容他的资源显示右下角会有紫色的图标.

取消网络覆盖 Sources > Overrides，可以点击取消 “Enable local overrides” 复选框，或者点击旁边的 Clear 图标.

这里用动图展示下修改过程,以及取消这次的网络覆盖.
![](https://png.zjiaxiang.cn/blog/20230921000302.gif)

## [覆盖XHR的内容和重新请求](https://developer.chrome.com/blog/new-in-devtools-117/?utm_source=devtools#xhr-fetch)
