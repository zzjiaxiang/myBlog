---
id: canvasapi
title: 学习canvasApi
tags: [canvas]
keywords: [前端, canvasapi, canvas]
description: 学习canvasApi
last_update:
  date: 11/20/2023
  author: ZhangJiaxiang
---

# [HTMLCanvasElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)

## 属性

### [width](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/width)

元素的宽,没有设置的话默认300

### [height](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/height)

元素的高,没有设置的话默认150

## 方法

### [toBlob](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toBlob)
返回 [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象，用以展示 `canvas` 上的信息.
#### 语法

```jacascript
toBlob(callback, type, quality)
```

#### 参数

##### callback

`toBlob`方法执行后的回调函数,得一个 [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象参数。如果图像未被成功创建，可能会获得 null 值。

##### type(可选)

指定图片格式，默认格式为 `image/png` 也可以为`image/webp`。

##### quality(可选)

值在 0 与 1 之间(Number类型)，当请求图片格式为 `image/jpeg` 或者 `image/webp` 时用来指定图片展示质量。如果这个参数的值不在指定类型与范围之内，则使用默认值(0.92)。

#### 示例
这里将`canvas`元素转为`blob`对象，由于`blob`对象无法直接作为`img`元素的`src`属性使用,所以要使用[URL.createObjectURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static)方法处理成一个`URL`对象作为`img`的`src`属性使用,最后使用**revokeObjectURL**释放掉已经创建的`URL`对象。
```javascript
const canvas = document.getElementById('canvas')

canvas.toBlob((blob) => {
  const newImg = document.createElement('img')
  const url = URL.createObjectURL(blob)

  newImg.onload = () => URL.revokeObjectURL(url)

  newImg.src = url
  document.body.appendChild(newImg)
})
```

### [toDataURL](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL)
返回一个[data URI](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)
#### 语法
```javascript
canvas.toDataURL(type, encoderOptions);
```
#### 参数
##### type(可选)

指定图片格式，默认格式为 `image/png` 也可以为`image/webp`(safari不支持webp格式)。

##### encoderOptions(可选)

在指定图片格式为 image/jpeg 或 image/webp 的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92.

#### 示例
```javascript
<canvas id="canvas" width="5" height="5"></canvas>

const canvas = document.getElementById("canvas");
const dataURL = canvas.toDataURL();
console.log(dataURL);
//"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"
```
### toBlob与toDataURL的区别
:::info
1. 输出格式`toBlob`返回的是`Blob`对象,而`toDataURL`是`Data URL`也就是`base64`编码的字符串.
2. `toBlob`需要在他的回调函数里面拿到`Blob`数据进行操作(适用于需要处理二进制数据的情况,比如上传到服务器),`toDataURL`是同步的可以直接使用返回的`dataURL`(适用于直接在浏览器中显示图像或保存图像到本地).
:::
