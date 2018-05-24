
const gm = require('gm')
const fs = require('fs')

const list = fs.readdirSync('img/')

for( let v of list ){
  let path = `./img/${v}`
  v.indexOf('ZC37') !== -1 ? ChangSize(path, 1140, 597) : ''
  v.indexOf('ZC38') !== -1 ? ChangSize(path, 1140, 580) : ''
  v.indexOf('ZC36') !== -1 ? ChangSize(path, 1140, 446) : ''
  v.indexOf('ZC31') !== -1 ? ChangSize(path, 1200, 605) : ''
  v.indexOf('ZC18') !== -1 ? ChangSize(path, 1000, 556) : ''
  v.indexOf('ZC39') !== -1 ? ChangSize(path, 1519, 481) : ''
  v.indexOf('ZC29') !== -1 ? ChangSize(path, 982, 514) : ''
  v.indexOf('ZC33') !== -1 ? ChangSize(path, 990, 642) : ''
  v.indexOf('ZC32') !== -1 ? ChangSize(path, 1200, 446) : ''
  v.indexOf('ZC35') !== -1 ? ChangSize(path, 1519, 570) : ''
}

function ChangSize(path, width, height) {
  gm(path)
    .resize(width, height, '!')
    .write(path, function (err) {
      if ( err ) { console.log(`${path.replace('./img/','')} No !`); }
      if (!err) console.log(`${path.replace('./img/','')} -> OK !\n Width=${width}px Height=${height}px`)
    });
}
