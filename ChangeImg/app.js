
const gm = require('gm')
const fs = require('fs')

gm('./img/wallhaven-460536.png')
  .resize(240, 240, '!')
  .write('./img/test.png', function (err) {
    if (!err) console.log('ok');
  });