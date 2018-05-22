<<<<<<< HEAD

const argv = require('yargs').argv

const aHeaderName = argv.a.slice(0, argv.a.indexOf('.'))
const aFooterName = argv.a.slice(argv.a.indexOf('.')+1, argv.a.length)

const bHeaderName = argv.b.slice(0, argv.b.indexOf('.'))
const bFooterName = argv.b.slice(argv.b.indexOf('.')+1, argv.b.length)

const aPasswd = argv.ap
const bPasswd = argv.bp || argv.ap

const {exec} = require('child_process');

let str = ''
if ( aPasswd == bPasswd ) {
  str = `
  cd /www/web/${aHeaderName}_${aFooterName}/public_html && 
  rm -rf *.sql *.gz && 
  tar -zcvf zc.gz ./* && 
  cp -f zc.gz .htaccess /www/web/${bHeaderName}_${bFooterName}/public_html && 
  mysqldump -u root -p${aPasswd} ${aHeaderName}>zc.sql && 
  mysql -u root -p${bPasswd} ${bHeaderName}<zc.sql && 
  rm -rf *.sql *.gz && 
  cd /www/web/${bHeaderName}_${bFooterName}/public_html && 
  rm -rf errpage/ index.html && 
  tar -zxvf zc.gz && 
  rm -rf zc.gz && 
  sed -i 's/${argv.a}/${argv.b}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/.htaccess && 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php && 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php && 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php
  `
}else{
  
}

exec('clip').stdin.end(str.replace(/\n/g, ''));

// console.log(  );
=======

const argv = require('yargs').argv

const aHeaderName = argv.a.slice(0, argv.a.indexOf('.'))
const aFooterName = argv.a.slice(argv.a.indexOf('.')+1, argv.a.length)

const bHeaderName = argv.b.slice(0, argv.b.indexOf('.'))
const bFooterName = argv.b.slice(argv.b.indexOf('.')+1, argv.b.length)

const aDBanem = argv.adb || aHeaderName.replace('-','_')
const bDBanem = argv.bdb || bHeaderName.replace('-','_')

const aPasswd = argv.ap
const bPasswd = argv.bp || argv.ap

const {exec} = require('child_process');

let str = ''
if ( aPasswd == bPasswd ) {
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
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php || 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/includes/configure.php && 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i 's/${aHeaderName}/${bHeaderName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php && 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i 's/${aFooterName}/${bFooterName}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php && 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i '/DB_DATABASE/s/${aDBanem}/${bDBanem}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php && 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/whbost/includes/configure.php || 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/fly365/includes/configure.php || 
  sed -i 's/${aPasswd}/${bPasswd}/g' /www/web/${bHeaderName}_${bFooterName}/public_html/biubiu/includes/configure.php
  `
}else{
  
}

exec('clip').stdin.end(str.replace(/\n/g, ''));

// console.log(  );
>>>>>>> 529acc1e13f07d7b80c73dbc58233e5e75d54a1d
