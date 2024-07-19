$('.product-info').remove()
$('.cart-add').remove()
var list = document.querySelectorAll('.product-image')
for( let val of list ){
  val.querySelectorAll('a')[0].removeAttribute('ng-href')
  val.querySelectorAll('a')[0].removeAttribute('ng-click')
  var imgSrc = val.querySelectorAll('a')[0].querySelectorAll('img')[0].removeAttribute('ng-src')
  if ( val.querySelectorAll('a')[0].getAttribute('href') ) {
    var aHref = val.querySelectorAll('a')[0].getAttribute('href').replace('/products','https://www.petermillar.com/products')
    val.querySelectorAll('a')[0].setAttribute('href',aHref)
  }
  if ( val.querySelectorAll('a')[0].querySelectorAll('img')[0].getAttribute('src') ) {
    var imgSrc = val.querySelectorAll('a')[0].querySelectorAll('img')[0].getAttribute('src').replace('//image-cdn','https://image-cdn')
    val.querySelectorAll('a')[0].querySelectorAll('img')[0].setAttribute('src',imgSrc)
  }
}
copy($('.product-list')[0])