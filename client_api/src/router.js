const authenticator = require('./handlers/authenticator');
const ProductsHandler = require('./handlers/products/productsHandler');
const ProductsDetailHandler = require('./handlers/products/productsDetailHandler');
const UsersHandler = require('./handlers/users/usersHandler');
const CartHandler = require('./handlers/users/cartHandler');
const LoginHandler = require('./handlers/users/loginHandler');
const LogoutHandler = require('./handlers/users/logoutHandler');
const DefaultHandler = require('./handlers/defaultHandler');

const endpoints = {
    products: {
        endpoint: '/products',
        handler: ProductsHandler,
        methods: ['get'],
        authenticated: false,
    },
    productsDetail: {
        endpoint: '/products/:productId',
        handler: ProductsDetailHandler,
        methods: ['get'],
        authenticated: false,
    },
    users: {
        endpoint: '/users',
        handler: UsersHandler,
        methods: ['get', 'post', 'patch'],
        authenticated: false,
    },
    cart: {
        endpoint: '/cart',
        handler: CartHandler,
        methods: ['post', 'delete'],
        authenticated: true,
    },
    login: {
        endpoint: '/login',
        handler: LoginHandler,
        methods: ['post'],
        authenticated: false,
    },
    logout: {
        endpoint: '/logout',
        handler: LogoutHandler,
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
                setTimeout(() => {
                    if (authenticated) {
                        authenticator(endpoint.handler[method], req, res, next);
                    } else {
                        endpoint.handler[method](req, res, next);
                    }
                }, 1000);
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