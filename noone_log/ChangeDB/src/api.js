const yargs = require('yargs').argv
// cmd option

yargs.file = yargs.file || 'test'
yargs.src = yargs.src || './src/'
yargs.dist = yargs.dist || `./data/`

const file = []


if( yargs.file.toString().indexOf(',') == '-1' ){
  yargs.db3 ? file.push(`./mdb/${yargs.file}.db3`) : file.push(`./mdb/${yargs.file}.mdb`)
}else{
  for(let v of yargs.file.split(',')){
    yargs.db3 ? file.push(`./mdb/${v}.db3`) : file.push(`./mdb/${v}.mdb`)
  }
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

module.exports = api