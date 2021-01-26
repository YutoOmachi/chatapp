const express = require("express");
const path = require('path');
const router = express.Router()

const passport = require("passport");


const initializePassport = require('../../passport-config');
initializePassport(passport, 
    async (username) => await require("../database/dbSelect").selectUserByEmail(username),
    async (id) => await require("../database/dbSelect").selectUserById(id)
)

router
    .route("/")
    .get((req,res) => {
        let reqPath = path.join(__dirname, '../../client/views/login.ejs');
        res.render(reqPath);
    })
    .post(passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    }));

module.exports = router;

