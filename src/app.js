const express = require('express');
const app = express();
const config = require('./config');
const bodyParser = require('body-parser');
const path = require("path");
const database = require('./database/database');
const tickersBase = require('./database/ticker');

app.use(express.static(__dirname + '/../public'));
app.set('public', path.join(__dirname, '/../public'));
app.set('views', path.join(__dirname, '/views'));
app.use('/stylesheets', express.static(__dirname + '/public/stylesheets'));
app.set('view engine', 'ejs');

const port = config.port || 2323;

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log('server on', port);
    database.start();
});

app.get('/', (req, res) => {
    tickersBase.getRandomTickers(10)
    .then(data => {
        res.render('index', {
            tickers: data
        })
    })
    .catch(err => console.log(err));
});

app.get('/search', (req, res) => {
    let toSearch = req.query.name;
    let page = req.query.page;
    if(page == undefined || page == ""){
        page = 1;
    }
    tickersBase.findTickerByName(toSearch, page)
    .then(data => {
        res.render('search', {
            tickers: data,
            toSearch: toSearch
        })
    })
    .catch(err => console.log(err));
})
