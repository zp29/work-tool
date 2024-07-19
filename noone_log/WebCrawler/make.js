
const Excel = require('exceljs')
const fs = require('fs')

fs.readFile('./data/fitflop.json', (err ,res) => {
  let data = JSON.parse(res)
   var workbook = new Excel.stream.xlsx.WorkbookWriter({
    filename: `./data/fitflop.xlsx`
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

  for(let i in data) {
    worksheet.addRow(data[i]).commit();
  }
  workbook.commit()
  console.log('fitflop.xlsx make ok!');

})
