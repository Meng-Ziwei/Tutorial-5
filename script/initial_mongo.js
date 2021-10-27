/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js 
 * */

const { MongoClient } = require('mongodb');

const guest1 = { serial: 1, name: 'mzw', phone: 1, time: new Date()};

const url = 'mongodb://localhost:27017/california';

async function initDB() {
    console.log(" Initialization start!!!!!!\n");
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('guest');
    collection.remove({});

    collection.createIndex({ serial: 1 }, { unique: true });
    collection.createIndex({ name: 1 });
    collection.createIndex({ phone: 1 });
    collection.createIndex({ time: 1 });

    client.close();
    console.log('MongoDB closed');
    console.log("\n--- Initialization complete! ---");
}

initDB();


