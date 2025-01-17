import { MongoClient } from 'mongodb'
const {MONGODB_URI} = require('../config_mongo_uri.js');

 const uri = MONGODB_URI 
 
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to env file')
}

client = new MongoClient(uri, options)
clientPromise = client.connect()


export default clientPromise