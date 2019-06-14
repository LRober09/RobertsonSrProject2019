const rUtil = require('../../util/rUtil');
const productsMongo = require('../../db/productsMongo');

const getProductsDetailHandler = (req, res) => {
    const productId = parseInt(req.params.productId);

    // Get products from mongodb
    productsMongo.getProductsDetail(productId,(err, result) => {
        if(!err && result !== null) {
            rUtil.endResponse(rUtil.codes.OK, result, res);
        } else if (!err) {
            rUtil.endResponse(rUtil.codes.NOT_FOUND, {Error: 'Product not found'}, res);
        } else {
            rUtil.endResponse(rUtil.codes.SERVER_ERROR, {Error: err}, res);
        }
    });
};

const ProductsDetailHandler = {
    get: getProductsDetailHandler,
};

module.exports = ProductsDetailHandler;