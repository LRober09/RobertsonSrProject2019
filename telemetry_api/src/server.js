const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./db/mongo');
const router = require('./router');
const app = express();
const port = 8080;

const server = {
    mongoClient: null,
};

server.configMongo = (callback) => {
    mongodb.init(() => {
        callback();
    });
};

server.configHttpServer = (app) => {
    return http.createServer(app);
};


server.initServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    router.initRoutes(app);

    server.configMongo(() => {
        app.listen(port, () => console.log("App listening on port " + port));
    });
};

module.exports = server;