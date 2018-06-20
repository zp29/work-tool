#!/usr/bin/env node  

/* This is the garbage code I wrote */

/**
 * Time : 2018 - 5
 * By : zp-29
 */

const superagent = require('superagent')
require('superagent-charset')(superagent)
const cheerio = require('cheerio')
const api = 'http://us.2kz.net/'

const argv = require('yargs').argv
const {exec} = require('child_process')
const text = {
  // dist/ 新站 
  acom: [
    'sclomankey.pw',
    'sclomanprime.pw',
    'selamanfit.pw',
    'selomanli.pw',
    'selemonimportant.pw',
    'salomanlegal.pw',
    'selamansoft.pw',
    'salomanhardcore.pw',
    'vbiamgscarpav.pw',
    'virmtrailshoesaf.top',
    'virmtrailshoesad.site',
    'vbemrashoesl.site',
    'vbemrashoese.top',
    'myflipflope.top',
    'phflipflope.site',
    'dflipflope.site',
    'phflipflope.top',
    'ukflipflops.pw',
    'ecoonz.top',
    'eoocie.top',
    'ecocdk.top',
    'eocodk.site',
    'eccoes.site',
  ],
  ip: [
    '162.209.230.130',
    '162.209.230.131',
    '162.209.230.132',
    '162.209.230.133',
    '162.209.230.134',
    '162.209.230.135',
    '162.209.230.136',
    '162.209.230.137',
    '162.209.230.166',
    '162.209.230.167',
    '162.209.230.168',
    '162.209.230.169',
    '162.209.230.170',
    '162.209.229.171',
    '162.209.229.172',
    '162.209.229.173',
    '162.209.229.174',
    '162.209.229.175',
    '172.247.60.7',
    '172.247.60.8',
    '172.247.60.9',
    '172.247.60.10',
    '172.247.60.11',
  ],
  // src/ 数据站
  bcom: [
    'aflipflopa.site',
    'eoocsandals.pw',
    'solomanmini.pw',
    'vansstable.pw',
    'bottevente.xyz',
    'ghdlisseur.pw',
    'martinsclub.top',
    'plaqueghd.top',
    'aflipflopa.site',
    'eoocsandals.pw',
    'solomanmini.pw',
    'vansstable.pw',
    'bottevente.xyz',
    'aflipflopa.site',
    'eoocsandals.pw',
    'solomanmini.pw',
    'vansstable.pw',
    'bottevente.xyz',
    'ghdlisseur.pw',
    'martinsclub.top',
    'plaqueghd.top',
    'aflipflopa.site',
    'eoocsandals.pw',
  ],
  zc: [
    'ZC18', 
    'ZC39',
    'ZC29',
    'ZC32',
    'ZC35', 
    'ZC37',
    'ZC38',
    'ZC36',
    'ZC18', 
    'ZC39',
    'ZC29',
    'ZC32',
    'ZC35', 
    'ZC18', 
    'ZC39',
    'ZC29',
    'ZC32',
    'ZC35', 
    'ZC37',
    'ZC38',
    'ZC36',
    'ZC18', 
    'ZC39',
  ]
}
let str = ''

