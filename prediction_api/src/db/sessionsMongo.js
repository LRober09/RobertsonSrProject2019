const mongo = require('./mongo');

const addSession = (session, callback) => {
    mongo.db.collection('sessions').insertOne(session, null, (err) => {
        if (!err) {
            callback(null);
        } else {
            callback(err);
        }
    });
};

module.exports = {addSession};
