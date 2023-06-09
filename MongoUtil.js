const MongoClient = require("mongodb").MongoClient;

async function connect(mongo_uri, databaseName) {
    const client = await MongoClient.connect(mongo_uri, {
        "useUnifiedTopology": true  // simplify our access to MongoDB
    });

    const db = client.db(databaseName);
    return db;
}


// export out the connect function
module.exports = { connect};