const rUtil = require('../../util/rUtil');
const productsMongo = require('../../db/productsMongo');

const getProductsHandler = (req, res) => {
    // Get products from mongodb
    productsMongo.getProducts((err, result) => {
        if (!err) {
            rUtil.endResponse(rUtil.codes.OK, result, res);
        } else {
            rUtil.endResponse(rUtil.codes.SERVER_ERROR, {Error: err}, res);
        }
    });
};

const ProductsHandler = {
    get: getProductsHandler,
};

module.exports = ProductsHandler;