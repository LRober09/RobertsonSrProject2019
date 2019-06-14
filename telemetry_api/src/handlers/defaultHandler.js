const rUtil = require('../util/rUtil');

const defaultHandler = (req, res) => {
    rUtil.endResponse(rUtil.codes.NOT_FOUND, 'Route not found', res);
};


const DefaultHandler = {
    notFound: defaultHandler
};

module.exports = DefaultHandler;