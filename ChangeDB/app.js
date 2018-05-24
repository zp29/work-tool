const api = require('./src/api.js')
// 操作 api 对象
const ADODB = require('node-adodb')
// 读取 mdb 模块
var sql = require('sql.js');
// 读取 db3 file
const colors = require('colors')
const yargs = require('yargs').argv
const fs = require('fs')

const filter = require('./src/filter.js')
const html = require('./src/html.js')
const download = require('./src/download.js')
const xls = require('./src/xls.js')
const getData = require('./src/getdata.js')

 
// 打开 .mdb 文件

if ( yargs.start ) {
  if ( yargs.db3 ) {

    let data = getData.getDb3Data(api.mdb)
    for( let val of data ){
      filter.FilterDownloadHtml(val)
      filter.filterJsonXls(val)
    }
    html.addHtml()
    xls.makeXls(data, 'data.xlsx')

  }else {
  const connection = ADODB.open(`Provider=Microsoft.Jet.OLEDB.4.0;Data Source='${api.mdb}';`)
  connection
    .query('SELECT * FROM Content')
    .then(data => {
      console.log(` 链接数据库 -> ${colors.cyan(api.mdb)} ${colors.green('成功！')} `)
      for( let key of data ) {
        filter.FilterDownloadHtml(key)
        // 过滤下面页面 json
        filter.filterJsonXls(key)
        // 过滤excel json
      }
      console.log(' Json 数据过滤 完成！'.green);
      html.addHtml()
      // 创建 TM 的下载页面

      xls.makeXls(data, 'data.xlsx')
      // 创建 TM 的表

      xls.filterXls()
      // xlsx -> xls
    })
    .catch(error => { console.error(error); });
}} else {
  console.log(' No start !'.red);
}
if ( yargs.download ) {
  console.log('Download Imgs ...');
  download.download();
} else {
  console.log(`${colors.red('No')} AutoDownload Imgs ...`);
}
