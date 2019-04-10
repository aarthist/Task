/**
 * root routes
 */
'use strict'
const component = "INDEX";
const router = require('express').Router();
const config = require('config');
const pkg = require('../package.json');
const path = require('path');

router
    .get('/', function(req, res, next) {
        res.sendFile(path.join(__dirname+'/index.html'))
    })

module.exports = router;
