const api = require('./api.js')
const colors = require('colors')
const fs = require('fs')
// cmd option packge

var Excel = require('exceljs')
// make xlsx data

const XLSX = require('xlsx')
// xlsx -> xls


/**
 * 生成 excel 文件吧！
 * @param  {Objct} data     res -> data
 * @param  {String} fileName 字符串
 * @return {none}          none
 */
exports.makeXls = ( data, fileName ) => {

  var workbook = new Excel.stream.xlsx.WorkbookWriter({
    filename: `./data/${fileName}`
  });
  var worksheet = workbook.addWorksheet('Sheet1');
  let rowName = []
  // Reset data

  for( let key in data[0] ){
    rowName.push({
      'header': key,
      'key': key
    })
    worksheet.columns = rowName
  }
  // Create Tab Header

  var length = data.length
  for(let i in data) {
    worksheet.addRow(data[i]).commit();
  }
  workbook.commit()
  console.log(` 创建 ${colors.cyan(fileName)} ${colors.green('成功！')} `);

}



/**
 * xlsx -> xls
 */
exports.filterXls= () => {


  const wb = XLSX.readFile(`${api.dist}data.xlsx`)
  const ws = wb.Sheets[wb.SheetNames[0]]
  // var old_name = wb.SheetNames[0], new_name = 'Sheet1'

  // /* change SheetNames */
  // wb.SheetNames[0] = new_name

  // /* change Sheets */
  // wb.Sheets[new_name] = wb.Sheets[old_name];
  // delete wb.Sheets[old_name];

  // /* delete col (new && url) */

  // /* save file */
  // XLSX.writeFileSync(wb, `${api.dist}NewData.xls`)
  // fs.unlinkSync(`${api.dist}data.xlsx`)
  // console.log(`Make ${api.dist}data.xlsx ${colors.green('End')}`);

}
