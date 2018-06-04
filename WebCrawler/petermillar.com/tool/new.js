const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')

// const url = "https://www.petermillar.com/c/mens"
// const url = "https://www.petermillar.com/c/womens"
const url = "https://www.petermillar.com/c/golf-clothing"
const fileName = []

superagent.get(url).end(function(err, res) {

  if (err) { return Error(err); }

  let $ = cheerio.load(res.text);

  // console.log($.html())
  // console.log( $('.lego-embed-block a') );
  let arr = $('.lego-embed-block a')

  // console.log( arr );

  for (var i = 0; i < arr.length; i++) {
    if ( arr[i] !== 'sale/mens-sale' ) {
      fileName.push(arr[i].attribs.href.replace('https://www.petermillar.com/c/', '').replace('/c/', '').replace('/','-')) 
    }
    // console.log( arr[i].attribs.href.replace('https://www.petermillar.com/c/','').replace('/c/','') 
  }
  // console.log(fileName);
  // Arr
  for (var i = 0; i < fileName.length; i++) {
    var newFileName = fileName[i]
    if ( fs.existsSync(`./html/${fileName[i]}.html`) ) {
      console.log(`${fileName[i]} 创建过...`);
    }else {
      console.log(`${fileName[i]} 创建中...`);
      let html = `
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="utf-8">
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <meta name='viewport' content='width=device-width, initial-scale=1'>
  <title>${fileName[i]}</title>
  <meta name="keywords" content="your keywords">
  <meta name="description" content="your description">
  <link rel="shortcut icon" type="image/ico" href="/favicon.ico">
</head>
<body>

</body>
</html>
`
      fs.appendFileSync(`./html/${fileName[i]}.html`, html, 'utf8');
    }
  }
  console.log('end');

})