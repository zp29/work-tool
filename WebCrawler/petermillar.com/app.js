const superagent = require('superagent')
const cheerio = require('cheerio')
const validUrl = require('valid-url')
const fs = require('fs')
const async = require("async")

const json2xls = require('json2xls')
const XLSX = require('xlsx')

const yargs = require('yargs').argv
const colors = require('colors')


const urlJson = 'json/url.json'
const api = {
  url: [],
  apiUrl: '',
  urlId: '',
  urlName: ''
}
const jsArr = []
let json = JSON.parse( fs.readFileSync(urlJson) )
let id = 0

for( let key in json ){
// let key = 'Men|Collections|Crown'
  async.mapLimit(json[key], 5, (link, callback) => {
    getContent(link, key, callback)
  }, (err, res) => {
    console.log(`\n${key} -->> ${colors.green('才跑完一个分类，可能还有下一个！')} `);
    if ( key == 'Men|Collections|Crown' ) {
    // Men|Collections|Crown
      console.log(`${colors.green('End !')}`)
      if ( yargs.download ) {
        console.log(`${colors.green('Dwonload Imgs !')}`)
        download(jsArr)
      }
      if ( yargs.xls ) {
        console.log(`${colors.green('Make Xls File !')}`)
        MakeXls(jsArr)
        filter('data.xlsx', 'data.xls')
      }
      if ( yargs.html ) {
        console.log(`${colors.green('Make Download .html File !')}`)
        addHtml(jsArr)
      }
      if ( yargs.json ) {
        console.log(`${colors.green('Make Json File !')}`)
        SaveJson(jsArr)
      }
      console.log(jsArr);
    }
  })
}

/**
 * get 请求入口
 * @param  {String.}   url       名字说明一切..
 * @param  {String}   ClassName url -> key -> 其实就是分类
 * @param  {Function} callback  Call! Call! Call!
 * @return {[Json]}             Json
 */
function getContent( url, ClassName, callback ) {
  let fetchStart = new Date().getTime()
  let link = url.replace('//www','https://www')
  superagent
    .get(link)
    .end( (err, res) => {
      if (err) { callback(` err ->, ${colors.red(link)} -> `); }
      if ( res ) {
        let time = new Date().getTime() - fetchStart
        let $ = cheerio.load(res.text)
        jsArr.push({
          'id': id++,
          'title': $('.title h1').text(),
          'Price': $('.price .wholesaler-strike-through').eq(0).text(),
          'Desc': $('.tab-pane.active').text().trim().replace(/[\r\n]/g,""),
          'Class': ClassName,
          'mainImg': $('.product-main-image.visible-phone.visible-tablet.hidden-desktop').attr('src').replace(/\/\/image-cdn/g,'http://image-cdn'),
          'viceImg': addImgAlt($('.product-main-image.visible-phone.visible-tablet.hidden-desktop').attr('src')),
          'link': link,
          'stux': 'new Date()'
        })
        console.log(`抓取 ${link} ${colors.green('成功')}，耗时 ${time / 1000} 秒`);
        callback(null, jsArr)
      }
    })
}

/**
 * 添加 Img -> src
 * @param {json} url json
 */
function addImgAlt(url) {
    let arr = ['_ALT_A_CF', '_ALT_B_CF', '_ALT_A', '_ALT_Z']
    let imgsArr = []
    for(let val of arr) {
        let addStr = url.split('/').reverse()[0].split('.')[0] + `${val}.500w.jpg`
        let DelStr = url.split('/').pop()
        if ( url.split('/').reverse()[0].split('.')[0].search(/[a-zA-Z]/) == -1 ) {
          imgsArr.push('')
        }else{
          imgsArr.push(url.replace(`${DelStr}`, `${addStr}`))
        }
    }
    return imgsArr.toString().replace(/\,/g,'|').replace(/\/\/image-cdn/g,'https://image-cdn')
}

/**
 * 保存 Json 文件
 * @param {json} data 产品数据
 */
function SaveJson(data){
  fs.appendFileSync(`json/data.json`, '', 'utf8');
  fs.appendFileSync(`json/data.json`, JSON.stringify(data), 'utf8');
}

/**
 * 创建 .xlsx && 过滤一些 http
 * @param {json} data 产品数据
 */
let newVice = ''
function MakeXls(data) {
  for( let val of data ){
    newVice = ''
    val.mainImg = val.mainImg.split('/').reverse()[0]
    for( let v of val.viceImg.split('|') ){
      if(v) {
        newVice += `${v.split('/').reverse()[0]}|`
      }
    }
    val.viceImg = newVice
  }

  let xls = json2xls(data)
  fs.writeFileSync('./json/data.xlsx', xls, 'binary')

  console.log(`${colors.green('Xls Filter End!')}`);

}

/**
 * 创建 .html -> 用于下载图片
 * @param {json} data 产品数据
 */
function addHtml(data) {
  this.Mainhtml = ''
  this.Vicehtml = ''
  for( let val of data ){
    this.Mainhtml += `<a href='${val.mainImg}\n'>img</a>`;
    for( let v of val.viceImg.split('|') ){
      this.Vicehtml += `<a href='${v}\n'>img</a>`;
    }
  }
  this.Mainhtml += `\n\n<h1>MainImg!</h1>`
  this.Vicehtml += `\n\n<h1>ViceImg!</h1>`

  fs.writeFileSync('./json/main.html', this.Mainhtml, 'utf8')
  fs.writeFileSync('./json/vice.html', this.Vicehtml, 'utf8')
}


/**
 * 过滤 xlsx 中不需要的数据 并保存为 xls
 * @param  {file} xlsx .xlsx 文件
 * @return {file}     new xls
 */
function filter(xls, newXls) {
  const wb = XLSX.readFile(`./json/${xls}`)
  const ws = wb.Sheets[wb.SheetNames[0]]
  var old_name = wb.SheetNames[0], new_name = 'Sheet1'

  /* change SheetNames */
  wb.SheetNames[0] = new_name

  /* change Sheets */
  wb.Sheets[new_name] = wb.Sheets[old_name];
  delete wb.Sheets[old_name];

  /* delete col (new && url) */

  /* save file */
  XLSX.writeFile(wb, `./json/${newXls}`)
  fs.unlinkSync(`./json/${xls}`);
}

/**
 * 自动下载 图片...
 * @param  {json} data 数据源
 * @return {file}      imgs
 */
function download(data) {
  async.mapLimit(data, 4, (res, callback) => {
    let id = 0
    // console.log( res.mainImg );
    // console.log( res.viceImg.split('|') );
    const MainName = res.mainImg.split('/').pop()
    superagent.get(res.mainImg).end( (err, ress) => {
      if (err) {console.log(err); }
      else {
        fs.writeFile(`./json/imgs/${MainName}`, ress.body, function (err) {
            err ? console.log(err) : console.log(`${MainName}保存一张`);
            callback()
        });
      }
    })
    const ViceName = res.viceImg.split('/').pop()
    for (let v of res.viceImg.split('|') ) {
      // console.log( v );
      superagent.get(v).end( (err, ress) => {
        if (err) { console.log(` ${ViceName} 没有图片 `); }
        else {
          fs.writeFile(`./json/imgs/${ViceName}`, ress.body, function (err) {
              err ? console.log(err) : console.log(`${ViceName}保存一张`);
          });
        }
      })
    }
  })
}