const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const config = require('../config');
const parser = require('../parser');
const t = require('./ticker');

const URL = 'https://finviz.com/screener.ashx';


async function start(){
    await mongoose.connect(config.database, {
        useNewUrlParser: true
    }, (err, data) => {
        if(err) console.log(err);
        else{
            console.log("mongo connected");
            // setInterval(parser.parse(), );
            // parser.parse(URL);
            // t.getRandomTickers(10);
        }
    });
}

module.exports = {
    start: start
}
