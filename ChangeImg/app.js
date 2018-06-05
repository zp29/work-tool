#!/usr/bin/env node

/**
 * 改变图片大小
 * time : 18 - 5
 */

const gm = require('gm')
const fs = require('fs')

const list = fs.readdirSync('img/')

for( let v of list ){
  // 判断文件名是否包含 `zc` 字样
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

/**
 *  改变图片大小
 * @param {String} path   原图片和保存图片路
 * @param {String} width  图片宽度
 * @param {String} height 图片高度
 */
function ChangSize(path, width, height) {
  gm(path)
    .resize(width, height, '!')
    .write(path, function (err) {
      if ( err ) { console.log(`${path.replace('./img/','')} No !`); }
      if (!err) console.log(`${path.replace('./img/','')} -> OK !\n Width=${width}px Height=${height}px`)
    });
}
