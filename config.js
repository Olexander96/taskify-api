const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
//.env
dotenv.config();
//uri
const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI);

module.exports = { client };
