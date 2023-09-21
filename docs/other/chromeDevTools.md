---
id: chrome-devtools
title: chrome-devtools 调试技巧
tags: [chrome, devtools,调试]
keywords: [chrome, devtools,调试]
description: chrome-devtools 调试技巧
last_update:
  date: 9/22/2023
  author: ZhangJiaxiang
---
这里列举一些能提高开发者效率的chrome-devtools调试技巧,暂时列举这么多,后面用到会继续加上.查看chrome-devtools每个版本的新功能点击[这里](https://developer.chrome.com/tags/new-in-devtools/).
## [简化了本地修改网络响应表头和内容 117](https://developer.chrome.com/blog/new-in-devtools-117/?utm_source=devtools#xhr-fetch)
通过自定义修改网络响应表头和内容能让我们在不修改接口的情况下去模拟返回的数据,这个功能以前就有,但是这次更新简化了操作.

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

## [覆盖XHR的内容和重新请求 67](https://developer.chrome.com/blog/new-in-devtools-67/#fetch)
这个是67版本就发布了的功能,当我们需要修改请求头,内容重新发起请求时,可以右键网络  Copy > Copy As Fetch,就会生成fetch()请求的等效代码.需要修改请求时,只需将其粘贴到控制台上修改然后点击enter就可以重发你的请求.
![](https://wd.imgix.net/image/admin/7bW4IwvbWaKHy1iknSp2.png?auto=format&w=1600)
