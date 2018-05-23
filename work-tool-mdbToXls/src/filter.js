
const api = require('./api.js')

// /**
//  * 过滤 .html before json
//  * @param {[type]} key [description]
//  */
exports.FilterDownloadHtml = (key) => {
    let main = key.主图 || key.Main || '', vice = key.详细图 || key.Vice || ''
    // 拿到中英文状态下数据 
    
    vice = vice.replace(/###/g, '|')
  
    if ( main && main.indexOf('?') != -1 ) {
      main = main.slice(0, main.indexOf('?'))
      let tempVice = ''
      for( let viceArr of vice.split('|') ){
        tempVice += viceArr && viceArr.slice(0, viceArr.indexOf('?')) + '|'
      }
      vice = tempVice.slice(0, tempVice.lastIndexOf('|'))
    }
    // 去除多余字符 ...

    main = !main.indexOf('https://') ? main.replace('https://','http://') : `http://${main}`
    main = main.indexOf('////') ? main.replace('////','//') : main
    main = !main.indexOf('http://http://') ? main.replace('http://http://','http://') : main
    // htpps ? https->http : +'http'
    api.html.main.push(`<a href="${main}\n">img</a>`)

    vice = !vice.indexOf('https://') ? httpsFilter() : addHttp()
    // https ? https->htp : + 'http'


    function httpsFilter() {
      vice = vice.replace(/https:\/\//g, 'http://')
      callData()
    }
    function addHttp() {
      let tempVice = ''
      // 详细图 临时变量
      for ( let v of vice.split('|') ) {
        tempVice += v && 'http://' + v + '|'
      }

      vice = tempVice.slice(0, tempVice.lastIndexOf('|')).replace(/http:\/\/http:\/\//g, 'http://')
      // 去掉最后一个空值
      callData()
    }
    // 回传数据 -> api
    function callData() {
      for ( let url of vice.split('|') ) {
        api.html.vice.push(`<a href="${url}\n">img</a>`)
      }
    }
}


// /**
//  * 过to xls的json数据
//  * @param  {Objct} key res->data
//  * @return {none}     none
//  */
exports.filterJsonXls = ( key ) => {
  let main = key.主图 || key.Main || '',vice = key.详细图 || key.Vice || ''

  main = main.slice(main.lastIndexOf('/')+1, main.length)
  vice = vice.replace(/###/g, '|')
  // 最后一个 '|' 后面的值  => 文件名

  let tempVice = ''
  for( let arr of vice.split('|') ){
    tempVice += arr && arr.slice(arr.lastIndexOf('/')+1, arr.length) + '|'
  }
  vice = tempVice.slice(0, tempVice.lastIndexOf('|'))
  // 最后一个 '|' 后面的值  => 文件名

  if ( main.indexOf('?') != -1 ) {
    let tempVice = ''
    main = main.slice(0, main.indexOf('?'))
    for( let viceArr of vice.split('|') ){
      tempVice += viceArr && viceArr.slice(0, viceArr.indexOf('?')) + '|'
    }
    vice = tempVice.slice(0, tempVice.lastIndexOf('|'))
  }
  // 去除 ? 后面的选项字符

  if ( main == vice.slice(0, vice.indexOf('|')) ) {
    vice = vice.slice(vice.indexOf('|')+1, vice.length)
  }

  if ( key.主图 || key.详细图 ){ key.主图 = main; key.详细图 = vice }
  if ( key.Main || key.Vice ){ key.Main = main; key.Vice = vice }
  if ( !key.主图 && !key.Main  ) {
    key.主图 = vice.slice(0, vice.indexOf('|'));
    if ( key.主图 == vice.slice(0, vice.indexOf('|')) ) {
      vice = vice.slice(vice.indexOf('|')+1, vice.length)
    }
    key.详细图 = vice
  }
  // 中英文数据回调

}