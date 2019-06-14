const rUtil = require('../../util/rUtil');
const util = require('../../util/util');
const usersMongo = require('../../db/usersMongo');

const handleLogin = (req, res) => {
    const passwordHash = util.hashPassword(req.body.password);
    const email = req.body.email;
    const token = util.generateToken();
    usersMongo.loginUser(email, passwordHash, token, (err, result) => {
        if (!err) {
            rUtil.endResponse(rUtil.codes.OK, result, res);
        } else {
            rUtil.endResponse(rUtil.codes.SERVER_ERROR, {Error: err}, res);
        }
    });
};

const LoginHandler = {
    post: handleLogin,
};

module.exports = LoginHandler;