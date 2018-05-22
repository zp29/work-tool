
const api = require('./api.js')
const fs = require('fs')
const colors = require('colors')
/**
 * 将过滤好的数据拼成 .html
 */
exports.addHtml = () => {
  // 添加图片下载页面 .html
  fs.writeFile(`${api.dist}main.html`, api.html.main,  function(err) {
    if (err) { return console.log(`写入失败...${err}`); }
    fs.appendFile(`${api.dist}main.html`,'<a href=""><h1> 主图 </h1></a>' ,'utf8',function(err){  
    // Main.html 中添加 tip
      if(err){ console.log(err); }
      console.log(` 添加 ${api.dist}${colors.green('main.html')} ${colors.green('完成 !')} `);
    })
  }) 
  fs.writeFile(`${api.dist}vice.html`, api.html.vice,  function(err) {
     if (err) { return console.log(`写入失败...${err}`); }
     fs.appendFile(`${api.dist}vice.html`,'<a href=""><h1> 副图 </h1></a>' ,'utf8',function(err){ 
      // Vice.html 中添加 tip
         if(err){console.log(err); }
         console.log(` 添加 ${api.dist}${colors.green('vice.html')} ${colors.green('完成 !')} `);
     })
  })
  
}