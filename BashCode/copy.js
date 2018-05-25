
/* This is the garbage code I wrote */


/**
 * Time : 2018 - 5
 * By : zp-29
 */

const argv = require('yargs').argv
const {exec} = require('child_process')

const text = {
  // dist/ 待上线网站
  acom: [
    'mereltrainershoes.pw',
    'merhikingshoes.pw',
    'merrashoesf.pw',
    'mellrwalkshoess.pw',
    'merallshoesq.top',
    'merraloutshoes.top',
    'mellrwalkshoese.top',
    'vibmfiveshoesa.top',
    'vibmfiveshoesfv.top',
    'vibmfinsneakersrt.top',
    'vbrmtrainersshoes.top',
    'vibsneakers.top',
    'vrbmfinshoesa.top',
    'vrbmfershoesc.top',
    'vbemfershoesu.top',
    'demartinal.top',
    'eumartin.pw',
    'ermartenal.top',
    'frmartin.pw',
    'ismartim.site',
    'lemartin.pw',
    'oamartina.top',
    'goodhair.site',
    'astraightener.top',
    'straightenerghde.top',
    'urstraightener.top',
    'ironalltin.site'
  ],
  ip: [
    '185.212.172.226',
    '185.212.172.228',
    '185.212.172.230',
    '185.212.172.232',
    '185.212.172.234',
    '185.212.172.236',
    '185.212.172.238',
    '185.212.172.227',
    '185.212.172.229',
    '185.212.172.231',
    '185.212.172.233',
    '185.212.172.235',
    '185.212.172.237',
    '185.212.172.239',
    '185.212.172.240',
    '185.212.172.241',
    '185.212.172.243',
    '185.212.172.245',
    '185.212.172.247',
    '185.212.172.249',
    '185.212.172.251',
    '185.212.172.253',
    '185.212.172.242',
    '185.212.172.244',
    '185.212.172.246',
    '185.212.172.248',
    '185.212.172.250'
  ],
  // src/ 数据网站
  bcom: [
    'solomencd.pw',
    'akmartin.pw',
    'adstrialo.site',
    'camartins.top',
    'martasian.site',
    'cimartin.pw',
    'solemenvery.pw',
    'camartins.top',
    'martasian.site',
    'cimartin.pw',
    'solemenvery.pw',
    'solomencd.pw',
    'ecoosandals.top',
    'akmartin.pw',
    'martasian.site',
    'solemenvery.pw',
    'akmartin.pw',
    'solomencd.pw',
    'cimartin.pw',
    'akmartin.pw',
    'martasian.site',
    'solomencd.pw',
    'martasian.site',
    'cimartin.pw',
    'solemenvery.pw',
    'martasian.site',
    'akmartin.pw'
  ],
  zc: [
    'ZC31',
    'ZC18',
    'ZC35',
    'ZC36',
    'ZC37',
    'ZC38',
    'ZC39',
    'ZC36',
    'ZC37',
    'ZC38',
    'ZC39',
    'ZC31',
    'ZC32',
    'ZC18',
    'ZC37',
    'ZC39',
    'ZC18',
    'ZC31',
    'ZC38',
    'ZC18',
    'ZC37',
    'ZC31',
    'ZC37',
    'ZC38',
    'ZC39',
    'ZC37',
    'ZC18'
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
    str += `node copy --a='${text.bcom[key]}' --b='${text.acom[key]}' --ap='${passwd}' \n`
  }
  str += `------***------\n`
  for(let v of text.acom){
    str += `/www/web/${v.replace('.','_')}/public_html/tempEP \n`
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
