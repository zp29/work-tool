<<<<<<< HEAD
const yargs = require('yargs').argv
// cmd option

yargs.file = yargs.file || 'test'
yargs.src = yargs.src || './src/'
yargs.dist = yargs.dist || `./data/`

const file = []
for(let v of yargs.file.split(',')){
  file.push(`./mdb/${v}.db3`)
}

const mdbFile = yargs.db3 ? file : file

const api = {
  mdb: mdbFile,
  dist: `${yargs.dist}`,
  html: {
    main: [],
    vice: []
  }
}

=======
<<<<<<< HEAD
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

=======
const yargs = require('yargs').argv
// cmd option

yargs.file = yargs.file || 'test'
yargs.src = yargs.src || './src/'
yargs.dist = yargs.dist || `./data/`

const mdbFile = yargs.db3 ? `./mdb/${yargs.file}.db3`  : `./mdb/${yargs.file}.mdb`

const api = {
  mdb: mdbFile,
  dist: `${yargs.dist}`,
  html: {
    main: [],
    vice: []
  }
}

>>>>>>> 10c34e1a8e37625a3dc7a0397f2e8341bf296fe5
>>>>>>> cb34bfdb4cf6e40dcb83e011d437bcd2925105a9
module.exports = api