
const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')

const links = [
  './html/mens-belts.html',
  './html/mens-boxers-and-boxer-briefs.html',
  './html/mens-casual-shoes.html',
  './html/mens-collection-by-peter-millar.html',
  './html/mens-cologne-and-small-accessories.html',
  './html/mens-crown-collections.html',
  './html/mens-crown-sport-activewear.html',
  './html/mens-crown-sport-collection.html',
  './html/mens-dress-pants-and-golf-pants.html',
  './html/mens-dress-shirts.html',
  './html/mens-dress-shoes.html',
  './html/mens-dress-trousers.html',
  './html/mens-golf-jackets.html',
  './html/mens-golf-pants.html',
  './html/mens-golf-polo-shirts.html',
  './html/mens-golf-pullovers.html',
  './html/mens-golf-shoes.html',
  './html/mens-golf-shorts.html',
  './html/mens-golf-sweaters.html',
  './html/mens-golf-vests.html',
  './html/mens-golf-windbreakers.html',
  './html/mens-hats-gloves-scarves.html',
  './html/mens-jackets.html',
  './html/mens-peter-millar-seaside.html',
  './html/mens-polos-shirts.html',
  './html/mens-pullovers-and-t-shirts.html',
  './html/mens-shorts.html',
  './html/mens-socks.html',
  './html/mens-sport-coats-and-blazers.html',
  './html/mens-sport-shirts.html',
  './html/mens-sunglasses-and-eyewear.html',
  './html/mens-sweaters.html',
  './html/mens-swim-trunks.html',
  './html/mens-ties-and-pocket-squares.html',
  './html/mens-travel-bags-and-dopp-kits.html',
  './html/mens-vests.html',
  './html/mens-windbreakers.html',
  './html/new-products.html',
  './html/womens-golf-half-zips-and-full-zips.html',
  './html/womens-golf-jackets.html',
  './html/womens-golf-polos.html',
  './html/womens-golf-shorts-and-skorts.html',
  './html/womens-golf-sweaters.html',
  './html/womens-golf-vests.html',
  './html/womens-half-zips-and-full-zips.html',
  './html/womens-jackets.html',
  './html/womens-pants-and-capris.html',
  './html/womens-polos.html',
  './html/womens-shoes.html',
  './html/womens-shorts-and-skorts.html',
  './html/womens-sweaters.html',
  './html/womens-vests.html'
]

const urls = []
fs.appendFileSync(`json/url.json`, '', 'utf8');
for( let link of links ){
  fs.readFile(link, 'utf8', (err, data) => {
    const $ = cheerio.load(data)
    let aEl = $('a')
    let className = link.replace('./html/','').replace('.html','')

    fs.appendFileSync(`json/url.json`, `"${className}": [`, 'utf8');
    //  "className" + [
    for (var i = 0; i < aEl.length; i++) {
      let hrefVal = aEl[i].attribs.href.replace('https:','')
      fs.appendFileSync(`json/url.json`, `"${hrefVal}",`, 'utf8');
      // "href",
    }
    fs.appendFileSync(`json/url.json`, `],\n`, 'utf8');
    // ]
  });
}
console.log('end.');
