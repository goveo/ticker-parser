const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-sequence')(mongoose);
const mongoosePaginate = require('mongoose-paginate');
const random = require('mongoose-random');
mongoose.Promise = global.Promise;

const tickerSchema = new Schema({
    link: String,
    name: String,
    company: String,
    sector: String,
    industry: String,
    country: String,
    marketCap: String,
    pe: String,
    price: String,
    change: String,
    volume: String
});
tickerSchema.plugin(random);

tickerSchema.plugin(autoIncrement, {
    inc_field: 'id'
});
tickerSchema.plugin(mongoosePaginate);

tickerSchema.plugin(random, {
    path: 'r'
});

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

async function getAllTickers(page) {
    return await Ticker.paginate({}, { limit: 10, page: page}, (err, data) => {
        if (err) {
            return err;
        } else {
            return data;
        }
    });
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

async function updateTickerByName(tickerName, newTickerObject) {
    return await Ticker.findOneAndUpdate({ name: tickerName }, newTickerObject, (err, data) => {
        if (err) {
            return err;
        } else {
            return "updated";
        }
    })
}

async function findTickerByName(name, page) {
    let regexp = '.*(?i)' + name + '.*'
    return await Ticker.paginate({
        name: {
            $regex: regexp
        }
    }, {
            limit: 10,
            page: page,
            sort: {
                name: 1
            }
        }, (err, data) => {
            if (err) {
                console.log("err");
                return (err);
            } else {
                return data;
            }
        });
}

async function findTicker(searchObject) {
    //TODO validate searchObject
    return await Ticker.find(searchObject, (err, data) => {
        if (err) {
            return err;
        } else {
            return data;
        }
    });
}

async function createOrUpdateTicker(newTicker) {
    // console.log(newTicker);
    // let ticker = new Ticker(newTicker);
    // delete ticker._id;
    return new Promise((resolve, reject) => {
        Ticker.findOneAndUpdate({
            name: newTicker.name
        }, newTicker)
            .then((data) => {
                if (data == null) {
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
}

async function getRandomTickers(number) {
    
    return await Ticker.findRandom({}, {}, { limit: number }, (err, data) => {
        if (err) {
            console.log("err");
        } else {
            //console.log(data);
        }
    });
}

module.exports = {
    createTicker: createTicker,
    getAllTickers: getAllTickers,
    getTickerById: getTickerById,
    removeTickerById: removeTickerById,
    createOrUpdateTicker: createOrUpdateTicker,
    updateTickerByName: updateTickerByName,
    findTicker: findTicker,
    findTickerByName: findTickerByName,
    getRandomTickers: getRandomTickers,
    Ticker: Ticker
}
