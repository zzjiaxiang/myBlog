---
id: chrome-devtools
title: chrome-devtools 调试技巧
tags: [chrome, devtools, 调试]
keywords: [chrome, devtools, 调试]
description: chrome-devtools 调试技巧
last_update:
  date: 9/22/2023
  author: ZhangJiaxiang
---

这里列举一些能提高开发者效率的chrome-devtools调试技巧,暂时列举这么多,后面用到会继续加上.查看chrome-devtools每个版本的新功能点击[这里](https://developer.chrome.com/tags/new-in-devtools/). 许多内容参考了这本[小册](https://juejin.cn/book/6844733783166418958?enter_from=course_center&utm_source=course_center).

## [简化了本地修改网络响应表头和内容 117](https://developer.chrome.com/docs/devtools/overrides?hl=zh-cn)

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

这个是67版本就发布了的功能,当我们需要修改请求头,内容重新发起请求时,可以右键网络 Copy > Copy As Fetch,就会生成fetch()请求的等效代码.需要修改请求时,只需将其粘贴到控制台上修改然后点击enter就可以重发你的请求.
![](https://wd.imgix.net/image/admin/7bW4IwvbWaKHy1iknSp2.png?auto=format&w=1600)

## console

### console面板 $ 符号使用

![$符号](https://png.zjiaxiang.cn/blog/20231027170828.png)
我们在元素面板选中一个元素后,可以看到选中的元素后面有一个$0标识符号,在console面板直接输入$0然后点击回车就可以看到当前选中的元素被打印到控制台上面了.

### [console.table](https://developer.mozilla.org/en-US/docs/Web/API/Console/table)

![table](https://png.zjiaxiang.cn/blog/202310271836163.png)
在控制台将数据以表格的形式打印出来.表格的第一列是 index。如果数据 data 是一个数组，那么这一列的单元格的值就是数组的索引。如果数据是一个对象，那么它们的值就是各对象的属性名称。点击表头可以对表哥进行排序.

### [console.dir](https://developer.mozilla.org/en-US/docs/Web/API/console/dir)

这个方法也是打印一个对象,但是在打印DOM结构时,打印出来的是元素的属性
![dir](https://png.zjiaxiang.cn/blog/202310271858233.png)

### [console.time/timeLog/timeEnd](https://developer.mozilla.org/en-US/docs/Web/API/console/timeEnd)

time开启一个计时器,timeLog打印出开启计时器到现在的时间,timeEnd停止计时器显示开启到停止的时间.

```javascript
console.time('answer time')
alert('Click to continue')
console.timeLog('answer time')
alert('Do a bunch of other stuff…')
console.timeEnd('answer time')
```
![time](https://png.zjiaxiang.cn/blog/202310272322864.png)
在浏览器控制台输入这段代码,输出显示用户关闭第一个警报框所花费的时间，然后是用户消除两个警报所花费的累积时间.
