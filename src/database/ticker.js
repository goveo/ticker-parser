const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const random = require('mongoose-simple-random');

mongoose.Promise = global.Promise;

const tickerSchema = new Schema({
    id: String,
    link: String,
    name: String,
    company: String,
    sector: String,
    industry: String,
    country: String,
    marketCap: String,
    pe: String,
    proce: String,
    change: String,
    volume: String
});
tickerSchema.plugin(random);

const Ticker = mongoose.model("ticker", tickerSchema);

async function createTicker(tickerObject) {
    return await Ticker.create(tickerObject, (err, data) => {
        if (err) {
            console.log(err)
            return err;
        } else {
            return "created";
        }
    });
}

async function getAllTickers() {
    return await Ticker.find({}, (err, data) => {
        if (err) {
            return err;
        } else {
            return data;
        }
    });
}

async function getNumRandomTickers(num){
    return await Ticker.findRandom({}, {}, {count: num}, (err, data) => {
        if (err){
            return err;
        } else {
            return data;
        }
    })
}

async function getTickerById(tickerId) {
    return await Ticker.findOne({ id: tickerId }, (err, data) => {
        if (err) {
            return err;
        } else {
            return data;
        }
    });
}

async function removeTickerById(tickerId) {
    return await Ticker.findOneAndDelete({ id: tickerId }, (err, data) => {
        if (err) {
            return err;
        } else {
            return "deleted";
        }
    });
}

async function updateTickerById(tickerId, newTickerObject) {
    return await Ticker.findOneAndUpdate({ id: tickerId }, newTickerObject, (err, data) => {
        if(err) {
            return err;
        } else {
            return "updated";
        }
    })
}

async function findTicker(searchObject){
    //TODO validate searchObject
    return await Ticker.find(searchObject, (err, data) => {
        if(err) {
            return err;
        } else {
            return data;
        }
    });
}

async function createOrUpdateTicker(newTicker){
    // console.log(newTicker);
    // let ticker = new Ticker(newTicker);
    // delete ticker._id;
    return new Promise((resolve, reject) => {
        Ticker.findOneAndUpdate({
            id: newTicker.id
        }, newTicker)
            .then((data) => {
                if(data == null) {
                    console.log('creating');
                    createTicker(newTicker);
                } else {
                    console.log("updating");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    })
    // console.log(newTicker);
    // return await Ticker.findOneAndUpdate({id: newTicker.id}, new Ticker(newTicker), (err, data) => {
    //     if(err){
    //         console.log(err);
    //         return createTicker(newTicker);
    //     } else {
    //         return "updated";
    //     }
    // });
}

module.exports = {
    createTicker: createTicker,
    getAllTickers: getAllTickers,
    getNumRandomTickers: getNumRandomTickers,
    getTickerById: getTickerById,
    removeTickerById: removeTickerById,
    createOrUpdateTicker: createOrUpdateTicker,
    Ticker: Ticker
}
