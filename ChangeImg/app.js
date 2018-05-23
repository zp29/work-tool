
const sharp = require('sharp')

sharp('./img/wallhaven-460536.png')
  .resize(600, 600)
  .toFile('output.jog', (err, info) =>{
    err || console.log(errr)
    console.log(info)
  })
