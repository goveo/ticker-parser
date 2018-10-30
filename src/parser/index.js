const Ticker = require('../database/ticker');
const needle = require('needle');
const cheerio = require("cheerio");
const urlParse = require("url-parse");

let counter = 0;

function parse(url) {
    needle.get(url, (err, res) => {
        counter = counter+1;
        if (err) {
            console.log(err);
        }
        // console.log(res.statusCode);
        var $ = cheerio.load(res.body);
        //table that we need 
        $('[bgcolor=#d3d3d3] tr').each(function(i, elem) { // for every row
            let ticker = [];
            $(elem).find('td a').each(function(i, elem) { // for every element of a row
                ticker.push($(elem).text());
                if (i == 0) {
                    // parse a link from table el
                    let link = $(elem).attr('href');
                    // parse url to get a full site path
                    var parsedUrl = urlParse(url).set('href', link);

                    ticker.push(`${parsedUrl.origin}/${link}`);
                }
            });
            if (i != 0)
                Ticker.createOrUpdateTicker(createTickerObj(ticker));
                // console.log(createTickerObj(ticker));
        });
        // need to find next page

        // console.log(tickers);
        console.log("counter : ", counter);

        //search next link and go recusive parse
        $('.tab-link').each(function(i, elem) {
            if ($(elem).text().trim() == "next") {
                let link = $(elem).attr('href');
                let parsedUrl = urlParse(url).set('href', link);
                return parse(`${parsedUrl.origin}/${link}`);
            }
        });
        
    });
    
}

function createTickerObj(arr) {
    return {
        // id: arr[0],
        link: arr[1],
        name: arr[2],
        company: arr[3],
        sector: arr[4],
        industry: arr[5],
        country: arr[6],
        marketCap: arr[7],
        pe: arr[8],
        price: arr[9],
        change: arr[10],
        volume: arr[11]
    }
}

module.exports = {
    parse: parse,
    createTickerObj: createTickerObj
}
