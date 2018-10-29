const express = require('express');
const app = express();
const config = require('./config');
const bodyParser = require('body-parser');
const path = require("path");
var needle = require('needle');
var cheerio = require("cheerio");

app.use(express.static(__dirname + '/../public'));
app.set('public', path.join(__dirname, '/../public'));
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');

const port = config.port || 8080;

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
var tickers = [];

needle.get(URL, function(err, res){
    if (err) throw err;
    console.log(res.statusCode);
    let body = res.body;
    var $ = cheerio.load(body);
    var parsed = $('[bgcolor=#d3d3d3] tr').each(function(i, elem) {
        let res = $(elem).find('td a').each(function(i, elem) {
            
            console.log('i: ', i);
            console.log($(elem).text());
        });
        // console.log(res);
      });
    // console.log(parsed);
});

