---
id: background
title: background
date: 2023-7-4
tags: [css,background,linear-gradient,radial-gradient,conic-gradient]
keywords: [css, background,linear-gradient,radial-gradient,conic-gradient]
description: css background属性介绍
last_update:
  date: 9/14/2023
  author: ZhangJiaxiang
---
## [linear-gradient 线性渐变](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/linear-gradient)

```css
/* 从下到上，从蓝色开始到高度 40% 位置,红色开始直至结束 */
linear-gradient(0deg, blue 0%, blue 40%, red 40%,red 100%);

/* 渐变轴为45度，从蓝色渐变到透明 */
linear-gradient(45deg, blue, transparent);

/* 渐变轴为45度，从透明到红色重复渐变 */
repeating-linear-gradient(45deg,transparent,transparent 25px,red 25px,red 50px);
```

![](https://png.zjiaxiang.cn/blog/20230718183135.png)

## [radial-gradient 径向渐变](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/radial-gradient)

```css
/* 在容器中心的渐变，从红色开始，变成蓝色，最后变成绿色 */
radial-gradient(red 0 50%, blue 50% 100%);

/* 在容器中心的渐变，从绿色到黄色的重复径向渐变 */
repeating-radial-gradient(yellow 0 10px,green 10px 20px);
```

<img src="https://png.zjiaxiang.cn/blog/20230719151127.png" />

## [conic-gradient 锥形渐变](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/conic-gradient)


```css
/* 从红色到绿色,再到蓝色的锥形渐变 */
conic-gradient(red, green, blue);

/* 相邻颜色具有相同的颜色断点值,100% 等于 360 度 */
conic-gradient(red 30%, green 30% 70%, blue 70%);

/* 偏移中心的渐变 */
conic-gradient(from 0 at 0 50%, blue, yellow 180deg);

/* 0-10括度红色,10-20括度蓝色的重复锥形渐变 */
repeating-conic-gradient(red 0 10deg, blue 10deg 20deg);
```
![](https://png.zjiaxiang.cn/blog/20230719170510.png)

:::info
锥形渐变，颜色会围绕圆心旋转，从顶部开始顺时针旋转。在径向渐变中，颜色从椭圆中心向各个方向向外过渡。
与线性渐变和径向渐变不同，线性渐变和径向渐变的颜色断点是通过指定 [length](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) 来放置的，而锥形渐变的颜色断点是通过 [angle](https://developer.mozilla.org/zh-CN/docs/Web/CSS/angle) 来指定的。单位包括度的 `deg`、梯度的 `grad`、弧度的 `rad`和圈的 `turn`。在一个圆中有 360 度，400 个梯度，2π 弧度，1 圈。支持锥形渐变的浏览器也接受百分比值，100% 等于 360 度，但这不在规范中。
:::
![](https://png.zjiaxiang.cn/blog/20230719171653.png)

[示例代码](https://codepen.io/zzjiaxiang/pen/OJajWry)
