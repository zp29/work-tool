
// 7z x 1.zip -r -o{name.header}/

// sed -i `s/2018/{name.header}\/2018/g` ./product.csv

var process = require('child_process')

process.exec('ls -a', (error, stdout, stderr) => {
  if ( error ) { console.log('error', error); }
  console.log( stdout );
});

