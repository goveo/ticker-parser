const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const tickerSchema = new Schema("ticker", {
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

