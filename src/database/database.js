const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const config = require('../config');
const parser = require('../parser')

const URL = 'https://finviz.com/screener.ashx';


async function start(){
    await mongoose.connect(config.database, {
        useNewUrlParser: true
    }, (err, data) => {
        if(err) console.log(err);
        else{
            console.log("mongo connected");
            // setInterval(parser.parse(), );
            //parser.parse(URL);
        }
    });
}

module.exports = {
    start: start
}

