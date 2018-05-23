<<<<<<< HEAD

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
=======

const fs = require('fs')
const sql = require('sql.js')

const api = require('./api.js')

exports.getDb3Data = () => {
  let file = fs.readFileSync(api.mdb);
  let db = new sql.Database(file);

  let data = []
  db.each('SELECT * FROM Content', function (row) {
    data.push(row)
  });
  return data;
>>>>>>> 10c34e1a8e37625a3dc7a0397f2e8341bf296fe5
}