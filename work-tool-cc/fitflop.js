
const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const async = require('async')

let urls = [
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/superskate-d-orsay-leather-loafers-p-K97-535',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/superskate-leather-loafers-p-K20-536',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/superskate-leather-loafers-p-K19-535',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/superskate-d-orsay-leather-loafers-p-K97-001',
  'https://www.fitflop.com/uk/en/shop/womens-new-arrivals-view-all-uk/superskate-leather-loafers-p-K20-577',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/superskate-leather-loafers-p-K19-001',
  'https://www.fitflop.com/uk/en/shop/womens-technology-supercomff-uk/casa-metallic-leather-loafers-p-K90-537',
  'https://www.fitflop.com/uk/en/shop/womens-technology-microwobbleboard-uk/superloafer-leather-loafers-p-E69-090',
  'https://www.fitflop.com/uk/en/shop/womens-black-collection/sneakerloafer-leather-shoes-p-C94-090',
  'https://www.fitflop.com/uk/en/shop/womens-technology-supercomff-uk/superstretch-bobby-loafers-p-J14-090',
  'https://www.fitflop.com/uk/en/shop/womens-technology-supercomff-uk/casa-canvas-loafers-p-K89-538',
  'https://www.fitflop.com/uk/en/shop/womens-technology-supercomff-uk/casa-canvas-loafers-p-K89-535',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/superloafer-patent-loafers-p-K17-001',
  'https://www.fitflop.com/uk/en/shop/womens-technology-supercomff-uk/casa-canvas-loafers-p-K89-001',
  'https://www.fitflop.com/uk/en/shop/womens-technology-supercomff-uk/casa-canvas-loafers-p-K89-194',
  'https://www.fitflop.com/uk/en/shop/womens-new-arrivals-view-all-uk/superskate-loafers-woven-leather-p-K75-001',
  'https://www.fitflop.com/uk/en/shop/womens-new-arrivals-view-all-uk/superskate-loafers-woven-leather-p-K75-552',
  'https://www.fitflop.com/uk/en/shop/womens-new-arrivals-view-all-uk/superskate-loafers-woven-leather-p-K75-137',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/superskate-loafers-shimmer-denim-p-K73-533',
  'https://www.fitflop.com/uk/en/shop/womens-new-arrivals-view-all-uk/casa-loafers-leather-p-K91-001',
  'https://www.fitflop.com/uk/en/shop/womens-new-arrivals-view-all-uk/casa-loafers-leather-p-K91-137',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/house-shearling-slippers-with-pom-poms-p-694-326',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/house-shearling-slippers-with-pom-poms-p-694-052',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/loaff-felt-slippers-with-pom-poms-p-J23-476',
  'https://www.fitflop.com/uk/en/shop/womens-sneakers-uk/f-sporty-perforated-leather-boots-p-K38-194',
  'https://www.fitflop.com/uk/en/shop/womens-sneakers-uk/f-sporty-perforated-leather-boots-p-K38-011',
  'https://www.fitflop.com/uk/en/shop/womens-sneakers-uk/f-sporty-perforated-leather-boots-p-K38-001',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/skatebootie-leather-boots-p-K10-098',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/skatebootie-leather-boots-p-K10-001',
  'https://www.fitflop.com/uk/en/shop/womens-sneakers-uk/f-sporty-perforated-leather-boots-p-K38-536',
  'https://www.fitflop.com/uk/en/shop/womens-black-collection/superchelsea-crinkle-patent-leather-slip-on-boots-p-I65-485',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/supermod-ii-crinkle-patent-ankle-boots-p-J08-045',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/skatebootie-leather-boots-with-shearling-p-J72-001',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/superbuckle-leather-chelsea-boots-p-J67-167',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/superbuckle-leather-chelsea-boots-p-J67-001',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/superchelsea-snake-embossed-leather-chelsea-boots-p-C45-394',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/superchelsea-suede-boots-with-studs-p-J05-030',
  'https://www.fitflop.com/uk/en/shop/womens-black-collection/superchelsea-leather-chelsea-boots-p-C45-090',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/skatebootie-suede-boots-with-shearling-p-J73-047',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/skatebootie-suede-boots-with-shearling-p-J73-001',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/superchelsea-snake-embossed-leather-mix-slip-ons-p-I65-486',
  'https://www.fitflop.com/uk/en/shop/womens-black-collection/supermod-ii-leather-ankle-boots-p-J07-090',
  'https://www.fitflop.com/uk/en/shop/womens-technology-microwobbleboard-standard-uk/supermod-soft-leather-ankle-boots-p-H03-090',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/supermod-ii-snake-embossed-leather-ankle-boots-p-J07-493',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/mukluk-leather-boots-p-I90-001',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/loaff-lace-up-nubuck-ankle-boots-p-A52-090',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/loaff-shorty-zip-boots-in-leather-p-595-090',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/mukluk-shorty-ii-suede-boots-with-tassels-p-I91-399',
  'https://www.fitflop.com/uk/en/shop/womens-technology-microwobbleboard-standard-uk/supermod-ii-crinkle-patent-ankle-boots-p-H02-090',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/superbuckle-suede-chelsea-boots-p-J66-167',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/superchelsea-suede-slip-ons-p-I66-399',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/f-sporty-leather-sneakerboots-with-shearling-p-I74-001',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/supermod-soft-leather-ankle-boots-p-E09-045',
  'https://www.fitflop.com/uk/en/shop/womens-black-collection/superchelsea-suede-boots-with-studs-p-J05-001',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/supermod-lizard-print-suede-ankle-boots-p-E71-167',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/loaff-lace-up-nubuck-ankle-boots-p-A52-097',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/superchelsea-canvas-chelsea-boots-p-E88-399',
  'https://www.fitflop.com/uk/en/shop/womens-black-collection/superflex-leather-ankle-boots-p-J06-001',
  'https://www.fitflop.com/uk/en/shop/womens-new-arrivals-collections-uma-thurman-skates-uk/supermod-ii-suede-ankle-boots-p-J09-030',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/superchelsea-suede-slip-ons-p-I66-001',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/f-sporty-suede-sneakerboots-with-shearling-p-I75-476',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/f-sporty-leather-sneakerboots-with-shearling-p-I74-398',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/supermod-ii-snake-embossed-leather-ankle-boots-p-J07-490',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/superchelsea-leather-chelsea-boots-p-C45-277',
  'https://www.fitflop.com/uk/en/shop/womens-new-arrivals-collections-uma-thurman-skates-uk/supermod-ii-suede-ankle-boots-p-J09-399',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/mukluk-shorty-suede-boots-p-B96-030',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/superchelsea-leather-ankle-boots-p-C47-030',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/f-sporty-suede-sneakerboots-with-shearling-p-I75-399',
  'https://www.fitflop.com/uk/en/shop/womens-black-collection/mukluk-leather-high-boots-with-tassels-p-J70-090',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/mukluk-shorty-ii-suede-boots-p-B95-001',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/mukluk-shorty-ii-suede-boots-p-B96-097',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/loaff-water-resistant-lace-up-boots-p-B84-030',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/mukluk-shorty-ii-suede-boots-with-tassels-p-I91-001',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/mukluk-suede-high-boots-with-tassels-p-I89-001',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/mukluk-shorty-ii-suede-boots-with-tassels-p-I91-047',
  'https://www.fitflop.com/uk/en/shop/sale-all-uk/supermod-ii-shimmersuede-ankle-boots-p-J09-403',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/uberknit-slip-on-ballerina-with-bow-p-E90-460',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/uberknit-slip-on-ballerina-with-bow-p-J31-502',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/uberknit-slip-on-ballerinas-p-E90-090',
  'https://www.fitflop.com/uk/en/shop/womens-new-arrivals-view-all-uk/superchic-woven-ballerinas-p-K72-137',
  'https://www.fitflop.com/uk/en/shop/womens-new-arrivals-view-all-uk/superchic-woven-ballerinas-p-K72-552',
  'https://www.fitflop.com/uk/en/shop/womens-new-arrivals-view-all-uk/superchic-woven-ballerinas-p-K72-001',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/superbendy-leather-ballerinas-p-J02-537',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/superbendy-leather-ballerinas-p-J02-001',
  'https://www.fitflop.com/uk/en/shop/womens-athleisure-uberknit-sneakers-uk/uberknit-crystal-ballerinas-p-M23-600',
  'https://www.fitflop.com/uk/en/shop/womens-athleisure-uberknit-sneakers-uk/uberknit-crystal-ballerinas-p-M23-601',
  'https://www.fitflop.com/uk/en/shop/womens-athleisure-uberknit-sneakers-uk/uberknit-crystal-ballerinas-p-M23-399',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/uberknit-mary-janes-with-metallic-weave-p-L28-567',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/uberknit-mary-janes-p-L27-570',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/uberknit-mary-janes-with-metallic-weave-p-L28-551',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/uberknit-ballerina-with-bow-p-K76-561',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/uberknit-ballerina-with-bow-p-K76-543',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/uberknit-slip-on-ballerinas-p-E90-001',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/uberknit-metallic-ballerina-with-bow-p-K77-567',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/uberknit-metallic-ballerina-with-bow-p-K77-566',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/uberknit-metallic-ballerina-with-bow-p-K77-551',
  'https://www.fitflop.com/uk/en/shop/womens-athleisure-uberknit-sneakers-uk/uberknit-crystal-ballerinas-p-M23-546',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/uberknit-mary-janes-ballerinas-p-L27-546',
  'https://www.fitflop.com/uk/en/shop/womens-view-all-uk/uberknit-slip-on-ballerinas-p-J31-501',
  'https://www.fitflop.com/uk/en/shop/womens-technology-anatomicush-uk/uberknit-slip-on-ballerinas-p-H95-461'
]
let JsonData = []
async.mapLimit( urls, 5, (url, callback) => {
  let api = url + '.json'
  getData(api, url, callback)
})

function getData(api, url, callback){
  superagent
    .get(api)
    .end((err, res) => {
      if (err) { return err }
      let data = JSON.parse(res.text)
      let link = url
      let title = data.name + data.description
      let desc = data.summary
      let price = data.prices
      let attr = data.variationFields[0].values.toString().replace(',', '|')
      let main = data.imageSet.items[0].src
      let vices = data.imageSet.items
      let vice = ''
      for (var i = 1; i < vices.length; i++) {
        vice += vices[i].src + '.jpg|'
      }
      JsonData.push({
        link,title,desc,price,attr,main,vice
      })
      fs.writeFile('data/fitflop.json', '',  function(err) {
        fs.writeFileSync('data/fitflop.json', JSON.stringify(JsonData) )
        if (err) { return console.log(`写入失败...${err}`); }
        console.log( url + ' ok!' );
        callback();
      })

    })

}


