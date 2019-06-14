const mongo = require('./mongo');

const closeSession = (session, callback) => {
    mongo.db.collection('sessions').replaceOne({sessionId: session.sessionId}, session, {upsert: true}, (err) => {
        if (!err) {
            callback(null);
        } else {
            console.log('Error: ', err);
            callback('Error while inserting session');
        }
    });
};

const updateSession = (session, callback) => {
    mongo.db.collection('sessions').updateOne({sessionId: session.sessionId}, {
        $set: {...session},
    }, {upsert: true}).then(() => {
        callback(null);
    }).catch((err) => {
        console.log('Error: ', err);
        callback('Error while updating session');
    })
};

const addIntent = (intent, callback) => {
    mongo.db.collection('intents').updateOne({
        label: intent.label,
    }, {
        $set: {controlId: intent.controlId},
    }, {
        upsert: true,
    }).then(() => {
        callback(null);
    }).catch((err) => {
        console.log('Error: ', err);
        callback('Error while upserting intent');
    });
};

const getIntent = (label, callback) => {
    mongo.db.collection('intents').findOne({
        label: label
    }).then((result) => {
        if (!result) {
            throw new Error('Intent not found by label');
        } else {
            callback(null, result);
        }
    }).catch((err) => {
        console.log('Error: ', err);
        callback('Error while finding intent');
    });
};

module.exports = {closeSession, updateSession, addIntent, getIntent};
