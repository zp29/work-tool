
const colors = require('colors')
const async = require('async')

const fs = require('fs')
const cheerio = require('cheerio')
const superagent  = require('superagent')

/**
 * 自动下载图片...
 */
exports.download= () => {
  let mainHtml = fs.readFileSync('./data/main.html', 'utf8')
  let $ = cheerio.load(mainHtml)
  let mainEl  = $('a')
  async.mapLimit(mainEl, 4, (res, callback) => {
    const url = res.attribs.href
    const MainName = url.split('/').pop().trim()
    const Mainpath = './data/img/' + MainName
    superagent
      .get(url)
      .end((err, ress) => {
        if (err) {console.log(` 没有该图片 -> ${colors.red(ress)} `); }
        else {
          fs.writeFile(Mainpath, ress.body, function (err) {
            err ? console.log(err) : console.log(`${MainName} 保存一张！`);
            callback()
          });
        }
      })
  })

  let viceHtml = fs.readFileSync('./data/vice.html', 'utf8')
  let $$ = cheerio.load(viceHtml)
  let viceEl  = $$('a')
  async.mapLimit(viceEl, 4, (res, callback) => {
    const url = res.attribs.href
    for( let v of url.split('|') ){
      const ViceName = v.split('/').pop().trim()
      const Vicepath = './data/img/' + ViceName
      superagent
        .get(v)
        .end( (err, ress) => {
          if (err) { console.log(`  没有图片 -> ${colors.red(ress)} `); }
          else {
            fs.writeFile(Vicepath, ress.body, function (err) {
                err ? console.log(err) : console.log(`${ViceName} 保存一张！`);
                callback()
            });
          }
        })
    }
  })
}

