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
    'vibmfiveshoesfv.top',
    'merraloutshoes.top',
    'mellrwalkshoese.top',
    'vibmfinsneakersrt.top',
    'vibsneakers.top',
    'vrbmfinshoesa.top',
    'vbemfershoesu.top',
    'vrbmfershoesc.top',
  ],
  ip: [
    '107.160.67.82',
    '23.228.228.238',
    '23.228.230.30',
    '23.228.234.190',
    '23.228.236.238',
    '23.228.237.46',
    '23.228.239.110',
    '104.149.2.202',
  ],
  // src/ 数据站
  bcom: [
   'vibmfiveshoesfv.top',
   'merraloutshoes.top',
   'mellrwalkshoese.top',
   'vibmfinsneakersrt.top',
   'vibsneakers.top',
   'vrbmfinshoesa.top',
   'vbemfershoesu.top',
   'vrbmfershoesc.top',
  ],
  zc: [
    'ZC31',
    'ZC18',
    'ZC37',
    'ZC32',
    'ZC35',
    'ZC38',
    'ZC39',
    'ZC36',
  ]
}

let str = ''
if( argv.txt ){
  const passwd = 'TRwq*Aj9Pb'
  for(let key in text.acom){
  str += `${text.acom[key]}
  ${text.ip[key]}\n`
  }
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
