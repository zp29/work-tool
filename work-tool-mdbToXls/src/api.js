const yargs = require('yargs').argv
// cmd option

yargs.file = yargs.file || 'test'
yargs.src = yargs.src || './src/'
yargs.dist = yargs.dist || `./data/`

const mdbFile = []

if( typeof(yargs.file) == 'number' ){
  mdbFile.push(yargs.db3 ? `./mdb/${yargs.file}.db3`  : `./mdb/${yargs.file}.mdb`)
}else{
  for( let name of yargs.file.split(',') ){
    mdbFile.push(yargs.db3 ? `./mdb/${name}.db3`  : `./mdb/${name}.mdb`)
  }
}




const api = {
  mdb: mdbFile,
  dist: `${yargs.dist}`,
  html: {
    main: [],
    vice: []
  }
}

module.exports = api