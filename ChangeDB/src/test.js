var Excel = require('exceljs')
const ADODB = require('node-adodb')

// var start_time = new Date();
var workbook = new Excel.stream.xlsx.WorkbookWriter({
  filename: './test.xlsx'
});
var worksheet = workbook.addWorksheet('Sheet');

const connection = ADODB.open(`Provider=Microsoft.Jet.OLEDB.4.0;Data Source="./mdb/test.mdb"`)

let rowName = []

connection
  .query('SELECT * FROM Content')
  // databases ->  **Content** &&  DownloadFile
  .then(data => {
    console.log(data);

    for( let key in data[0] ){
      rowName.push({
        'header': key,
        'key': key
      })
      worksheet.columns = rowName
    }

    var length = data.length;

    // 当前进度
    // var current_num = 0;
    // var time_monit = 400;
    // var temp_time = Date.now();

    // console.log('开始添加数据');
    for(let i in data) {
      worksheet.addRow(data[i]).commit();
      current_num = i;
      // if(Date.now() - temp_time > time_monit) {
      //   temp_time = Date.now();
      //   console.log((current_num / length * 100).toFixed(2) + '%');
      // }
    }

    // console.log('添加数据完毕：', (Date.now() - start_time));
    workbook.commit();

    // var end_time = new Date();
    // var duration = end_time - start_time;

    // console.log('用时：' + duration);
    // console.log("程序执行完毕");

  })

