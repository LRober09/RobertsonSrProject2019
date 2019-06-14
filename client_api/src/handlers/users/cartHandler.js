const rUtil = require('../../util/rUtil');
const util = require('../../util/util');
const usersMongo = require('../../db/usersMongo');


const addHandler = (req, res) => {
    const token = req.headers.token;
    const productId = req.body.productId;
    usersMongo.addToCart(token, productId, (err, result) => {
        if (!err) {
            rUtil.endResponse(rUtil.codes.OK, result, res);
        } else {
            rUtil.endResponse(rUtil.codes.SERVER_ERROR, {Error: err}, res);
        }
    });
};

const removeHandler = (req, res) => {
    const token = req.headers.token;
    const productId = req.body.productId;
    usersMongo.removeFromCart(token, productId, (err, result) => {
        if (!err) {
            rUtil.endResponse(rUtil.codes.OK, result, res);
        } else {
            rUtil.endResponse(rUtil.codes.SERVER_ERROR, {Error: err}, res);
        }
    });
};

const CartHandler = {
    post: addHandler,
    delete: removeHandler,
};

module.exports = CartHandler;