
const fs = require('fs')
const sql = require('sql.js')
const ADODB = require('node-adodb')
// 读取 mdb 模块
const api = require('./api.js')

exports.getDb3Data = (data) => {
  let jsonData = []
  for(let file of data){
    let db = new sql.Database(fs.readFileSync(file))
    db.each('SELECT * FROM Content', function (row) {
      jsonData.push(row)
    })
  }
  return jsonData
}

exports.getMDB = (files, callback) => {
  let newData = []
  for(let key in files){
    let connection = ADODB.open(`Provider=Microsoft.Jet.OLEDB.4.0;Data Source='${files[key]}';`)
    connection
      .query('SELECT * FROM Content')
      .then((data) => {
        for(let v of data){ newData.push(v) }
        if ( key == files.length-1 ) {
          callback(newData)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
}