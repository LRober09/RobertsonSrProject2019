const MongoClient = require('mongodb').MongoClient;

const mongodb = {};

mongodb.client = null;

mongodb.init = (callback) => {
    const uri = "mongodb+srv://lrober09:agoodpassword@teststore-s46p7.mongodb.net/test?retryWrites=true";

    MongoClient.connect(uri, {useNewUrlParser: true}, (err, client) => {
        mongodb.client = client;
        mongodb.db = client.db('prediction_store');
        callback();
    });
};

module.exports = mongodb;