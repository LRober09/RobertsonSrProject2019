const rUtil = require('../../util/rUtil');
const util = require('../../util/util');
const usersMongo = require('../../db/usersMongo');

const handleLogout = (req, res) => {
    const token = req.headers.token;
    usersMongo.logoutUser(token, (err) => {
        if (!err) {
            rUtil.endResponse(rUtil.codes.OK, {}, res);
        } else {
            rUtil.endResponse(rUtil.codes.SERVER_ERROR, {Error: err}, res);
        }
    });
};

const LogoutHandler = {
    post: handleLogout,
};

module.exports = LogoutHandler;