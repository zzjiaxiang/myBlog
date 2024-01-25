---
id: element-dialog
title: 原生弹窗dialog的使用
tags: [element-dialog]
keywords: [element-dialog, Element, dialog, '弹窗']
description: 原生弹窗dialog的使用
last_update:
  date: 1/25/2024
  author: ZhangJiaxiang
---

在遇到需要弹窗的场景,我们经常使用*element*,或者*ant-design*,里面封装的dialog组件.截止自 2022 年 3 月起所有的浏览器都已经支持原生的dialog元素,那么我们就可以使用原生的dialog元素,来实现弹窗功能.

## [原生弹窗dialog的使用](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)

在react中的简单使用

```jsx live
function Clock(props) {
  const dialogElement = useRef(null)

  function openDialogShowModal() {
    if (!dialogElement.current.open) {
      dialogElement.current.showModal()
    }
  }
  function openDialog() {
    if (!dialogElement.current.open) {
      dialogElement.current.show()
    }
  }
  function cancelDialog() {
    dialogElement.current.close()
  }
  return (
    <div>
      <dialog ref={dialogElement} open>
        <p>Greetings, one and all!</p>
        <form method="dialog">
          <button>OK</button>
          <button onClick={cancelDialog}>Cancel</button>
        </form>
      </dialog>

      <button onClick={openDialog}>Show dialog</button>
      <button onClick={openDialogShowModal}>Show dialog modal</button>
    </div>
  )
}
```

## 属性方法

可以通过**showModal**和**show**方法,可以打开.**close**方法关闭.

*dialog*也提供了一个**open**属性来控制它的打开状态,但是官方不建议我们通过切换**open**属性来控制*dialog*的打开状态.
