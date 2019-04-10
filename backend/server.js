const component = "server";
const express = require('express');
const config = require('config');
const http = require('http');
const { mainStory, chalk } = require('storyboard');
const bodyParser = require('body-parser');
const datastore = require('./config/datastore');
const path = require('path');


// app setup
var app = express();

// common middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// api routes
app.use('/', require('./routes/index'));
app.use('/contact',require('./routes/contact'));

// evironment variables
var port = process.env.PORT || config.http.port || '3000'
app.set('port', port)

// server start
var server;
server = http.createServer(app);
server.listen(port, () => {
    const log = require('./util/logger').log(component, __filename); 
    log.info(component, `App Connetced with ${port}`);
    log.close();
});
server.on('error', onError);
server.on('listening', onListening);

// server event handlers
function onError(error) {
    const log = require('./util/logger').log(component, __filename);
    if (error.syscall !== 'listen') {
        datastore.disconnect();
        log.close();
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            log.error(component, `${port} requires elevated privileges`);
            datastore.disconnect();
            log.close();
            process.exit(1);
            break;
        case 'EADDRINUSE':
            log.error(component, `${port} is already in use`);
            datastore.disconnect();
            log.close();
            process.exit(1);
            break;
        default:
            log.error(component, 'server error', { attach: error });
            log.close();
            throw error;
    }
}

function onListening() {
    const log = require('./util/logger').log(component, __filename);
    if (!config.http.secure) log.warn('starting non-secure server');
    log.info(component, `${chalk.green.bold(require('./package.json').name + ' server ver ' + require('./package.json').version + ' started on port ' + app.get('port') + ' [env:' + process.env.NODE_ENV + ']')}`);
    log.close();
    datastore.connect();
}