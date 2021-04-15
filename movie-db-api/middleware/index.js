const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');

const registerMiddleware = (app) => {
    app.use(cors());
    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }));

    // file upload
    app.use(fileUpload());

    // helmet security
    app.use(helmet.noSniff());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.xssFilter());
}

module.exports = {
    registerMiddleware,
}