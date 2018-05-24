
const fs = require('fs')
const sql = require('sql.js')

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

  // let file = fs.readFileSync(data);
  // let db = new sql.Database(file);

  // let data = []
  // db.each('SELECT * FROM Content', function (row) {
  //   data.push(row)
  // });

  // return data;
}