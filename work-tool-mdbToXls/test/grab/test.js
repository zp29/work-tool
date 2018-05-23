
// const express = require('express')
// const app = express()
const superagent = require('superagent')
const cheerio = require('cheerio')
// package

const api = {
  url: 'https://shop.lululemon.com/p/women-tanks/Brunswick-Muscle-Tank',
  // 爬取url
  xls: {
    id: 1,
    // id
    title: '',
    // 标题
    price: '',
    // 价格
    desc: '',
    // 描述
    attr: '',
    // 属性
    class: '',
    // 类别
    mainImg: '',
    viceImg: [],
    // 主图 && 详细图
    link: ''
    // url
  },
}

// app.get('/', (req, res, next) => {
  superagent.get( api.url )
    .end( (err, ress) =>{
      if ( err ) { return console.log(err); }
      let $ = cheerio.load(ress.text)
      console.log( $.text );
      // api.xls.title = $('#productInfo').find('h1').html()
      // console.log( api.xls.title )
    })

// })
// app.listen(2929, ()=> {
//   console.log('http://127.0.0.1:2929 Listening')
// })







