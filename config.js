const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
//.env
dotenv.config();
//uri
const MONGO_URI =
  'mongodb+srv://osheiko96:niuuXvNEOGMoi2YI@cluster0.de9vu.mongodb.net/?retryWrites=true&writeConcern=majority';
const client = new MongoClient(MONGO_URI);

module.exports = { client };
