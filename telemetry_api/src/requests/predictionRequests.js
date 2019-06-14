const axios = require('axios');
const predictionUrl = 'http://localhost:8090/predict';

const requestCluster = (session, onSuccess, onError, onStart, onComplete) => {
    onStart && onStart();

    axios.post(predictionUrl, {
        session: session,
    }).then((response) => {
        onSuccess && onSuccess(response.data);
    }).catch((err) => {
        console.log('Error: ', err);
        onError && onError('Error during request to prediction API (clustering)');
    }).finally(() => {
        onComplete && onComplete();
    });
};


module.exports = {requestCluster};