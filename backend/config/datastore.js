/**
 * mongoose middleware
 */
'use strict'
const component = "DATASTORE";
const mongoose = require('mongoose');
const config = require('config');
const url = require('url');


mongoose.Promise = global.Promise;

mongoose.connection.on('connected', ()=> {
    const log = require('../util/logger').log(component, __filename);
    log.debug(component, `connected to MongoDB instance at ${config.mongo.host}:${config.mongo.port}`);
    log.close();
});
mongoose.connection.on('disconnected', ()=> {
    const log = require('../util/logger').log(component, __filename);
    log.debug(component, `disconnected from MongoDB instance at ${config.mongo.host}:${config.mongo.port}`);
    log.close();
});
mongoose.connection.on('error', (err)=> {
    const log = require('../util/logger').log(component, __filename);
    log.debug(component, `MongoDB connection error: ${err}`);
    log.close();
});

function connect() {
    const log = require('../util/logger').log(component, __filename);
    var MONGO_URI = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.database}`;
    log.debug(component, `connecting to: ${config.mongo.host}:${config.mongo.port}/${config.mongo.database}`);
    var mongoURI = url.parse(MONGO_URI);
    mongoose.connect(mongoURI.href, { useMongoClient: true });
    log.close();

}

function disconnect() {
    mongoose.connection.close();
    mongoose.disconnect();
}

module.exports = {
    connect: connect,
    disconnect: disconnect
}
