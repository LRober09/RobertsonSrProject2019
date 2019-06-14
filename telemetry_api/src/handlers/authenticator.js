const {authenticateUser} = require('../db/sessionsMongo');
const rUtil = require('../util/rUtil');

const authenticator = (handler, req, res, next) => {
    const token = req.headers.token;
    authenticateUser(token, (err, result) => {
        if (!err && result) {
            handler(req, res, next);
        } else if (!err) {
            rUtil.endResponse(rUtil.codes.UNAUTHORIZED, {Error: "Invalid or no authentication token provided in headerr"}, res);
        } else {
            rUtil.endResponse(rUtil.codes.SERVER_ERROR, {Error: "Server error while authenticating"}, res);
        }
    });
};

module.exports = authenticator;