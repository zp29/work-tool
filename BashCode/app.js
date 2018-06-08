#!/usr/bin/env node  

/* This is the garbage code I wrote */

/**
 * Time : 2018 - 5
 * By : zp-29
 */

const argv = require('yargs').argv
const {exec} = require('child_process')
const text = {
  // dist/ 新站 
  acom: [
    'birkensliden.site',
    'esflipflope.top',
    'eoooes.site',
    'selemonhairy.pw',
    'vansappropriate.pw',
    'vbiamachaussuresi.pw',
    'merrlchaussuresaa.site',
    'stivalimartln.pw',
    'hairstyleclub.pw  ',
    'esbirkene.top',
    'frflipflope.site',
    'ecoonz.site',
    'selomanready.pw',
    'vansrepresented.pw',
    'vbiamcchaussuresz.site',
    'merrlesshoesv.site',
    'martinscarpe.pw',
    'perfect-hair.pw',
  ],
  ip: [
    '107.160.251.74',
    '107.160.251.90',
    '107.160.227.10',
    '107.160.67.94',
    '107.160.109.30',
    '107.160.135.94',
    '107.160.145.62',
    '107.160.210.158',
    '107.160.223.14',
    '107.160.251.75',
    '107.160.251.91',
    '107.160.227.11',
    '107.160.251.76',
    '107.160.251.92',
    '107.160.227.12',
    '107.160.251.77',
    '107.160.251.93',
    '107.160.227.13',
  ],
  // src/ 数据站
  bcom: [
    'vanseligible.pw',
    'vbemrashoesa.site',
    'merrlesshoesc.top',
    'martinboutique.top',
    'ghdnew.top',
    'birkenslidem.pw',
    'sflipflopa.top',
    'eoocflats.site',
    'selomanwilling.pw',
    'vbemrashoesa.site',
    'eoooes.site',
    'martinboutique.top',
    'ghdnew.top',
    'birkenslidem.pw',
    'sflipflopa.top',
    'eoocflats.site',
    'selomanwilling.pw',
    'vanseligible.pw',
  ],
  zc: [
    'ZC38',
    'ZC36',
    'ZC31',
    'ZC18', 
    'ZC39',
    'ZC29',
    'ZC32',
    'ZC35', 
    'ZC37',
    'ZC36',
    'ZC31',
    'ZC18', 
    'ZC39',
    'ZC29',
    'ZC32',
    'ZC35', 
    'ZC37',
    'ZC38',
  ]
}

let str = ''
if( argv.txt ){
  const passwd = 'TRwq*Aj9Pb'
  for(let key in text.acom){
  str += `${text.acom[key]}
  ${text.ip[key]}\n`
  // str += `$('.layui-form-item').eq(0).find('input').val('${text.acom[key]}') $('.layui-collapse').find('.layui-colla-item').eq(2).find('input.layui-input').val('www.${text.acom[key]}') $('.layui-collapse').find('.layui-colla-item').eq(8).find('.layui-input.layui-unselect ').eq(1).val('${text.ip[key]}') $('.layui-btn.layui-btn-small').eq(2).submit() \n\n`
  }
  str += `
    let urls = ${text.acom}
    let ip = ${text.ip}
    let id = 0
    let times = setInterval(() => {
      $('.layui-form-item').eq(0).find('input').val(\`\${urls[id]}\`)
      $('.layui-collapse').find('.layui-colla-item').eq(2).find('input.layui-input').val(\`www.\${urls[id]}\`)
      $('.layui-collapse').find('.layui-colla-item').eq(8).find('select').eq(1).find(\`option[value="\${ip[id]}"]\`).attr("selected",true)
      $('.layui-btn.layui-btn-small').eq(2).submit()
      console.log(\`\${urls[id]} Create OK\`)
      if ( id === urls.length ) {
        clearInterval(times);
      }
      id ++
    }, 2000)
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
    path = path.replace('ZC37', 'marqet/images/slideshow/')
    path = path.replace('ZC38', 'magnus/images/slideshow/')
    path = path.replace('ZC36', 'edify/images/slideshow/')
    path = path.replace('ZC18', 'zc18/images/banner/')
    path = path.replace('ZC31', 'zc18/images/')
    path = path.replace('ZC39', 'bohase/images/slideshow/')
    path = path.replace('ZC29', 'zc18/images/')
    path = path.replace('ZC32', 'zc18/images/')
    path = path.replace('ZC35', 'zenshoppe/images/slideshow/')
    str += `/www/web/${text.acom[key].replace('.','_')}/public_html/includes/templates/${path}\n`
  }
  console.log(str);
  exec('clip').stdin.end(str);

}else {

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
