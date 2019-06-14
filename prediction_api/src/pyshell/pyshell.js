const path = require('path');
const PythonShell = require('python-shell').PythonShell;

const rootPath = path.dirname(require.main.filename);
const clusterScriptPath = path.join(rootPath, 'prediction_src');

const pyshell = {};

pyshell.executeClustering = (session, callback) => {
    if (!session) {
        callback('No session provided');
    } else {
        const options = {
            mode: 'text',
            args: [JSON.stringify(session)],
            scriptPath: clusterScriptPath,
        };
        PythonShell.run('stubCluster.py',
            options, (err, results) => {
           if (err) throw err;
           callback(null, JSON.parse(results));
        });
    }
};



module.exports = pyshell;


