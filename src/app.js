const express = require('express');
const app = express();
const config = require('./config');
const bodyParser = require('body-parser');
const path = require("path");
const database = require('./database/database');

app.use(express.static(__dirname + '/../public'));
app.set('public', path.join(__dirname, '/../public'));
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');

const port = config.port || 2323;

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log('server on', port);
    database.start();
});

app.get('/', (req, res) => {
    res.render('index', {
        user: req.user
    });
});
