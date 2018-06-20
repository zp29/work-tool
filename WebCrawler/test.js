/*
* @Author: zp-29
* @Date:   2018-06-12 09:24:30
* @Last Modified by:   Administrator
* @Last Modified time: 2018-06-12 09:37:42
*/

const superagent = require('superagent')
require('superagent-charset')(superagent)
const cheerio = require('cheerio')
const api = 'http://us.2kz.net/'

superagent
  .get(api)
  .charset('gbk')
  .end((err, res)=>{
    err | console.log(err)
    console.log(res.text)
    let $ = cheerio.load(res.text)
    console.log($.html())
  })
