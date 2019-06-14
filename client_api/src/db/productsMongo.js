const mongo = require('./mongo');

const getProducts = (callback) => {
    mongo.db.collection('products').find().toArray((err, result) => {
       if (err) {
           callback(err);
       } else {
           callback(null, result);
       }
    });
};

const getProductsDetail = (productId, callback) => {
    mongo.db.collection('products').findOne({id: productId}, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
};


module.exports = {getProducts, getProductsDetail};
