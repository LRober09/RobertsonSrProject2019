const mongo = require('./mongo');

const stubMethod = (callback) => {
    callback(null);
};

module.exports = {stubMethod};
