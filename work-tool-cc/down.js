
const fs = require('fs')
const superagent = require('superagent')
const async = require('async')
let data = JSON.parse(fs.readFileSync('./data/fitflop.json'))

async.mapLimit(data, 4, (res, callback) => {

  superagent
    .get(res.main)
    .end((err, ress) => {
      if (err) {console.log(` 没有该图片 -> ${ress} `); }
      else {
        fs.writeFile(`./data/img-zp/${res.mainName}`, ress.body, function (err) {
          err ? console.log(err) : console.log(`${res.mainName} 保存一张！`);
        });
      }
    })

  let viceArr = res.vice.split('|')
  let nameArr = res.ViceName.split('|')
  let id = 0
  async.mapLimit(viceArr, viceArr.length, (vice, callback) => {
    superagent
      .get(vice)
      .end((err, ress) => {
        if (err) {
          console.log(` 没有该图片 -> ${nameArr[id]} `);
        }else{
          fs.writeFile(`./data/img-zp/${nameArr[id]}`, ress.body, function (err) {
            err ? console.log(err) : console.log(`${nameArr[id]} 保存一张！`);
            id++
            callback()
          })
        }
      })
  })
})






