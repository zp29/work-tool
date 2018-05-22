
# Node.js Data-acquisition

```bash

  npm i
  // 安装依赖
  
  node app.js
  // mdb -> xls

  node app.js --download 
  // mdb -> xls 自动下载图片

  node app.js --file="FileName.mdb"
  // point a .mdb file

```

### 功能

- mdb 转 json

  > node-adodb

- json 转 xls

  > exceljs
  >
  > <!--json2-xls--> 不支持大数据，很尴尬。

- 批量下载图片

  > async+ fs 异步下载

- 生成时间戳图片

  > Excel数据跟随改变
  > 还在更新.


### 采集数据名称规则

1. 中文
   1. 标题
   2. 分类
   3. 价格 ||  原价&&现价
   4. 主图
   5. 详细图
   6. 属性
   7. 描述
2. 英文
   1. Title
   2. class
   3. Price || oldPirce&&newPrice
   4. Main
   5. Vice
   6. Attr
   7. desc

> 目前还在更新.

`zp.mdzz@gmail.com`

`zp-29`
