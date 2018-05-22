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

module.exports = api