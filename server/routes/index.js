const express = require("express");
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');

module.exports = (app) => {
    let reqPath1 = path.join(__dirname, '../../client/css');
    app.use(express.static(reqPath1));
    let reqPath2 = path.join(__dirname, '../../client/js');
    app.use(express.static(reqPath2));
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(flash());
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/", require("./root"));
    app.use("/login", require("./login"));
    app.use("/register", require("./register"));
};