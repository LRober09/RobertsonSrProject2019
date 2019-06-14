const MongoClient = require('mongodb').MongoClient;

const mongodb = {};

mongodb.client = null;

mongodb.init = (callback) => {
    const uri = "mongodb+srv://admin:p0Z36dgB7IuV@teststore-4m05r.mongodb.net/test?retryWrites=true&w=majority";

    MongoClient.connect(uri, {useNewUrlParser: true}, (err, client) => {
        mongodb.client = client;
        mongodb.db = client.db('test_store');
        callback();
    });
};

module.exports = mongodb;