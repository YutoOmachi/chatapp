const express = require("express");
const path = require('path');

module.exports = (app) => {
    let reqPath1 = path.join(__dirname, '../../client/css');
    app.use(express.static(reqPath1));
    let reqPath2 = path.join(__dirname, '../../client/js');
    app.use(express.static(reqPath2));
    app.use(express.urlencoded({
        extended: true
    }));
    app.use("/", require("./root"));
    app.use("/login", require("./login"));
};