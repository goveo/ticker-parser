const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const database = require('./database');

const tickerSchema = new Schema({
    id: Number,
    link: String,
    name: String,
    company: String,
    sector: String,
    industry: String,
    country: String,
    marketCap: Number,
    pe: Number,
    proce: Number,
    change: String,
    volume: Number
});

const Ticker = mongoose.model("ticker", tickerSchema);

async function createTicker(tickerObject){
    return await Ticker.create(new Ticker(tickerObject), (err, data) => {
        if(err){
            return err;
        } else {
            return "created";
        }
    });
}

async function getAllTickers(){
    return await Ticker.find({}, (err, data) => {
        if(err){
            return err;
        } else {
            return data;
        }
    });
}

async function getTickerById(tickerId){
    return await Ticker.findOne({id: tickerId}, (err, data) => {
        if(err){
            return err;
        } else {
            return data;
        }
    });
}

async function removeTickerById(tickerId){
    return await Ticker.findOneAndDelete({id: tickerId}, (err, data) => {
        if(err){
            return err;
        } else {
            return "deleted";
        }
    });
}

module.exports = {
    createTicker: createTicker,
    getAllTickers: getAllTickers,
    getTickerById: getTickerById,
    removeTickerById: removeTickerById,
    Ticker: Ticker
}
