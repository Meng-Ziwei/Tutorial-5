const { MongoClient } = require('mongodb');


const url = 'mongodb://localhost:27017/california';
const guest1 = { serial: 1, name: 'mzw', phone: 1, time: new Date()};
const guest2 = { serial: 2, name: 'cyh', phone: 2, time: new Date()};
const guest3 = { serial: 3, name: 'ltz', phone: 3, time: new Date()};
const guest4 = { serial: 4, name: 'yaya', phone: 4, time: new Date()};
async function testWithAsync() {
  console.log('\n--- testWithAsync ---');
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB');
  var result;
  var doc;
  
  try {
    console.log("\nTest start!!!");
    const db = client.db();
    const collection = db.collection('Guest');

    result = await collection.insertOne(guest1);
    console.log('Insert result 1:\n', result.insertedId);
    doc = await collection.find({ _id: result.insertedId }).toArray();
    console.log('Find result 1:\n', doc);

    result = await collection.insertOne(guest2);
    console.log('Insert result 2:\n', result.insertedId);
    doc = await collection.find({ _id: result.insertedId }).toArray();
    console.log('Find result 2:\n', doc);

    result = await collection.insertOne(guest3);
    console.log('Insert result 3:\n', result.insertedId);
    doc = await collection.find({ _id: result.insertedId }).toArray();
    console.log('Find result 3:\n', doc);

    result = await collection.insertOne(guest2);
    console.log('Insert result 4:\n', result.insertedId);
    doc = await collection.find({ _id: result.insertedId }).toArray();
    console.log('Find result 4:\n', doc);

  } catch(err) {
    console.log(err);
  } finally {
    console.log('Test create complete.');
  }

  try {
    console.log("\nRead test");
    const db = client.db();
    const collection = db.collection('Guest');

    doc = await collection.find({serial: guest1.serial}).toArray();
    console.log('Find result 1:\n', doc);

    doc = await collection.find({serial: guest2.serial }).toArray();
    console.log('Find result 2:\n', doc);

    doc = await collection.find({serial: guest3.serial }).toArray();
    console.log('Find result 3:\n', doc);

    doc = await collection.find({serial: guest4.serial }).toArray();
    console.log('Find result 4:\n', doc);

  } catch(err) {
    console.log(err);
  } finally {
    console.log('Test read complete.');
  }

  try {
    console.log("\nTest update");
    const db = client.db();
    const collection = db.collection('Guest');

    result = await collection.updateOne({serial: guest1.serial}, {$set: {phone:11}});
    console.log('Update result 1:\n', result.result);

    result = await collection.updateOne({serial: guest2.serial}, {$set: {phone:22}});
    console.log('Update result 2:\n', result.result);

    result = await collection.updateOne({serial: guest3.serial}, {$set: {phone:33}});
    console.log('Update result 3:\n', result.result);

    result = await collection.updateOne({serial: guest4.serial}, {$set: {phone:44}});
    console.log('Update result 4:\n', result.result);

    doc = await collection.find().toArray();
    console.log('After update:\n', doc);

  } catch(err) {
    console.log(err);
  } finally {
    console.log('Test update complete.');
  }

  try {
    console.log("\nTest delete");
    const db = client.db();
    const collection = db.collection('guest');

    result = await collection.deleteOne({serial: guest1.serial});
    console.log('Delete result 1:\n', result.result);

    result = await collection.deleteOne({serial: guest2.serial});
    console.log('Delete result 2:\n', result.result);

    result = await collection.deleteOne({serial: guest3.serial});
    console.log('Delete result 3:\n', result.result);

    result = await collection.deleteOne({serial: guest4.serial});
    console.log('Delete result 4:\n', result.result);

    doc = await collection.find().toArray();
    console.log('After delete:\n', doc);

  } catch(err) {
    console.log(err);
  } finally {
    console.log('Test delete complete.');
  }

  client.close();
  console.log("\n--- Test complete! ---");


}

testWithAsync();