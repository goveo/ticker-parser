require('dotenv').config();
module.exports = {
    database: process.env.MONGODB_URI,
    port: process.env.PORT,
    secret: process.env.SECRET
};