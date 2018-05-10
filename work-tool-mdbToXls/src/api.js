const yargs = require('yargs').argv
// cmd option

yargs.file = yargs.file || 'SpiderResult'
yargs.src = yargs.src || './src/'
yargs.dist = yargs.dist || `./data/`

const api = {
  mdb: `./mdb/${yargs.file}.mdb`,
  dist: `${yargs.dist}`,
  html: {
    main: [],
    vice: []
  }
}

module.exports = api