if ( argv.dns ) {
  // $('.input.input-select').eq(1).find('option[value="US"]').attr("selected",true)
  // $('.input.input-select').eq(0).find('option[value="3526"]').attr("selected",true)
  // $(".required.input.toggleElement.irtp-enabled").val('name.')
  // $("textarea").val('addr.')
  // $('input[name="city"]').eq(0).val('city')
  // $('input[name="bash"]').eq(0).val('bash')
  // $('input[name="telnocc"]').eq(0).val('tel 1')
  // $('input[name="telno"]').eq(0).val('tel 2')
  superagent
    .get(api)
    .charset('gbk')
    .end((err, res)=>{
      // err | console.log(err)
      let html = res.text
      let $ = cheerio.load(html, {decodeEntities: false})
      let arr = $('table td').eq(0).text().replace(/[\u4e00-\u9fa5]/g, '').replace(/\：/g,'|').split('|')
      str += `$('.input.input-select').eq(1).find('option[value="US"]').attr("selected",true);`
      str += `$('.input.input-select').eq(0).find('option[value="3526"]').attr("selected",true);`
      console.log( 'name -> ', arr[1] )
      str += `$(".required.input.toggleElement.irtp-enabled").val('${arr[1]}');`
      // name
      console.log( 'addr -> ', arr[2] )
      str += `$("textarea").val('${arr[2]}');`
      // addr
      console.log( 'city -> ', arr[3] )
      str += `$('input[name="city"]').eq(0).val('${arr[3]}');`
      // city
      console.log( 'bash -> ', arr[6] )
      str += `$('input[name="zip"]').eq(0).val('${arr[6]}');`
      // city bash
      console.log( 'tel 1 -> ', arr[7].split('.')[0].replace('+','') )
      str += `$('input[name="telnocc"]').eq(0).val('${arr[7].split('.')[0].replace('+','')}');`
      console.log( 'tel 2 -> ', arr[7].split('.')[1] )
      str += `$('input[name="telno"]').eq(0).val('${arr[7].split('.')[1]}');`
      // tel
      console.log(str)
      exec('clip').stdin.end(str);
    })
}
if( argv.txt ){
  const passwd = 'TRwq*Aj9Pb'
  for(let key in text.acom){
    str += `${text.acom[key]}\n ${text.ip[key]}\n`
    // str += `$('.layui-form-item').eq(0).find('input').val('${text.acom[key]}') $('.layui-collapse').find('.layui-colla-item').eq(2).find('input.layui-input').val('www.${text.acom[key]}') $('.layui-collapse').find('.layui-colla-item').eq(8).find('.layui-input.layui-unselect ').eq(1).val('${text.ip[key]}') $('.layui-btn.layui-btn-small').eq(2).submit() \n\n`
  }
  str += `
let urls = ['aaa.com','bbb.com']
let ip = ['1.1.1.1','2.2.2.2']
let id = 0
let times = setInterval(() => {
  $('.layui-form-item').eq(0).find('input').val(\`\${urls[id]}\`)
  $('.layui-collapse').find('.layui-colla-item').eq(2).find('input.layui-input').val(\`www.\${urls[id]}\`)
  $('.layui-collapse').find('.layui-colla-item').eq(8).find('select').eq(1).find(\`option[value="\${ip[id]}"]\`).attr("selected",true)
  $('.layui-btn.layui-btn-small').eq(2).submit()
  console.log(\`\${urls[id]} Create OK\`)
  if ( id === urls.length-1 ) {
    clearInterval(times);
    console.log('ok');
  }
  id ++
}, 2000)
// 填写 urls && ip 值
// 打开 ip:8080/site/add
// f12 ->  Console
// 复制以上代码 -> Enter
  `
  str += `------***------\n`
  for(let v of text.acom){
    str += `${v.slice(0, v.indexOf('.'))}\n`
  }
  str += `------***------\n`
  for(let key in text.acom){
    str += `whbostcopy --a='${text.bcom[key]}' --b='${text.acom[key]}' --ap='${passwd}'\n`
  }
  str += `------***------\n`
  for(let v of text.acom){
    str += `/www/web/${v.replace('.','_')}/public_html/tempEP/\n`
  }
  str += `------***------\n`
  for(let key in text.acom){
    let path = text.zc[key]
    path = path.replace('zc37', 'marqet/images/slideshow/')
    path = path.replace('ZC37', 'marqet/images/slideshow/')
    path = path.replace('zc38', 'magnus/images/slideshow/')
    path = path.replace('ZC38', 'magnus/images/slideshow/')
    path = path.replace('zc36', 'edify/images/slideshow/')
    path = path.replace('ZC36', 'edify/images/slideshow/')
    path = path.replace('zc18', 'zc18/images/banner/')
    path = path.replace('ZC18', 'zc18/images/banner/')
    path = path.replace('zc31', 'zc18/images/')
    path = path.replace('ZC31', 'zc18/images/')
    path = path.replace('zc39', 'bohase/images/slideshow/')
    path = path.replace('ZC39', 'bohase/images/slideshow/')
    path = path.replace('zc29', 'zc18/images/')
    path = path.replace('ZC29', 'zc18/images/')
    path = path.replace('zc32', 'zc18/images/')
    path = path.replace('ZC32', 'zc18/images/')
    path = path.replace('zc35', 'zenshoppe/images/slideshow/')
    path = path.replace('ZC35', 'zenshoppe/images/slideshow/')
    str += `/www/web/${text.acom[key].replace('.','_')}/public_html/includes/templates/${path}\n`
  }
  console.log(str);
  exec('clip').stdin.end(str);

}else if(!argv.dns){

const aHeaderName = argv.a.slice(0, argv.a.indexOf('.'))
const aFooterName = argv.a.slice(argv.a.indexOf('.')+1, argv.a.length)

const bHeaderName = argv.b.slice(0, argv.b.indexOf('.'))
const bFooterName = argv.b.slice(argv.b.indexOf('.')+1, argv.b.length)

const aDBanem = argv.adb || aHeaderName.replace('-','_')
const bDBanem = argv.bdb || bHeaderName.replace('-','_')


const aPasswd = argv.ap
const bPasswd = argv.bp || argv.ap

if( argv.bat ){
  // 打包
  str = `cd /www/web/${aHeaderName}_${aFooterName}/public_html && 
  rm -rf *.sql *.gz && 
  tar -zcvf ${argv.a}.gz * .[!.]* && 
  mysqldump -u root -p${aPasswd} ${aDBanem}>${argv.a}.sql && 
  sz ${argv.a}.* && 
  rm -rf *.sql *.gz 
  `
}else if( argv.batIn ){
  // 包 入库
  str = `mv /home/${argv.a}.* /www/web/${aHeaderName}_${aFooterName}/public_html
  cd /www/web/${bHeaderName}_${bFooterName}/public_html && 
  rm -rf *.sql *.gz index.html && 
  mysql -u root -p${bPasswd} ${bDBanem}<${argv.a}.sql && 
  tar -zxvf ${argv.a}.gz && 
  rm -rf *.sql *.gz && 
  sed -i 's/${argv.a}/${argv.b}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/.htaccess && 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php && 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php && 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php && 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php
  `
}
else if( argv.export ){
  // 导出 
  str = `cd /www/web/${aHeaderName}_${aFooterName}/public_html && 
  rm -rf *.sql *.gz && 
  tar -zcvf zc.gz * .[!.]* && 
  mysqldump -u root -p${aPasswd} ${aDBanem}>zc.sql
  `
}else if( argv.import ){
  // 导入
  str = `cd /www/web/${bHeaderName}_${bFooterName}/public_html && 
  rm -rf *.sql *.gz index.html && 
  wget http://www.${aHeaderName}.${aFooterName}/zc.gz && 
  wget http://www.${aHeaderName}.${aFooterName}/zc.sql && 
  mysql -u root -p${bPasswd} ${bDBanem}<zc.sql && 
  tar -zxvf zc.gz && 
  rm -rf *.sql *.gz && 
  sed -i 's/${argv.a}/${argv.b}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/.htaccess && 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php && 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php && 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php && 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php
  `
}else if ( aPasswd == bPasswd ){
  // aaa.com ->  bbb.com  跳转站  同服务器
  str = `
  cd /www/web/${aHeaderName}_${aFooterName}/public_html && 
  rm -rf *.sql *.gz && 
  tar -zcvf zc.gz ./* && 
  cp -f zc.gz .htaccess /www/web/${bHeaderName}_${bFooterName}/public_html && 
  mysqldump -u root -p${aPasswd} ${aDBanem}>zc.sql && 
  mysql -u root -p${bPasswd} ${bDBanem}<zc.sql && 
  rm -rf *.sql *.gz && 
  cd /www/web/${bHeaderName}_${bFooterName}/public_html && 
  rm -rf errpage/ index.html && 
  tar -zxvf zc.gz && 
  rm -rf zc.gz && 
  sed -i 's/${argv.a}/${argv.b}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/.htaccess && 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php && 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php && 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php && 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php
  `
}
  exec('clip').stdin.end(str.replace(/\n/g, ''));
}

// console.log(  );
