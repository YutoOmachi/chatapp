const express = require("express");
const path = require('path');
const router = express.Router()

const passport = require("passport");


const users = [{id:"123", email: "m@il", username: "yuto", password: "password"},
{id:"1234", email: "mail", username: "juto", password: "pass"}];

console.log(users.find(user => user.email == "mail"));

const initializePassport = require('../../passport-config');
initializePassport(passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

router
    .route("/")
    .get( (req,res) => {
        let reqPath = path.join(__dirname, '../../client/views/login.ejs');
        res.render(reqPath);
    })
    .post(passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    }));

    // .post((req, res) => {
    //     let reqPath = path.join(__dirname, "../../client/views/chat.ejs");
    //     let username = req.body.username;
    //     if(username == "") res.redirect("/login");
    //     else res.render(reqPath, {username: username});
    // })

module.exports = router;