
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
}