'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const bluebird = require('bluebird');
const mongoose = require('mongoose');
const routes = require('./routes');
const PORT = process.env.PORT || 8091;
const HOST = '0.0.0.0';
const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');

const app = express();
const FabricService = require('./services/fabric.service');
const UserService = require('./services/user.service');

_startServer();

async function _startServer() {
    app.use(cors());
    app.use(bodyParser.json({
        limit: '100mb'
    }));
    app.use(bodyParser.urlencoded({
        limit: '100mb',
        extended: true
    }));
    app.use(function (err, req, res, next) {
        if (err) {
            if (err instanceof SyntaxError) {
                res.sendStatus(422);
                return;
            }
            res.sendStatus(400);
            return;
        }
    });
    app.use('/', routes);
    try {
        mongoose.Promise = bluebird;
        await mongoose.connect('mongodb://mongo:27000', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log('Successfully connected to Mongo');
        await FabricService.enrollAdmin();
        await FabricService.registerUser();
        await FabricService.connect();
        await UserService.createAdminUser();
        await http.createServer(app).listen(PORT, HOST);
        console.log(`Listening for API requests on port ${PORT}`)
    } catch (e) {
        console.log(e);
    }
}
