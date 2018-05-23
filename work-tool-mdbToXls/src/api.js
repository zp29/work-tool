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

module.exports = api