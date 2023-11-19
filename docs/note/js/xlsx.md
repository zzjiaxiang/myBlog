---
id: xlsx
title: 利用xlsx进行表格导入导出
tags: [xlsx]
keywords: [前端, 表格导出, 表格导入, xlsx]
description: 前端利用xlsx进行表格数据的导入导出
last_update:
  date: 11/20/2023
  author: ZhangJiaxiang
---

对于有着大量数据的表格导出导入操作,应交给服务端进行处理.  
这里简单记录下前端利用 [xlsx](https://www.npmjs.com/package/xlsx) 进行表格数据的导入导出的基本操作.

首先在项目里面安装依赖.
```
npm install xlsx
```
在需要使用的文件里引入.
```javascript
import * as XLSX from 'xlsx/xlsx.mjs'
```
## [导出](https://docs.sheetjs.com/docs/getting-started/examples/export)

```javascript
/* 
data 
such as rows = [
  {
    name: '张三',
    age: 18,
    sex: '男',
  },
  {
    name: '李四',
    age: 19,
    sex: '女',
  },
]
*/
const rows = data
/* generate worksheet and workbook */
const worksheet = XLSX.utils.json_to_sheet(rows)
const workbook = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(workbook, worksheet, 'Dates')

/* fix headers */
XLSX.utils.sheet_add_aoa(worksheet, [['name', 'age', 'sex']], {
  origin: 'A1',
})

/* calculate column width */
const maxWidth = rows.reduce((w, r) => Math.max(w, r.length), 10)
worksheet['!cols'] = [{ wch: maxWidth }]

/* create an XLSX file and try to save to Presidents.xlsx */
XLSX.writeFile(workbook, 'Presidents.xlsx', { compression: true })
```

## [导入](https://docs.sheetjs.com/docs/getting-started/examples/import)

```javascript
importEvent({ target: { files } }) {
  if (files.length === 0) return
  const file = files[0]
  const reader = new FileReader()

  reader.onload = ({ target: { result } }) => {
    const workbook = XLSX.read(result)
    this.processWorkbook(workbook)
  }

  reader.readAsArrayBuffer(file)
}
processWorkbook(workbook) {
  // 假设你要读取第一个工作表
  const firstSheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[firstSheetName]
  // 转换为 JSON
  const json = XLSX.utils.sheet_to_json(worksheet)
  console.warn(json)
}
```
