const upload = require('multer')();
const authenticator = require('./handlers/authenticator');
const PredictHandler = require('./handlers/predictHandler');
const DefaultHandler = require('./handlers/defaultHandler');

const endpoints = {
    session: {
        endpoint: '/predict',
        handler: PredictHandler,
        methods: ['post'],
        authenticated: false,
    }
};


/**
 * Builds and initializes routes from the endpoints object
 * @param app expressjs app object
 */
const routes = (app) => {
    Object.keys(endpoints).forEach((epKey) => {
        const endpoint = endpoints[epKey];
        const path = endpoint.endpoint;
        const methods = endpoint.methods;
        const authenticated = endpoint.authenticated;

        methods.forEach((method) => {
            app[method](path, (req, res, next) => {
                if (authenticated) {
                    authenticator(endpoint.handler[method], req, res, next);
                } else {
                    endpoint.handler[method](req, res, next);
                }
            });
        })
    });

    // Handle unknown routes with 404
    app.use(DefaultHandler.notFound)
};

let router = {
    initRoutes: (app) => {
        routes(app);
    }
};


module.exports = router;