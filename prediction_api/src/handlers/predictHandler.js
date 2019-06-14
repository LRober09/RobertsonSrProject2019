const rUtil = require('../util/rUtil');
const util = require('../util/util');
const clustersMongo = require('../db/clustersMongo');
const sessionsMongo = require('../db/sessionsMongo');
const pyshell = require('../pyshell/pyshell');

const predictHandler = (req, res) => {
    const session = req.body;
    // add session to db
    sessionsMongo.addSession(session, (err) => {
        if (!err) {
            pyshell.executeClustering(session, (clusterErr, result) => {
                if (!clusterErr) {
                    rUtil.endResponse(rUtil.codes.OK, result, res);
                } else {
                    rUtil.endResponse(rUtil.codes.SERVER_ERROR, clusterErr, res);
                }
            });
        } else {
            rUtil.endResponse(rUtil.codes.SERVER_ERROR, {Error: 'Error while adding session to prediction store'}, res);
        }
    });
};

const PredictHandler = {
    post: predictHandler,
};

module.exports = PredictHandler;