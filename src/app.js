const express = require('express');
const app = express();
const config = require('./config');
const bodyParser = require('body-parser');
const path = require("path");
var needle = require('needle');
var cheerio = require("cheerio");
var urlParse = require("url-parse");

app.use(express.static(__dirname + '/../public'));
app.set('public', path.join(__dirname, '/../public'));
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');

const port = config.port || 2323;

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log('server on', port);
});

app.get('/', (req, res) => {
    res.render('index', {
        user: req.user
    });
});


var URL = 'https://finviz.com/screener.ashx';
let counter = 0;


function parse(url) {
    let tickers = [];
    needle.get(url, (err, res) => {
        counter = counter+1;
        if (err) {
            console.log(err);
            parse(url);
        }
        console.log(res.statusCode);
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
                    var parsedUrl = urlParse(URL).set('href', link);

                    ticker.push(`${parsedUrl.origin}/${link}`);
                }
            });
            if (i != 0) tickers.push(createTickerObj(ticker));
        });
        // need to find next page

        console.log(tickers);
        console.log("counter : ", counter);

        //search next link and go recusive parse
        $('.tab-link').each(function(i, elem) {
            if ($(elem).text().trim() == "next") {
                let link = $(elem).attr('href');
                let parsedUrl = urlParse(URL).set('href', link);
                return parse(`${parsedUrl.origin}/${link}`);
            }
        });
        
    });
    
}

function createTickerObj(arr) {
    return {
        id: arr[0],
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

parse(URL);