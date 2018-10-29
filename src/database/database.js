const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const config = require('../config');

mongoose.connect(config.database, (err, data) => {
    if(err) console.log(err);
    else{
        console.log("mongo connected")
    }
});
