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
    tickersBase.getNumRandomTickers(10)
    .then(data => console.log(data))
    .catch(err => console.log(err));
    res.render('index', {
        user: req.user
    });
});
