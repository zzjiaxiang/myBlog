---
id: content-visibility
title: content-visibility属性
tags: [content-visibility]
keywords: [content-visibility]
description: content-visibility新的css属性
last_update:
  date: 9/22/2023
  author: ZhangJiaxiang
---
## [content-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility)
关于`content-visibility这个css属性` [这篇博客了](https://web.dev/content-visibility/)介绍的已经很详细,在这里简单记录下这个属性的使用场景,要学习它的语法点击标题进入`MDN content-visibility`.

`content-visibility`使用户代理(浏览器)能够跳过元素的渲染工作，包括布局和绘制，直到需要为止。由于会跳过渲染，因此如果大部分内容不在屏幕上，则利用该属性可以使初始用户加载速度更快。

测试代码案例来源于上面那篇博客,可以将他里面的代码复制到你本地自行进行测试.这里我截了两张图,分别是给段落设置了`content-visibility`和没有设置页面的Rendering时间对比.可以看到设置了该属性的Rendering时间要远小于没有设置的时间.
#### 没有设置
![](https://png.zjiaxiang.cn/blog/20230922000818.png)
#### 设置了
![](https://png.zjiaxiang.cn/blog/20230922001023.png)
此时将页面快速的向下滚动时也会发现滚动条会有上下跳动现象,这是因为有的元素首次没有被渲染经滚动进入视口后才被渲染.
![](https://png.zjiaxiang.cn/blog/20230922011148.gif)
:::info
`content-visibility`与以往我们使用懒加载不同的是,即使设置了`content-visibility`但是我们也可以进行全局搜索(ctrl + F)到他的内容,而我们使用的一些虚拟列表或者懒加载的方案在它视口外的DOM元素是不存在的.
:::
