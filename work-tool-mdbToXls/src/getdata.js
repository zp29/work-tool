
const fs = require('fs')
const sql = require('sql.js')
const async = require('async')

const api = require('./api.js')

exports.getDb3Data = () => {
  let data = new Array()
  async.mapLimit( api.mdb, 1, (name, callback)=>{
    let db = new sql.Database( fs.readFileSync(name) );
    db.each('SELECT * FROM Content', function (row) {
      data.push(row)
    });
    callback()
  })
  return data;
}