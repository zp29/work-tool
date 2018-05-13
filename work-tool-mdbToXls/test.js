
// const ADODB = require('node-adodb')

// const connection = ADODB.open(`Provider=Microsoft.Jet.OLEDB.4.0;Data Source="./mdb/test.db3";`)



// connection
//   .query('SELECT * FROM Content')
//   .then(data => {
//     console.log(data);
//   }

var fs = require('fs');    
var sql = require('sql.js');
var bfr = fs.readFileSync('./mdb/test.db3');

var db = new sql.Database(bfr);
var data = []
db.each('SELECT * FROM Content', function (row) {

  data.push(row)

});
console.log(data);