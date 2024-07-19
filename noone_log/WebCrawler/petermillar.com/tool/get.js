
const superagent = require('superagent')
const cheerio = require('cheerio')

let link = 'https://www.petermillar.com/products/MS18RD03DRLT/Summer-Soft-Twill'

superagent.get(`${link}`).end(function(err, res) {
  if ( err ) { console.error(`没有找到，${link}`); }
  if ( res ) {
    let $ = cheerio.load( res.text );
    // data.link.push( link )
    // data.title.push( $('.title h1').text() )
    // data.Price.push( $('.price .wholesaler-strike-through')[0].innerHTML )
    // data.Desc.push( $('.tab-pane.active')[0].innerHTML )
    // data.Class.push( ClassName )
    // data.mainImg.push( $('.span7 img') )
    // console.log( $('.span7 img').attr('src') );
    // let mainImg = $('.span7 img').attr('src')
    // console.log( addImgAlt(mainImg) );
    console.log( SizeVal(ClassName) );
  }
})

function addImgAlt( url ) {
  let arr = ['_ALT_A_CF','_ALT_B_CF','_ALT_A','_ALT_Z']
  let imgsArr = []
  for( let val of arr ){
    let addStr = url.split('/').reverse()[0].split('.')[0] + `${val}.500w.jpg`
    let DelStr = url.split('/').pop()
    imgsArr.push( url.replace(`${DelStr}`, `${addStr}`).replace('//image-cdn.symphonycommerce.com','https://image-cdn.symphonycommerce.com') )
  }
  return imgsArr
}


function SizeVal( ClassName ) {
  console.log(ClassName);
}

